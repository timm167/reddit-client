import {createSlice} from '@reduxjs/toolkit';

// Define the initial state to be used in postsSlice
const initialState = {
    posts: [],
    loading: false,
    hasError: false,
}


// Create a slice for posts containing the name, initial state, and the reducers
const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;  // Set the posts array to the payload passed in the action
            },
        setLoading: (state, action) => {
            state.loading = action.payload;  // Set the loading state to the payload passed in the action
        },
        setError: (state, action) => {
            state.hasError = action.payload;  // Set the hasError state to the payload passed in the action
        },
    }
})

// Export the action creators to be used in the components
export const { setPosts, setLoading, setError } = postsSlice.actions;

// Export the reducer to be used in the Redux store
export default postsSlice.reducer;










































