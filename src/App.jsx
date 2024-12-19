import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setLoading, setError } from './features/postsSlice'; // Import the action creators from the postsSlice

export default function App() {
  const posts = useSelector((state) => state.posts.posts); // Select the posts array from the Redux store
  const loading = useSelector((state) => state.posts.loading); // Select the loading state from the Redux store
  const hasError = useSelector((state) => state.posts.hasError); // Select the hasError state from the Redux store

  const dispatch = useDispatch(); // Create a dispatch function to send actions to store

  const newPosts = [
    {id:1, title: 'Post 1', content: 'This is Post 1 content'},
    {id:2, title: 'Post 2', content: 'This is Post 2 content'}
  ];

  useEffect(() => {
    dispatch(setPosts(newPosts))
  }, [dispatch]); // Dispatch the setPost action creator 

  if (loading) {
    return <p>Wait one sec...</p> // Display a loading message if the data is loading
  }

  if (hasError) {
    return <p>This broken</p> // Display an error message if there is an error
  }

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