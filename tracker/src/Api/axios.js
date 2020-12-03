import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.covid19api.com", // The API (main url for fetching data) URL
});

export default instance;
