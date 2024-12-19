import {createSlice} from '@reduxjs/toolkit';

// Define the initial state to be used in postsSlice
const initialState = [
    {id:1, title: 'Post 1', content: 'This is Post 1 content'},
    {id:2, title: 'Post 2', content: 'This is Post 2 content'}
]


// Create a slice for posts containing the name, initial state, and the reducers
const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reducers: {
        setPosts: (state, action) => {
            return action.payload;  // Set the posts array to the payload passed in the action
            },
        addPost: (state, action) => {
            state.push(action.payload);  // state.push mutably adds a new post to the posts array thanks to toolkit
            },
    } 
})

// Export the action creators to be used in the components
export const { setPosts, addPost } = postsSlice.actions;

// Export the reducer to be used in the Redux store
export default postsSlice.reducer;










































