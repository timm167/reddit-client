import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/searchSlice'; // Import the action creator from the searchSlice

export default function SearchBar() {
    const dispatch = useDispatch(); // Create a dispatch function to send actions to store
    const searchTerm = useSelector((state) => state.search.searchTerm); // Select the search state from the Redux store
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm); // Local state for input value

    const handleChange = (event) => {
        setLocalSearchTerm(event.target.value); // Update local state on every change
    }

    const handleSubmit= (event) => {
        event.preventDefault(); // Prevents site reload on form submission
        dispatch(setSearchTerm(localSearchTerm)); // dispatch the setSearchTerm to redux store
    }

    return (
        <form onSubmit={handleSubmit}> 
            <input
                type="text" 
                placeholder="Search" 
                value={localSearchTerm} // Use local state for value
                onChange={handleChange}
            />
            <button type="submit">Search</button> {/* Button to trigger submit */}
        </form>
    )
}