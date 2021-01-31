import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getAllStores = () => {
  return axios.get(BACKEND_URL + "/store");
};
