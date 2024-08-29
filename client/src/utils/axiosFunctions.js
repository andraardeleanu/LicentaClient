import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER ?? "http://localhost:5000"
});

api.interceptors.request.use((config) => {
  return config;
});

const returnData = ({ data, status, ...others }) => {
  return data;
};

export const axiosAuthorizedFormPost = async (url, data, token) => {
  return await axiosPost(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const axiosPost = async (url, data, config) => {
  return returnData(
    await api.post(url, data, config).catch((res) => {
      return res.response;
    })
  );
};

export const axiosPatch = async (url, data, config) => {
  return returnData(
    await api.patch(url, data, config).catch((res) => {
      return res.response;
    })
  );
};

export const axiosAuthorizedFormPatch = async (url, data, token) => {
  return await axiosPatch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
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

export const axiosDelete = async (url, config) => {
  return returnData(
    await api.delete(url, config).catch((res) => {
      return res.response;
    })
  );
};

export const axiosAuthorizedDelete = async (url, token) => {
  return await axiosDelete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};

export const axiosAuthorizedPost = async (url, data, token) => {
  return await axiosPost(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  });
};
