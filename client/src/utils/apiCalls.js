import { axiosAuthorizedGet, axiosAuthorizedPost } from './axiosFunctions';

export const getCompanies = async (token) => {
  return await axiosAuthorizedGet('/getCompanies', token);
};

export const getCompanyById = async (token, companyId) => {
  return await axiosAuthorizedGet(
    `/getCompanyById/${companyId}`,
    token
  );
};

export const addCompany = async (data, token) => {
  return await axiosAuthorizedPost('/addCompany', data, token);
};

export const getWorkPoints = async (token) => {
  return await axiosAuthorizedGet('/getWorkpoints', token);
};

export const getWorkPointsByCompanyId = async (token, companyId) => {
  return await axiosAuthorizedGet(
    `/getWorkpointsFromCompany/${companyId}`,
    token
  );
};

export const addWorkPoint = async (data, token) => {
  return await axiosAuthorizedPost('/addWorkpoint', data, token);
};

export const getProducts = async (token) => {
  return await axiosAuthorizedGet('/getProducts', token);
};

export const addProduct = async (data, token) => {
  return await axiosAuthorizedPost('/addProduct', data, token);
};

export const createOrder = async (data, token) => {
  return await axiosAuthorizedPost('/addOrder', data, token);
};

export const getUsers = async (token) => {
  return await axiosAuthorizedPost('/getUsers', token);
};

export const addUser = async (data, token) => {
  return await axiosAuthorizedPost('/addUser', data, token);
};

export const getOrders = async (token) => {
  return await axiosAuthorizedGet('/getOrders', token);
};

export const getOrderDetails = async (token, orderId) => {
  return await axiosAuthorizedGet(`/getOrderDetails/${orderId}`, token);
};
