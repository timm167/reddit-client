import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments } from '../features/postsSlice';

export default function Post({ post }) {
    const [showComments, setShowComments] = useState(false);

    return (
        <li>
            <h2>{post.title}</h2>
            {post.image && <img src={post.image} alt={post.title} />}
            <p>{post.content}</p>
            <button onClick={setShowComments(false)}>
                Comments: {post.num_comments}
            </button>
            <p>Subreddit: {post.subreddit}</p>
            {showComments && (
                <ul>
                    {post.comments.slice(0, 5).map((comment) => (
                        <li key={comment.id}>
                            <h3>{comment.user}</h3>
                            <p>{comment.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}