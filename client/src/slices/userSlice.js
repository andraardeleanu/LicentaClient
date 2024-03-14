import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  companyData: null,
  needCompaniesCall: true
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserCompanyData: (state, { payload }) => {
      state.companyData = payload;
    },
    setUserData: (state, { payload }) => {
      state.data = payload;
    },
    resetUserData: (state) => {
      state.data = null;
    },
    resetUserCompanyData: (state) => {
      state.companyData = null;
    },
    setNeedCompaniesCall: (state, { payload }) => {
      state.needCompaniesCall = payload;
    }
  }
});

export const {
  setUserData,
  resetUserData,
  setUserCompanyData,
  resetUserCompanyData,
  setNeedCompaniesCall
} = userSlice.actions;

export default userSlice.reducer;
