import { render, screen } from "@testing-library/react";
import App, { RouterApp } from "./App";
import { stateContext } from "./context/stateContext";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <stateContext.Provider {...providerProps}>{ui}</stateContext.Provider>,
    renderOptions
  );
};

describe("Main rendering", () => {
  test("Clup render", () => {
    render(<App />);
    const linkElement = screen.getByTestId("clup");
    expect(linkElement).toBeInTheDocument();
  });

  test("Anonymous page load", () => {
    let providerProps = {
      value: { currentUser: null },
    };

    // State consumer
    // Anonymous user
    customRender(<RouterApp />, { providerProps });
    let linkElement = screen.getByText("Login");
    expect(linkElement).toBeInTheDocument();
  });

  test("Customer page load", () => {
    const providerProps = {
      value: { currentUser: { isManager: false } },
    };
    customRender(<RouterApp />, { providerProps });
    let linkElement = screen.getByText("Logout");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText("Book a visit!");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.queryByText("Check your stores");
    expect(linkElement).not.toBeInTheDocument();
  });

  test("Manager load page", () => {
    const providerProps = {
      value: { currentUser: { isManager: true }, currentUserData: null },
    };
    customRender(<RouterApp />, { providerProps });
    let linkElement = screen.getByText("Logout");
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText("Check your stores");
    expect(linkElement).toBeInTheDocument();
  });
});
