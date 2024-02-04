import { axiosAuthorizedGet, axiosAuthorizedPost } from './axiosFunctions';

export const getCompanies = async (token) => {
  return await axiosAuthorizedGet('/getCompanies', token);
};

export const addCompany = async (data, token) => {
  return await axiosAuthorizedPost('/addCompany', data, token);
};

export const getWorkPoints = async (token) => {
  return await axiosAuthorizedGet('/getWorkpoints', token);
};

export const addWorkPoint = async (data, token) => {
  return await axiosAuthorizedPost('/addWorkpoint', data, token);
};
