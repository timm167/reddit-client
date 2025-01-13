import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './features/postsSlice.js';
import SearchBar from './components/searchBar.jsx';
import Posts from './components/posts.jsx';
import Sidebar from './components/sidebar.jsx';
import './App.css';
import { setSearchTerm } from './features/searchSlice.js';

// AT THE END ADD A CACHE AND THROTTLE TO THE SEARCH TO AVOID TOO MANY REQUESTS TO THE API also add typing updates to the search bar


export default function App() {
  const loadingPosts = useSelector((state) => state.posts.loadingPosts); // Select the loadingPosts state from the Redux store
  const hasError = useSelector((state) => state.posts.hasError); // Select the hasError state from the Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm); // Select the search state from the Redux store

  const dispatch = useDispatch(); // Create a dispatch function to send actions to store

  useEffect(() => {
    dispatch(fetchPosts(searchTerm)); // Dispatch the fetchPosts thunk with the current searchTerm
  }, [searchTerm, dispatch]);

  const handleClick = () => {
    dispatch(setSearchTerm('')); // Clear the search term when the logo is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page when the logo is clicked
  }

  if (hasError) {
    return <p>This broken</p> // Display an error message if there is an error
  }

  return (
    <div className='app-container'>
      <div className='nav-bar'>
       <h1 className='site-title' onClick={() => window.scrollTo(0,0)}>Daily Dose of Reddit</h1>
       <SearchBar />
       <img src="Screenshot_2024-12-21_at_20.55.52-removebg-preview.png" alt="Site Logo" className='logo'
       onClick={handleClick}
       />
      </div>
      <div className='page-splitter'>
        <div className='side-bar-holder'>
          <div className='side-bar'>
            <Sidebar/>
          </div>
        </div>
        <div className="main-page-container">
          {loadingPosts && 
          <div className='loading-box'>
            <p className='loading'>Loading...</p> {/* Display a loading message while posts are being fetched */}
          </div>}
          <Posts />
        </div>
      </div>
    </div>
  )
}