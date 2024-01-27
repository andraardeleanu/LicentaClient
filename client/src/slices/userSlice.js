import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: undefined
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
    resetUserData: (state) => {
      state.data = undefined;
    }
  }
});

export const { setUserData, resetUserData } = userSlice.actions;

export default userSlice.reducer;
