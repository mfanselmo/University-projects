export const requestTicket = ({ axios, storeId, phoneNumber }) => {
  return Promise.resolve({
    ticket_id:
      "4f75482e100691087c02a69e97bb5be12952cf027ad9895113ed0b56c8957294",
    approximate_enter_time: "2021-01-23T17:19:13.582Z", // ISO8601 format (default for django rest and javascript),
  });
};

export const getTicketStatus = (axios, ticketId) => {
  //   return Promise.reject({ message: "Bad code" });

  return new Promise((resolve) => {
    setTimeout(resolve, 1000, {
      approximate_enter_time: "2021-01-23T17:19:13.582Z",
      store_id: 1,
    });
  });
};

export const cancelTicket = () => {};
