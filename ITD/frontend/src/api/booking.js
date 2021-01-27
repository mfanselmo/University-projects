export const requestBooking = (axios, storeId, timeOfVisit, categories) => {
  return Promise.resolve({
    ticket_id:
      "4f75482e100691087c02a69e97bb5be12952cf027ad9895113ed0b56c8957294",
  });
};
export const getBookingStatus = (axios, ticketId) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, {
      enter_time: "2021-01-23T17:19:13.582Z",
      store_id: 1,
      categories_to_visit: ["fruits", "vegetables"],
    });
  });
};

export const cancelBooking = () => {};
