import {
  axiosAuthorizedFormPost,
  axiosAuthorizedGet,
  axiosAuthorizedPost
} from './axiosFunctions';

export const getCompanies = async (token) => {
  return await axiosAuthorizedGet('/getCompanies', token);
};


export const getCompanyById = async (id, token) => {
  return await axiosAuthorizedGet(`/getCompanyById?id=${id}`,
    token
  );
};

export const getWorkpointById = async (token, id) => {
  return await axiosAuthorizedGet(`/getWorkpointById?id=${id}`,
    token
  );
};

export const addCompany = async (data, token) => {
  return await axiosAuthorizedPost('/addCompany', data, token);
};

export const addWorkPoint = async (data, token) => {
  return await axiosAuthorizedPost('/addWorkpoint', data, token);
};

export const getWorkPoints = async (token) => {
  return await axiosAuthorizedGet('/getWorkpoints', token);
};

export const getWorkpointsFromCompany = async (token, companyId) => {
  return await axiosAuthorizedGet(`/getWorkpointsFromCompany?companyId=${companyId}`,
    token
  );
};

export const getWorkPointsByUserId = async (userId, token) => {
  return await axiosAuthorizedGet(`/getWorkpointsByUserId?userId=${userId}`,
    token
  );
};

export const getStockByProductId = async (productId, token) => {
  return await axiosAuthorizedGet(`/getStockByProductId?productId=${productId}`,
    token
  );
};

export const getStockById = async (id, token) => {
  return await axiosAuthorizedGet(`/getStockById?id=${id}`,
    token
  );
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

  if (filters && filters.orderId) {
    queryString += `id=${filters.orderId}&`;
  }

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

export const getStocks = async (token, filters = null) => {
  return await axiosAuthorizedGet(
    `/getStocks?${filters?.name && `Name=${filters?.name}`}`,
    token
  );
};

export const getBills = async (token) => {
  return await axiosAuthorizedGet('/getBills', token);
};

export const getOrderDetails = async (orderId, token) => {
  return await axiosAuthorizedGet(`/getOrderDetails?orderId=${orderId}`,
    token
  );
};

export const getBillDetails = async (orderId, token) => {
  return await axiosAuthorizedGet(`/getBillDetails?orderId=${orderId}`,
    token
  );
};

export const getOrderDetailsForBill = async (orderId, token) => {
  return await axiosAuthorizedGet(`/getOrderDetailsForBill?orderId=${orderId}`,
    token
  );
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

export const updateOrderStatus = async (data, token) => {
  return await axiosAuthorizedPost(`/updateOrderStatus`, data, token);
};

export const updateWorkpoint = async (data, token) => {
  return await axiosAuthorizedPost(`/updateWorkpoint`, data, token);
};

export const removeWorkpoint = async (data, token) => {
  return await axiosAuthorizedPost(`/removeWorkpoint`, data, token);
};

export const updateCustomer = async (data, token) => {
  return await axiosAuthorizedPost(`/updateCustomer`, data, token);
};

export const billGenerator = async (data, token) => {
  return await axiosAuthorizedPost(`/billGenerator`, data, token);
};
