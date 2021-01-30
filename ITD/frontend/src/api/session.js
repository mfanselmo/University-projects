const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const login = (axios, phoneNumber, password) => {
  if (!phoneNumber || !password)
    return Promise.reject({ message: "Error, try again" });

  return axios.post(BACKEND_URL + "/get-token", {
    phone_number: phoneNumber,
    password,
  });
};

export const logout = (axios) => {
  return Promise.resolve({});
};
