import axios from "axios";

const fetcher = (url, token) =>
  axios
    .get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((res) => res.data);

export default fetcher;
