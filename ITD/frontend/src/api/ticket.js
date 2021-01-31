import baseAxios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const requestTicket = (axios, storeId, phoneNumber) => {
  const date = new Date();

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
