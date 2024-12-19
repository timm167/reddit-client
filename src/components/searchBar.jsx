import React, { useState } from 'react';

export default function SearchBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState(''); // initialize searchTerm state to an empty string

    const handleChange = (event) => {
        setSearchTerm(event.target.value); // Updates the searchTerm as the user types
        onSearch(event.target.value); // pass the search term to the onSearch prop in App.jsx
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