import {
  render,
  screen,
  waitFor,
  fireEvent,
  queryByText,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import LineUpPage from "./../pages/LineUp/LineUp";
import { stateContext } from "./../context/stateContext";
import LineUpConfirmationPage from "../pages/LineUp/LineUpConfirmation";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const server = setupServer(
  rest.post(BACKEND_URL + "/ticket", (req, res, ctx) => {
    return res(
      ctx.json({
        ticket_id: "1",
        approximate_enter_time: "2021-02-06 14:30:00",
      })
    );
  }),

  rest.get(BACKEND_URL + "/ticket", (req, res, ctx) => {
    const ticketId = req.url.searchParams.get("ticket_id");

    if (ticketId === "1") {
      return res(
        ctx.json({
          approximate_enter_time: "2021-02-06 14:30:00",
          store_name: "CONAD",
          lat: 93.887,
          lon: 87.453,
          address: "via tartini",
          categories_to_visit: "groceries",
          currents_customers: 5,
          max_customers: 4,
          status: "New",
          store_id: 1,
          allowed_in: false,
          reason:
            "you are not assigned to current slot please wait for your turn",
        })
      );
    } else if (ticketId === "2") {
      return res(
        ctx.status(400),
        ctx.json({
          message: "not a valid ticket",
        })
      );
      // return error
    }
  }),

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
          current_customers: 4,
          name: "CONAD",
        },
      ])
    );
  }),
  rest.post(BACKEND_URL + "/slots", (req, res, ctx) => {
    return res(ctx.json({ available_slot: "2021-02-06 14:30:00" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <stateContext.Provider {...providerProps}>{ui}</stateContext.Provider>,
    renderOptions
  );
};

describe("Create a ticket view", () => {
  test("Anonymous user, inserting phone number", async () => {
    // We do not need an authenticated customer for this test
    let testLocation;
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <LineUpPage />
        <Route
          path="*"
          render={({ history, location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      // we expect to see the store address in the table
      const linkElement = screen.getByText("via tartini");
      expect(linkElement).toBeInTheDocument();
    });

    //   We click the button to open the modal
    fireEvent.click(getByText("Select"));
    await waitFor(() => {
      // we expect to see the next slot loaded in
      const timeElement = screen.getByText("Enter your phone number");
      expect(timeElement).toBeInTheDocument();
    });

    const numberInput = getByLabelText("phone-input");
    const confirmButton = getByText("Confirm");

    // First test the input so an incorrect number gets pressed
    fireEvent.change(numberInput, { target: { value: "no-good-value" } });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      const errorMessage = getByText(
        "Make sure your phone number matches the format 3xxxxxxxxx"
      );
      expect(errorMessage).toBeInTheDocument();
    });

    fireEvent.change(numberInput, { target: { value: "3999999999" } });
    fireEvent.click(confirmButton);

    //   We get redirected to the confirmation page
    // assert about url
    await waitFor(() => {
      expect(testLocation.pathname).toBe("/line-up/1");
    });
  });

  test("Anonymous user, Default phone number", async () => {
    // We do not need an authenticated customer for this test
    let testLocation;
    const { debug, getByText, getByLabelText } = render(
      <MemoryRouter>
        <LineUpPage />
        <Route
          path="*"
          render={({ history, location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      // we expect to see the store address in the table
      const linkElement = screen.getByText("via tartini");
      expect(linkElement).toBeInTheDocument();
    });

    //   We click the button to open the modal
    fireEvent.click(getByText("Select"));
    await waitFor(() => {
      // we expect to see the next slot loaded in
      const timeElement = screen.getByText("Enter your phone number");
      expect(timeElement).toBeInTheDocument();
    });

    const checkbox = getByLabelText("phone-checkbox");
    const confirmButton = getByText("Confirm");

    // First test that the checkbox is not pressed so we get an error
    // fireEvent.click(confirmButton);
    fireEvent.click(confirmButton);
    await waitFor(() => {
      const errorMessage = getByText("You must enter a phone number!");
      expect(errorMessage).toBeInTheDocument();
    });

    fireEvent.click(checkbox);
    fireEvent.click(confirmButton);

    //   We get redirected to the confirmation page
    // assert about url
    await waitFor(() => {
      expect(testLocation.pathname).toBe("/line-up/1");
    });
  });
  test("Customer user, uses his phone number by default", async () => {
    const providerProps = {
      value: {
        currentUser: { isManager: false, phoneNumber: "+393999999999" },
      },
    };

    let testLocation;
    const { getByText, debug } = customRender(
      <MemoryRouter>
        <LineUpPage />
        <Route
          path="*"
          render={({ history, location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>,
      { providerProps }
    );

    await waitFor(() => {
      // we expect to see the store address in the table
      const linkElement = screen.getByText("via tartini");
      expect(linkElement).toBeInTheDocument();
    });

    //   We click the button to open the modal
    fireEvent.click(getByText("Select"));
    await waitFor(() => {
      // we expect to see the next slot loaded in
      const nextSlot = screen.getByText("Confirm");
      expect(nextSlot).toBeInTheDocument();
    });

    // without entering a phone number and checking the checkbox, we should be allowed to get a ticket

    const confirmButton = getByText("Confirm");
    fireEvent.click(confirmButton);
    //   We get redirected to the confirmation page
    await waitFor(() => {
      expect(testLocation.pathname).toBe("/line-up/1");
    });
  });
});

describe("Check a ticket status", () => {
  test("Ticket exists", async () => {
    let testLocation;
    const { debug, getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: "/line-up/1" }]}>
        <Route
          path="/line-up/:ticketId"
          render={({ history, location }) => {
            testLocation = location;
            return null;
          }}
        >
          <LineUpConfirmationPage />
        </Route>
      </MemoryRouter>
    );

    // the ticket data was shown correctly
    await waitFor(() => {
      const confirmationPage = screen.getByText(
        "Approximate time to enter: February 6th - 2:30 pm"
      );
      expect(confirmationPage).toBeInTheDocument();
    });
  });
  test("Ticket doesnt exist", async () => {
    let testLocation;
    const { debug, getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: "/line-up/2" }]}>
        <Route path="/line-up/:ticketId">
          <LineUpConfirmationPage />
        </Route>
        <Route
          path="*"
          render={({ history, location }) => {
            testLocation = location;
            return null;
          }}
        ></Route>
      </MemoryRouter>
    );

    // we got redirected to home
    // await waitFor(() => {
    //   expect(testLocation.pathname).toBe("/");
    // });
  });
});
