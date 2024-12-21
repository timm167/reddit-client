import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './features/postsSlice.js';
import SearchBar from './components/searchBar.jsx';
import Posts from './components/posts.jsx';

// AT THE END ADD A CACHE AND THROTTLE TO THE SEARCH TO AVOID TOO MANY REQUESTS TO THE API also add typing updates to the search bar


export default function App() {
  const loadingPosts = useSelector((state) => state.posts.loadingPosts); // Select the loadingPosts state from the Redux store
  const hasError = useSelector((state) => state.posts.hasError); // Select the hasError state from the Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm); // Select the search state from the Redux store

  const dispatch = useDispatch(); // Create a dispatch function to send actions to store

  useEffect(() => {
    dispatch(fetchPosts(searchTerm)); // Dispatch the fetchPosts thunk with the current searchTerm
  }, [searchTerm, dispatch]);

  if (hasError) {
    return <p>This broken</p> // Display an error message if there is an error
  }

  return (
    <div>
      <SearchBar />
      {loadingPosts && <p>Loading...</p>} {/* Display a loading message while posts are being fetched */}
      <h1>Current Search Term: {searchTerm}</h1>
      <Posts />
    </div>
  )
}