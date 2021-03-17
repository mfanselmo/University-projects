import baseAxios from "axios";
import moment from "moment";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const requestTicket = (storeId, phoneNumber) => {
  const date = moment(new Date());
  // set minutes and seconds to closest tenth and 0
  date.set({ second: 0, minute: Math.floor(date.minute() / 10) * 10 });
  return getNextSlot(storeId, date).then((res) => {
    console.log(res);
    if (res.data.time_of_visit === "")
      return Promise.reject({
        response: {
          data: {
            message:
              "No more slots are available today for this store, try again tomorrow",
          },
        },
      });

    return baseAxios.post(BACKEND_URL + "/ticket", {
      phone_number: phoneNumber,
      store_id: storeId,
      time_of_visit: res.data.available_slot,
    });
  });
};

export const getTicketStatus = (axios, ticketId) => {
  return baseAxios.get(BACKEND_URL + "/ticket", {
    params: {
      ticket_id: ticketId,
    },
  });
};

export const getNextSlot = (storeId, timeOfVisit) => {
  // This function gets called before creating a ticket
  // returns the next available slot
  // console.log({
  //   store_id: storeId,
  //   time_of_visit: timeOfVisit.format("YYYY-MM-DD HH:mm:ss"),
  // });
  return baseAxios.post(BACKEND_URL + "/slots", {
    store_id: storeId,
    time_of_visit: timeOfVisit.format("YYYY-MM-DD HH:mm:ss"),
  });
};

export const cancelTicket = (axios, ticketId) => {
  return axios.delete(BACKEND_URL + "/ticket", {
    data: {
      ticket_id: ticketId,
    },
  });
};
