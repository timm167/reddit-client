import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './features/postsSlice'; // manages state for posts
import searchReducer from './features/searchSlice'; // manages state for search term

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
    }
})

export default store;