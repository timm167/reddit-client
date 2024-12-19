import React, { useState } from 'react';

export default function SearchBar({onSearch}) {
    const [searchTerm, setSearchTerm] = useState(''); // initialize searchTerm state to an empty string

    return (
        <div>
            <input
                type="text" 
                placeholder="Search" // Placeholder text for the input field
                value={searchTerm} // Value of the input field is the searchTerm state
                onChange={(event) => setSearchTerm(event.target.value)} // Updates the searchTerm as the user types
            />
        </div>
    )
}