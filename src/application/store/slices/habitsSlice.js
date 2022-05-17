import { createSlice } from '@reduxjs/toolkit';

export const habitsSlice = createSlice({
  name        : 'habits',
  initialState: [],
  reducers    : {
    addHabits: (state, action) => {
      return action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addHabits } = habitsSlice.actions;

export default habitsSlice.reducer;
