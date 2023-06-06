import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const headers = token ? { Authorization: `Bearer ${token}` } : {};

const fetcher = (url) =>
  axios
    .get(url, {
      headers: headers,
    })
    .then((res) => res.data);

export default fetcher;
