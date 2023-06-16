import axios from "axios";
import router from "../router";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 504) {
      router.navigate("/error504");
    }
    if (error.response && error.response.status === 500) {
      router.navigate("/error500");
    }
    if (error.response && error.response.status === 401) {
      router.navigate("/error401", {
        replace: true,
      });
    }
    if (error.response && error.response.status === 403) {
      router.navigate("/error403", {
        replace: true,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
