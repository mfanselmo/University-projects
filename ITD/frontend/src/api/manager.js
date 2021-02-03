const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const scanTicket = (axios, ticketId) => {
  return axios.post(BACKEND_URL + "/scanticket", {
    ticket_id: ticketId,
  });

  //   return new Promise((_, reject) => {
  //     setTimeout(reject, 1000, { message: "Ticket not ready to enter" });
  //   });
};
