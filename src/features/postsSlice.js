import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Create an async thunk to fetch posts from the Reddit API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (searchTerm, {rejectWithValue}) => {
    try {
      let url = '';
      if (!searchTerm || searchTerm.trim() === '') {
        url = 'https://www.reddit.com/r/popular.json'; // fetch popular posts if no search term
      }
      else {
        url = `https://www.reddit.com/search.json?q=${searchTerm}`; // search for the search term
      }

      // Once received, map the data
      const response = await fetch(url);
      const data = await response.json();

      return data.data.children.map((post) => ({ // .map to create a new array of objects containing the relevant data
        id: post.data.id,
        title: post.data.title,
        content: post.data.selftext,
        image: post.data.thumbnail,
        num_comments: post.data.num_comments,
        subreddit: post.data.subreddit,
        comments: [], 
      }));
    }
    catch (error) {
      return rejectWithValue(`Failed to fetch from Reddit API: ${error.message}`); // Return the error with custom message
  }});

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async ({ subreddit, postId }, { rejectWithValue }) => {
      try {
        const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
        const response = await fetch(url);
        const data = await response.json();
  
        // Parse comments from the API response
        const comments = data[1].data.children.map((comment) => ({
          id: comment.data.id,
          author: comment.data.author,
          content: comment.data.body,
        }));
  
        return { postId, comments };
      } catch (error) {
        return rejectWithValue('Failed to fetch comments');
      }
    }
  );
  

// Define the initial state to be used in postsSlice
const initialState = {
    posts: [],
    loading: false,
    hasError: false,
    errorMessage: ''
}


// Create a slice for posts containing the name, initial state, and the reducers
const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reducers: {},
    extraReducers: (builder) =>{
        // loading state when fetching data
        // clear errors when fetching data
        builder.addCase(fetchPosts.pending, (state) => { 
            state.loading = true; 
            state.hasError = false; 
            state.errorMessage = ''; 
          });
      
        // completed state after fetching data
        // sets the posts state with the fetched data
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false; 
            state.posts = action.payload; 
        });
    
        // error state if fetching data fails
        // sets the error message state with the error message from rejectedWithValue
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false; 
            state.hasError = true; 
            state.errorMessage = action.payload; 
        });

        //Handle the fetchComments async thunk

        // loading state when fetching comments
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
            state.hasError = false;
            state.errorMessage = '';
        });
        
        // completed state after fetching comments
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            const { postId, comments } = action.payload;
            // Iterate through the posts to find the post with the matching ID
            // Assign the correct comments to that post
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.comments = comments;
            }
        });

        // error state if fetching comments fails
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loading = false;
            state.hasError = true;
            state.errorMessage = action.payload;
        });
    }
})

// Export the reducer to be used in the Redux store
export default postsSlice.reducer;










































