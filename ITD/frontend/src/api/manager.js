export const getStoresInfo = (axios) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, {
      data: [
        {
          store_id: 1,
          lat: 100,
          lon: 100,
          address: "Viale Piave, 38/B, 20129",
          estimated_waiting_time: 120, // minutes
          people_in_store: 25,
          people_in_line: 15,
        },
      ],
    });
  });
};

export const scanTicket = (axios, ticketId) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, {});
  });

  //   return new Promise((_, reject) => {
  //     setTimeout(reject, 1000, { message: "Ticket not ready to enter" });
  //   });
};
