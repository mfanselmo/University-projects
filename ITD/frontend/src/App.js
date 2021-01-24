import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import Header from "./components/Header";

import { StateProvider } from "./context/stateContext";

function App() {
  return (
    <StateProvider>
      <BrowserRouter>
        <div className={"header-container"}>
          <Header />
        </div>
        <div className={"router-container"}>
          <Router />
        </div>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
