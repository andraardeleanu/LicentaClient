import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  companyData: null,
  needCompaniesCall: true,
  needWorkPointsCall: true,
  needProductsCall: true,
  needOrdersCall: true,
  needCustomersCall: true,
  needStocksCall: true,
  needBillsCall: true,
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
    },
    setNeedWorkPointsCall: (state, { payload }) => {
      state.needWorkPointsCall = payload;
    },
    setNeedProductsCall: (state, { payload }) => {
      state.needProductsCall = payload;
    },
    setNeedOrdersCall: (state, { payload }) => {
      state.needOrdersCall = payload;
    },
    setNeedCustomersCall: (state, { payload }) => {
      state.needCustomersCall = payload;
    },
    setNeedStocksCall: (state, { payload }) => {
      state.needStocksCall = payload;
    },
    setNeedBillsCall: (state, { payload }) => {
      state.needBillsCall = payload;
    },
  }
});

export const {
  setUserData,
  resetUserData,
  setUserCompanyData,
  resetUserCompanyData,
  setNeedCompaniesCall,
  setNeedWorkPointsCall,
  setNeedProductsCall,
  setNeedOrdersCall,
  setNeedCustomersCall,
  setNeedStocksCall,
  setNeedBillsCall,
} = userSlice.actions;

export default userSlice.reducer;
