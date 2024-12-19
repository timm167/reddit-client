import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, addPost } from './features/postsSlice'; // Import the action creators from the postsSlice

export default function App() {
  const posts = useSelector((state) => state.posts); // Select the posts array from the Redux store
  const dispatch = useDispatch();

  const newPosts = [
    {id:1, title: 'Post 1', content: 'This is Post 1 content'},
    {id:2, title: 'Post 2', content: 'This is Post 2 content'}
  ];

  useEffect(() => {
    dispatch(setPosts(newPosts))
  }, [dispatch]); // Dispatch the addPost action creator with the first post

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
        </ul>
    </div>
  )
}