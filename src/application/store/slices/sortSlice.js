import { createSlice } from '@reduxjs/toolkit';

export const habitsSlice = createSlice({
  name        : 'habits',
  initialState: {
    value: []
  },
  reducers: {
    addHabits: (state, action) => {

    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = habitsSlice.actions;

export default habitsSlice.reducer;
