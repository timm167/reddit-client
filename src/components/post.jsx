import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/postsSlice';

export default function Post({ post }) {
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();

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

    return (
        <li>
            <h2>{post.title}</h2>
            {post.image && <img src={post.image} alt={post.title} />}
            <p>{post.content}</p>
            <button onClick={handleClick}>
                Comments: {post.num_comments}
            </button>
            <p>Subreddit: {post.subreddit}</p>

            {showComments && postComments && (
                <ul>
                    {postComments.slice(0, 5).map((comment) => (
                        <li key={comment.id}>
                            <h3>{comment.author}</h3>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}
