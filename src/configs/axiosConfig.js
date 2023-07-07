import axios from 'axios';
import jwtUtils from 'utils/jwtUtill';

const token = localStorage.getItem('token');

const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;

const instance = axios.create({baseURL});

const setToken = config => {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

  // const login = true;


if (token) {
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const {response} = error;
    console.log(response);
    if (response.status === 411 || response.status === 403) {
      const isAuth = jwtUtils.isAuth(token)
      if (!isAuth) {
          localStorage.removeItem('token');
          alert('로그인이 만료되어 로그아웃 됩니다.');
          window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
