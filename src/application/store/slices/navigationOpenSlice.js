import { createSlice } from '@reduxjs/toolkit';

export const navigationOpenSlice = createSlice({
  name        : 'navigationOpen',
  initialState: false,
  reducers    : {
    toggleNavigation: (state, action) => {
      return !state;
    }
  }
});

// Action creators are generated for each case reducer function
export const { toggleNavigation } = navigationOpenSlice.actions;

export default navigationOpenSlice.reducer;
