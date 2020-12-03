import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.covid19api.com", // The API (cloud function) URL
});

export default instance;
