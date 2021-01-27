import React, { useContext, useState } from "react";
import QrReader from "react-qr-reader";
import { message, Spin, Alert } from "antd";
import { scanTicket } from "./../../api";
import { stateContext } from "../../context/stateContext";
import moment from "moment";

const ManagerScan = () => {
  const [loading, setLoading] = useState(false);
  const [lastTicket, setLastTicket] = useState(null);
  const [scanState, setScanState] = useState({
    success: false,
    message: "Start scanning",
  });

  const { axios } = useContext(stateContext);

  const handleScan = (data) => {
    if (data && !loading && data !== lastTicket) {
      setLoading(true);
      scanTicket(axios, data)
        .then(() => {
          message.success("Ticket scanned succesfully");
          setLoading(false);
          setLastTicket(data);
          const date = new Date();

          setScanState({
            success: true,
            message: `Ticket scanned correctly at ${moment(date).format(
              "HH:mm"
            )}`,
          });
        })
        .catch((err) => {
          message.error(err.message);
          setLastTicket(data);
          setLoading(false);
          setScanState({ success: false, message: err.message });
        });
    }
  };
  return (
    <div>
      <Spin spinning={loading}>
        {lastTicket ? (
          <Alert
            description={scanState.message}
            message={
              scanState.success ? "Success!" : "User can not enter the store"
            }
            type={scanState.success ? "success" : "error"}
          />
        ) : (
          <Alert type="info" message={"Start scanning"} />
        )}
        <br></br>
        <QrReader delay={300} onScan={handleScan} onError={message.error} />
      </Spin>
    </div>
  );
};

export default ManagerScan;
