export const login = (axios, phoneNumber, password) => {
  return Promise.resolve({
    authentication_token: "smnozAAbYnEX2xVRfS5R",
    is_manager: true,
  });
};
export const logout = (axios) => {
  return Promise.resolve({});
};
