import React from 'react';
import { useSelector } from 'react-redux'; 

export default function Posts() {
    const posts = useSelector((state) => state.posts.posts); // Access posts from the Redux store

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
    );
}
