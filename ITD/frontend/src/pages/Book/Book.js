import React, { useContext, useState, useEffect } from "react";
import BookModal from "../../components/BookModal";
import StoresTable from "../../components/StoresTable";
import { stateContext } from "../../context/stateContext";
import { getAllStores } from "./../../api";

const BookPage = () => {
  const state = useContext(stateContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const { currentUser, axios } = state;
  const [availableStores, setAvailableStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStores(axios);
      setAvailableStores(data.data);
    };

    fetchData();
  }, [axios]);

  return (
    <div>
      <div>
        <h2>CLup - Book a ticket</h2>
      </div>
      <div>
        <h4>Choose the store you want to go</h4>
        <StoresTable
          axios={axios}
          setOpenModal={setOpenModal}
          setSelectedStoreId={setSelectedStoreId}
          availableStores={availableStores}
          selectText={"Book a visit"}
        />
        <BookModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedStoreId={selectedStoreId}
          setSelectedStoreId={setSelectedStoreId}
          availableStores={availableStores}
          axios={axios}
        />
      </div>
    </div>
  );
};

export default BookPage;
