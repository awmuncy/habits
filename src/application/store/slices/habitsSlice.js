import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const updateCheckin = createAsyncThunk(
//   'habits/updatedDb',
//   async (habit_id, moment, thunkAPI) => {
//     window.databaseConnection.insert
//   }
// );

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
