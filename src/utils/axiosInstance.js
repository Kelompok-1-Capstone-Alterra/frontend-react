import axios from "axios";
import router from "../router";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    if (error.response && error.response.status === 500) {
      router.navigate("/error500");
    }
    if (error.response && error.response.status === 401) {
      router.navigate("/error401");
    }
    if (error.response && error.response.status === 403) {
      router.navigate("/error403");
    }
    if (error.response && error.response.status === 404) {
      router.navigate("/error404");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
