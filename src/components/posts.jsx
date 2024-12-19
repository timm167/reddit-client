import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';

export default function Posts() {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <ul>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </ul>
    );
}
