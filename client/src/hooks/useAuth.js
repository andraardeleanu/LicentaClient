
import {
  axiosAuthorizedFormPatch,
  axiosGet,
  axiosPost
} from '../utils/axiosFunctions';

const useAuth = (userToken) => {
  const getUser = async () => {
    const data = await axiosGet('/getUser', {
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    });
    return data;
  };

  const login = async (username, password, rememberMe) => {
    const data = await axiosPost('/login', {
      username,
      password,
      rememberMe
    });

    if (typeof data === 'string') {
      return { token: '', errorMessage: data };
    } else {
      return { token: data?.token, errorMessage: '' };
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    const data = await axiosAuthorizedFormPatch(
      '/changePassword',
      {
        oldPassword,
        newPassword
      },
      userToken
    );

    if (typeof data === 'string') {
      return { token: '', errorMessage: data };
    } else {
      return { token: data?.token, errorMessage: '' };
    }
  };

  return {
    getUser,
    login,
    changePassword
  };
};

export default useAuth;
