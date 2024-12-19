import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './features/postsSlice.js';
import SearchBar from './components/searchBar.jsx';
import Posts from './components/posts.jsx';

// AT THE END ADD A CACHE AND THROTTLE TO THE SEARCH TO AVOID TOO MANY REQUESTS TO THE API also add typing updates to the search bar


export default function App() {
  const posts = useSelector((state) => state.posts.posts); // Select the posts array from the Redux store
  const loading = useSelector((state) => state.posts.loading); // Select the loading state from the Redux store
  const hasError = useSelector((state) => state.posts.hasError); // Select the hasError state from the Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm); // Select the search state from the Redux store

  const dispatch = useDispatch(); // Create a dispatch function to send actions to store

  useEffect(() => {
    dispatch(fetchPosts(searchTerm)); // Dispatch the fetchPosts thunk with the current searchTerm
  }, [searchTerm, dispatch]);


  if (loading) {
    return <p>Wait one sec...</p> // Display a loading message if the data is loading
  }

  if (hasError) {
    return <p>This broken</p> // Display an error message if there is an error
  }

  return (
    <div>
      <SearchBar />
      <h1>Current Search Term: {searchTerm}</h1>
      <Posts />
    </div>
  )
} 