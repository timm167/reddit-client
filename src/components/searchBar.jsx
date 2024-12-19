import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/searchSlice'; // Import the action creator from the searchSlice

export default function SearchBar() {
    const dispatch = useDispatch(); // Create a dispatch function to send actions to store
    const searchTerm = useSelector((state) => state.searchTerm); // Select the search state from the Redux store

    const handleSubmit= (event) => {
        event.preventDefault(); // Prevents site reload on form submission
        dispatch(setSearchTerm(event.target.value)); // dispatch the setSearchTerm to redux store
    }

    return (
        <form onSubmit={handleSubmit}> 
            <input
                type="text" 
                placeholder="Search" 
                value={searchTerm} // Use local state for value
            />
            <button type="submit">Search</button> {/* Button to trigger submit */}
        </form>
    )
}