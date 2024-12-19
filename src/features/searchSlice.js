import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Set the search term to the payload passed in the action
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
