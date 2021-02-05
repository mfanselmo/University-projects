import { Spin } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAllStores, getNextSlot } from "../../api";
import { stateContext } from "../../context/stateContext";
import { PieChart } from "react-minimal-pie-chart";

import moment from "moment";
const ManagerStore = ({ location }) => {
  const { storeId } = useParams();
  const { axios, currentUserData } = useContext(stateContext);

  const passedState = location.state;
  const [loading, setLoading] = useState(false);
  const [nextSlotAvailable, setNextSlotAvailable] = useState("");
  const history = useHistory();

  const [storeInfo, setStoreInfo] = useState(
    passedState ? passedState.storeInfo : null
  );

  useEffect(() => {
    if (!currentUserData) {
      // still loading
      return;
    }

    if (!currentUserData.managed_store.includes(parseInt(storeId))) {
      history.push("/");
    }
  }, [history, currentUserData, storeId]);

  useEffect(() => {
    const loadStores = async () => {
      setLoading(true);
      getAllStores().then((res) => {
        setLoading(false);
        setStoreInfo(res.data.find((d) => d.store_id.toString() === storeId));
      });
    };

    if (!passedState) {
      loadStores();
    }
  }, [passedState, storeId, axios]);

  useEffect(() => {
    const loadNextAvailableSlot = async (storeId) => {
      const date = moment(new Date());
      // set minutes and seconds to closest tenth and 0
      date.set({ second: 0, minute: Math.floor(date.minute() / 10) * 10 });

      getNextSlot(storeId, date)
        .then((res) => {
          setNextSlotAvailable(res.data.available_slot);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };

    if (storeId) loadNextAvailableSlot(storeId);
  }, [storeId]);

  if (!storeInfo && loading) return <Spin spinning={loading}>Loading</Spin>;
  if (!storeInfo && !loading) return <h2>Error, store not found</h2>;
  return (
    <div>
      <h2>CLup</h2>
      <h4>
        {storeInfo.location.address} - {storeInfo.name}
      </h4>
      {nextSlotAvailable !== "" ? (
        <h4>Next open slot: {nextSlotAvailable} minutes</h4>
      ) : (
        <h4>No more slots available today</h4>
      )}
      <h4>People in store: {storeInfo.current_customers}</h4>
      <h4>Capacity of store: {storeInfo.max_customers}</h4>
      <div className={"chart"}>
        <h2 className={"chart-title"}>Current Store Capacity</h2>
        <PieChart
          data={[
            {
              value: (
                (100 * storeInfo.current_customers) /
                storeInfo.max_customers
              ).toFixed(1),
              color: "#2957ac",
            },
          ]}
          background="#bfbfbf"
          totalValue={100}
          lineWidth={20}
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={{
            fontSize: "20px",
            fontFamily: "sans-serif",
            fill: "#2957ac",
          }}
          labelPosition={0}
          style={{ maxWidth: "350px" }}
          rounded
          animate
        />
      </div>
    </div>
  );
};

export default ManagerStore;
