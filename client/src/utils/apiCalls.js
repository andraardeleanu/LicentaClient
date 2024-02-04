import { axiosAuthorizedGet, axiosAuthorizedPost } from './axiosFunctions';

export const getCompanies = async (token) => {
  return await axiosAuthorizedGet('/getCompanies', token);
};

export const addCompany = async (data, token) => {
  return await axiosAuthorizedPost('/addCompany', data, token);
};

export const getWorkPointsByCompanyId = async (id, token) => {
  return await axiosAuthorizedGet('/getWorkpointsFromCompany', token, {
    companyId: id
  });
};
