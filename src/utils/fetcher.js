import axiosInstance from "./axiosInstance";

const fetcher = (url, token) =>
  axiosInstance
    .get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((res) => res.data);

export default fetcher;
