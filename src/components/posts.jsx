import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post';
import './Components.css';

export default function Posts() {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <ul className='posts-list'>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </ul>
    );
}
