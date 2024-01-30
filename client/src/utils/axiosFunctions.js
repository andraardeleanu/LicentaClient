import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER
});

api.interceptors.request.use((config) => {
  return config;
});

const returnData = ({ data, status, ...others }) => {
  return data;
};

export const axiosPost = async (url, data, config) => {
  return returnData(
    await api.post(url, data, config).catch((res) => {
      return res.response;
    })
  );
};

export const axiosGet = async (url, config) => {
  return returnData(
    await api.get(url, config).catch((res) => {
      return res.response;
    })
  );
};

export const axiosAuthorizedGet = async (url, token) => {
  return await axiosGet(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};
