import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
    resetUserData: (state) => {
      state.data = null;
    }
  }
});

export const { setUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
