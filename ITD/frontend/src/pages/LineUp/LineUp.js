import React, { useContext, useState, useEffect } from "react";
import LineUpModal from "../../components/LineUpModal";
import StoresTable from "../../components/StoresTable";
import { stateContext } from "../../context/stateContext";
import { getAllStores } from "./../../api";

const LineUpPage = () => {
  const { currentUser } = useContext(stateContext);

  const [openModal, setOpenModal] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [availableStores, setAvailableStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStores();
      setAvailableStores(data.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2>CLup - Line up</h2>
      </div>
      <div>
        <h4>Choose the store you want to go</h4>
        <StoresTable
          setOpenModal={setOpenModal}
          setSelectedStoreId={setSelectedStoreId}
          availableStores={availableStores}
          selectText={"Line up!"}
        />
        <LineUpModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedStoreId={selectedStoreId}
          setSelectedStoreId={setSelectedStoreId}
          availableStores={availableStores}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default LineUpPage;
