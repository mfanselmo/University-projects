import baseAxios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const requestTicket = (axios, storeId, phoneNumber) => {
  // const date = new Date();
  const date = new Date(2020, 0, 30, 9, 21);

  return baseAxios.post(BACKEND_URL + "/ticket", {
    phone_number: phoneNumber,
    store_id: storeId,
    time_of_visit: date.toISOString().replace("T", " "),
  });
};

export const getTicketStatus = (axios, ticketId) => {
  return baseAxios.get(BACKEND_URL + "/ticket", {
    params: {
      ticket_id: ticketId,
    },
  });
};

export const cancelTicket = () => {};
