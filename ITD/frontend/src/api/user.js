const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getCurrentUser = (axios) => {
  return Promise.resolve({
    is_manager: false,
    active_tickets: [
      {
        ticket_id:
          "4f75482e100691087c02a69e97bb5be12952cf027ad9895113ed0b56c8957294",
        approximate_enter_time: 25,
        store_id: 1,
      },
    ],
    bookings: [
      {
        ticket_id: "smsjdASNnm23",
        active_at: "2021-01-23T17:19:13.582Z",
        store_id: 1,
      },
    ],
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
