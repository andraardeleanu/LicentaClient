import {
  axiosAuthorizedFormPost,
  axiosAuthorizedGet,
  axiosAuthorizedPost
} from './axiosFunctions';

export const getCompanies = async (token) => {
  return await axiosAuthorizedGet('/getCompanies', token);
};

export const getCompanyById = async (token, companyId) => {
  return await axiosAuthorizedGet(`/getCompanyById/${companyId}`, token);
};

export const getWorkpointById = async (token, workpointId) => {
  return await axiosAuthorizedGet(`/getWorkpointById/${workpointId}`, token);
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

export const getWorkPointsByUserId = async (userId, token) => {
  return await axiosAuthorizedGet(`/getWorkpointsByUserId/${userId}`, token);
};

export const getStockByProductId = async (productId, token) => {
  return await axiosAuthorizedGet(`/getStockByProductId/${productId}`, token);
};

export const getStockById = async (id, token) => {
  return await axiosAuthorizedGet(`/getStockById/${id}`, token);
};


export const addWorkPoint = async (data, token) => {
  return await axiosAuthorizedPost('/addWorkpoint', data, token);
};

export const addProduct = async (data, token) => {
  return await axiosAuthorizedPost('/addProduct', data, token);
};

export const createOrder = async (data, token) => {
  return await axiosAuthorizedPost('/addOrder', data, token);
};

export const getUsers = async (token) => {
  return await axiosAuthorizedGet('/getUsers', token);
};

export const register = async (data, token) => {
  return await axiosAuthorizedPost('/register', data, token);
};

export const getOrders = async (token, filters = null) => {
  let queryString = '';

  if (filters && filters.orderNo) {
    queryString += `OrderNo=${filters.orderNo}&`;
  }

  if (filters && filters.status) {
    queryString += `Status=${filters.status}&`;
  }
  queryString = queryString.replace(/&$/, '');

  return await axiosAuthorizedGet(`/getOrders?${queryString}`, token);
};

export const getProducts = async (token, filters = null) => {
  return await axiosAuthorizedGet(
    `/getProducts?${filters?.name && `Name=${filters?.name}`}`,
    token
  );
};

export const getStocks = async (token) => {
  return await axiosAuthorizedGet('/getStocks', token);
};

export const getOrdersByUserId = async (userId, token) => {
  return await axiosAuthorizedGet(`/getOrdersByUserId/${userId}`, token);
};
export const getOrderDetails = async (token, orderId) => {
  return await axiosAuthorizedGet(`/getOrderDetails/${orderId}`, token);
};

export const addOrdersFromFile = async (data, token) => {
  return await axiosAuthorizedFormPost('/addOrdersFromFile', data, token);
};

export const updateStock = async (data, token) => {
  return await axiosAuthorizedPost(`/updateStock`, data, token);
};

export const updateCompany = async (data, token) => {
  return await axiosAuthorizedPost(`/updateCompany`, data, token);
};

export const updateOrderStatus = async (orderId, token) => {
  return await axiosAuthorizedPost(`/updateOrderStatus/${orderId}`, token);
};

