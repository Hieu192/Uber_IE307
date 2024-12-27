import axios from "axios";
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "https://rsapi.goong.io/",
  params: {
    api_key: "T1QkeKBZr9CMHXxqqYDO740RzX5b2XFMJl1NWDGZ", // Param cố định
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
