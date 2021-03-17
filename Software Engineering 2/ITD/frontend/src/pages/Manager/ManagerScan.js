import React, { useContext, useState } from "react";
import QrReader from "react-qr-reader";
import { message, Spin, Alert } from "antd";
import { getTicketStatus } from "./../../api";
import { stateContext } from "../../context/stateContext";
import ManagerConfirm from "./ManagerConfirm";

const ManagerScan = () => {
  const [loading, setLoading] = useState(false);
  const [lastTicket, setLastTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [scanState, setScanState] = useState({
    success: false,
    message: "Start scanning",
  });

  const { axios, currentUserData } = useContext(stateContext);

  const handleScan = (data) => {
    if (data && !loading && data !== lastTicket) {
      setLoading(true);
      setLastTicket(data);

      getTicketStatus(axios, data)
        .then((res) => {
          if (res.data.status === "Completed") {
            message.error("This ticket has already been completed");
            setLoading(false);
            return;
          }

          if (!currentUserData.managed_store.includes(res.data.store_id)) {
            message.error("The ticket is not for this store", 7);
            setLoading(false);
            return;
          }
          // in other case the ticket is scanning for exit, or it is allowed
          if (res.data.status === "New" && !res.data.allowed_in) {
            message.error(res.data.reason, 7);
            setLoading(false);
            return;
          }

          setScanState({ success: true, message: "Confirm scan" });
          setTicketData(res.data);
          setOpenModal(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            if (err.response.data.message)
              message.error(err.response.data.message);
            else message.error("Unexpected error");
          }
        });
    }
  };
  return (
    <div>
      <ManagerConfirm
        openModal={openModal}
        setOpenModal={setOpenModal}
        ticketData={ticketData}
        setTicketData={setTicketData}
        axios={axios}
        ticketId={lastTicket}
        setTicketId={setLastTicket}
        setScanState={setScanState}
      />
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
