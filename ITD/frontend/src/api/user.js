import baseAxios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getCurrentUser = (axios, currentUser) => {
  return baseAxios.get(BACKEND_URL + "/user", {
    headers: {
      Authorization: `Token ${currentUser.authToken}`,
    },
  });
};

export const signup = (
  axios,
  phoneNumber,
  password,
  emailAddress,
  username
) => {
  if (!phoneNumber || !password)
    return Promise.reject({ message: "Error, try again" });

  return axios.post(BACKEND_URL + "/session", {
    phone_number: phoneNumber,
    password,
    email_address: emailAddress,
    username: username,
  });
};
