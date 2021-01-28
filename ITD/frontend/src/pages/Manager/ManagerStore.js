import { Spin } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStoresInfo } from "../../api";
import { stateContext } from "../../context/stateContext";
const ManagerStore = ({ location }) => {
  const { storeId } = useParams();
  const { axios } = useContext(stateContext);

  const passedState = location.state;
  const [loading, setLoading] = useState(false);
  const [storeInfo, setStoreInfo] = useState(
    passedState ? passedState.storeInfo : null
  );

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      getStoresInfo(axios).then((res) => {
        setLoading(false);
        setStoreInfo(res.data.find((d) => d.store_id.toString() === storeId));
      });
    };

    if (!passedState) {
      loadStores();
    }
  }, [passedState, storeId, axios]);

  if (!storeInfo && loading) return <Spin spinning={loading}>Loading</Spin>;
  if (!storeInfo && !loading) return <h2>Error, store not found</h2>;
  return (
    <div>
      <h2>CLup</h2>
      <h4>{storeInfo.address}</h4>
      <h4>Waiting time: {storeInfo.estimated_waiting_time} minutes</h4>
      <h4>People in line: {storeInfo.people_in_line}</h4>
      <h4>People in store: {storeInfo.people_in_store}</h4>
    </div>
  );
};

export default ManagerStore;
