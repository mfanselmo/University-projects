export const getAllStores = (axios) => {
  return Promise.resolve({
    data: [
      {
        store_id: 1,
        lat: 100,
        lon: 100,
        address: "Viale Piave, 38/B, 20129",
        estimated_waiting_time: 120, // minutes
        shopping_categories: ["fruits", "vegetables", "frozen food"],
      },
      {
        store_id: 2,
        lat: 200,
        lon: 200,
        address: "20121 Milan",
        estimated_waiting_time: 30, // minutes
        shopping_categories: ["fruits", "vegetables", "frozen food"],
      },
    ],
  });
};
