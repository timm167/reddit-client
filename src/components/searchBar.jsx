import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/searchSlice'; // Import the action creator from the searchSlice

export default function SearchBar() {
    const dispatch = useDispatch(); // Create a dispatch function to send actions to store
    const searchTerm = useSelector((state) => state.searchTerm); // Select the search state from the Redux store

    const handleChange = (event) => {
        setSearchTerm(event.target.value); // Updates the searchTerm as the user types
        dispatch(setSearchTerm(event.target.value)); // pass the search term to the onSearch prop in App.jsx
    }

    return (
        <div>
            <input
                type="text" 
                placeholder="Search" // Placeholder text for the input field
                value={searchTerm} // Value of the input field is the searchTerm state
                onChange={handleChange} // Calls the handleChange function to be passed up to App.jsx
            />
        </div>
    )
}