import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
