import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Create an async thunk to fetch posts from the Reddit API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (searchTerm, {rejectWithValue}) => {
    try {
      let url = '';
      if (!searchTerm || searchTerm.trim() === '') {
        url = 'https://www.reddit.com/r/popular.json?limit=10'; // fetch popular posts if no search term
      }
      else {
        url = `https://www.reddit.com/search.json?q=${searchTerm}&limit=10`; // search for the search term
      }

      // Once received, map the data
      const response = await fetch(url);
      const data = await response.json();

      const getImageData = (post) => {
        if (post.data.url_overridden_by_dest) {
          return post.data.url_overridden_by_dest;
        }
        else if (post.data.thumbnail) {
          return post.data.thumbnail;
        }
      }

      return data.data.children.map((post) => ({ // .map to create a new array of objects containing the relevant data
        id: post.data.id,
        title: post.data.title,
        content: post.data.selftext,
        image: getImageData(post),
        num_comments: post.data.num_comments,
        subreddit: post.data.subreddit,
        comments: [], 
        is_private: post.data.is_private
      }));
    }
    catch (error) {
      return rejectWithValue(`Failed to fetch from Reddit API: ${error.message}`); // Return the error with custom message
  }});

// Create an async thunk to fetch comments from the Reddit API
export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async ({ subreddit, postId }, { rejectWithValue }) => {
      try {
        console.log(subreddit, postId);
        const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=100`;
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
    loadingPosts: false,
    loadingComments: false,
    hasError: false,
    errorMessage: ''
}


// Create a slice for posts containing the name, initial state, and the reducers
const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        // loading state when fetching posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loadingPosts = true;
            state.hasError = false;
            state.errorMessage = '';
        });

        // completed state after fetching posts
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loadingPosts = false;
            state.posts = action.payload;
        });

        // error state if fetching posts fails
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loadingPosts = false;
            state.hasError = true;
            state.errorMessage = action.payload;
        });

        // loading state when fetching comments
        builder.addCase(fetchComments.pending, (state) => {
            state.loadingComments = true;
            state.hasError = false;
            state.errorMessage = '';
        });

        // completed state after fetching comments
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loadingComments = false;
            const { postId, comments } = action.payload;
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                post.comments = comments;
            }
        });

        // error state if fetching comments fails
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loadingComments = false;
            state.hasError = true;
            state.errorMessage = action.payload;
        });
    }
})

// Export the reducer to be used in the Redux store
export default postsSlice.reducer;










































