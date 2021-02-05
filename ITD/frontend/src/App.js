import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import Header from "./components/Header";

import { StateProvider } from "./context/stateContext";

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <div className={"header-container"}>
        <Header />
      </div>
      <div className={"router-container"}>
        <Router />
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <StateProvider>
      <RouterApp />
    </StateProvider>
  );
}

export default App;
