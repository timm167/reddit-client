import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setLoading, setError } from './features/postsSlice'; // Import the action creators from the postsSlice
import SearchBar from './components/searchBar.jsx';


export default function App() {
  const posts = useSelector((state) => state.posts.posts); // Select the posts array from the Redux store
  const loading = useSelector((state) => state.posts.loading); // Select the loading state from the Redux store
  const hasError = useSelector((state) => state.posts.hasError); // Select the hasError state from the Redux store
  const searchTerm = useSelector((state) => state.posts.searchTerm); // Select the searchTerm state from the Redux store

  const dispatch = useDispatch(); // Create a dispatch function to send actions to store

  const newPosts = [
    {id:1, title: 'Post 1', content: 'This is Post 1 content'},
    {id:2, title: 'Post 2', content: 'This is Post 2 content'}
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true)); // setLoading to true in store

      try {
        let url = '';
        if (searchTerm.trim() === '') {
          url = 'https://www.reddit.com/r/popular.json';
        }
        else {
          url = `https://www.reddit.com/search.json?q=${searchTerm}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const redditPosts = data.data.children.map((post) => ({ // .map to create a new array of objects containing the relevant data
          id: post.data.id,
          title: post.data.title,
          content: post.data.selftext,
          image: post.data.thumbnail
        }));

        dispatch(setPosts(redditPosts)); // Dispatched the posts array just created to store
      }
      catch (error) {
        dispatch(setError(true)); // Set hasError to true in store
        console.error('Error fetching posts', error);
      }
      finally {
        dispatch(setLoading(false)); // Set loading to false in store once fetching is done
      }
    };
    fetchPosts(); // Call the fetchPosts function
  }, [dispatch, searchQuery]); // Add dispatch and searchQuery to the dependency array so it updates on load and on search

  const handleSearch = (searchTerm) => {
    // FIGURE OUT
  }


  if (loading) {
    return <p>Wait one sec...</p> // Display a loading message if the data is loading
  }

  if (hasError) {
    return <p>This broken</p> // Display an error message if there is an error
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
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