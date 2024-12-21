import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/postsSlice';
import './Components.css';

export default function Post({ post }) {
    const [showComments, setShowComments] = useState(false);
    const [visibleComments, setVisibleComments] = useState(10); // Initial number of comments to display
    const dispatch = useDispatch();
    const loadingComments = useSelector((state) => state.posts.loadingComments); // Select the loadingComments state from the Redux store

    // Access the comments from Redux for the current post
    const postComments = useSelector((state) => 
        state.posts.posts.find((p) => p.id === post.id)?.comments
    );

    function handleClick() {
        if (!showComments && (!postComments || postComments.length === 0)) { 
            // Fetch comments only if they haven't been fetched yet
            dispatch(fetchComments({ subreddit: post.subreddit, postId: post.id }));
        }
        setShowComments(!showComments);
    }

    function handleMoreComments() {
        // Increment the number of visible comments by 5
        setVisibleComments((prev) => prev + 10);
    }

    
    return (
        <li>
            <h2>{post.title}</h2>
            {post.image && <img src={post.image} alt={post.title} />}
            <p>{post.content}</p>
            <button onClick={handleClick}>
                {showComments ? 'Hide Comments' : `Comments: ${post.num_comments}`}
            </button>
            <p>Subreddit: {post.subreddit}</p>
            {loadingComments && <p>Loading Comments...</p>}
            {showComments && postComments && (
                <>
                    <ul>
                        {postComments.slice(0, visibleComments).map((comment) => (
                            <li key={comment.id}>
                                <h3>{comment.author}</h3>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                    {visibleComments < postComments.length && (
                        <button onClick={handleMoreComments}>More Comments</button>
                    )}
                </>
            )}
        </li>
    );
}

