import React, { useContext } from "react";
import { stateContext } from "../../context/stateContext";
import HomeUser from "./HomeUser";
import HomeManager from "./HomeManager";

const Home = () => {
  const { currentUser } = useContext(stateContext);

  if (!currentUser || !currentUser.isManager) {
    return <HomeUser currentUser={currentUser} />;
  }

  return <HomeManager currentUser={currentUser} />;
};

export default Home;
