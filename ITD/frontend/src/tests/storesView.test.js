import { render, screen, waitFor, act } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import LineUpPage from "./../pages/LineUp/LineUp";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const server = setupServer(
  rest.get(BACKEND_URL + "/store/", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          store_id: 1,
          location: {
            url: "http://localhost:8000/position/1/",
            address: "via tartini",
            latitude: 93.887,
            longitude: 87.453,
          },
          max_customers: 5,
          current_customers: 5,
          name: "CONAD",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Line up view, the user can see all available stores", async () => {
  // WE do not need an authenticated customer for this test
  act(() => {
    render(<LineUpPage />);
  });

  await waitFor(() => {
    // we expect to see the store address in the table
    const linkElement = screen.getByText("via tartini");
    expect(linkElement).toBeInTheDocument();
  });
});
