import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/postsSlice';
import { setSearchTerm } from '../features/searchSlice';
import './Components.css';

export default function Post({ post }) {
    const [showComments, setShowComments] = useState(false);
    const [visibleComments, setVisibleComments] = useState(10); // Initial number of comments to display
    const dispatch = useDispatch();
    const loadingComments = useSelector((state) => state.posts.loadingComments); // Select the loadingComments state from the Redux store
    const [showFullContent, setShowFullContent] = useState(false);

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

    const isValidImage = (imageUrl) => {
        return (
            imageUrl &&
            (imageUrl.endsWith('.jpeg') ||
                imageUrl.endsWith('.jpg') ||
                imageUrl.endsWith('.png') ||
                imageUrl.endsWith('.gif'))
        );
    };

    function handleMoreComments() {
        // Increment the number of visible comments by 5
        setVisibleComments((prev) => prev + 10);
    }

    function selectPost() {
        setShowFullContent(true);
    }

    function clickSubreddit() {
        dispatch(setSearchTerm(post.subreddit));
    }

    
    return (
        <li className='post-item' onClick={selectPost}>
            <h2 className='post-title'>{post.title}</h2>
            {post.image && isValidImage(post.image) && 
            <div className='img-holder'>
                <img src={post.image} alt={post.title} />
            </div>}
            {post.content.length < 300 || showFullContent ? (
                <p>{post.content}</p>
            ) : (
                <>
                    <p>{post.content.slice(0, 300)}...</p>
                    <button onClick={handleClick} className='more-comments'>Read More...</button>
                </>
            )}
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
                        <button onClick={handleMoreComments} className='more-comments'>More Comments</button>
                    )}
                </>
                
            )}
            <div class="half-line"></div>
            <button onClick={handleClick} className='comment-number'>
                {showComments ? 'Hide Comments' : `Comments: ${post.num_comments}`}
            </button>
            <p onClick={clickSubreddit} className='subreddit'>Subreddit: {post.subreddit}</p>
        </li>
    );
}

