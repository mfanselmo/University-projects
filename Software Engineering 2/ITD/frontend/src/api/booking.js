import baseAxios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const requestBooking = (axios, storeId, date, phoneNumber) => {
  return baseAxios.post(BACKEND_URL + "/ticket", {
    phone_number: phoneNumber,
    store_id: storeId,
    time_of_visit: date.format("YYYY-MM-DD HH:mm:ss"),
  });
};

export const getBookingStatus = (axios, ticketId) => {
  return baseAxios.get(BACKEND_URL + "/ticket", {
    params: {
      ticket_id: ticketId,
    },
  });
};

export const cancelBooking = () => {};
