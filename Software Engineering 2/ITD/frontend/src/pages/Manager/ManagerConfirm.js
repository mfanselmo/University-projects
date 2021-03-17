import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

import moment from "moment";
import { scanTicket } from "../../api";
import { message } from "antd";

const ManagerConfirm = ({
  openModal,
  setOpenModal,
  ticketData,
  setTicketData,
  ticketId,
  setTicketId,
  setScanState,
  axios,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setTicketData(null);
    setOpenModal(false);
    setTicketId(null);
  };
  const handleOk = () => {
    setLoading(true);

    scanTicket(axios, ticketId)
      .then(() => {
        message.success("Ticket scanned succesfully");
        setLoading(false);
        setTicketData(null);
        setOpenModal(false);
        setTicketId(null);

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
        setLoading(false);
        setTicketData(null);
        setOpenModal(false);
        setTicketId(null);
        setScanState({ success: false, message: err.message });
      });
  };
  if (!ticketData) return <div></div>;

  return (
    <Modal
      title={"Confirm scan"}
      visible={openModal}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={"Confirm scan"}
      cancelText={"Cancel scan"}
      cancelButtonProps={{ type: "danger" }}
      confirmLoading={loading}
    >
      <h3>
        Ticket for {ticketData.store_name} - {ticketData.address}
      </h3>
      <p>
        {ticketData.status === "New" ? "Scan for entering" : "Scan for exiting"}
      </p>
      <p>
        Enter time slot{" "}
        {moment(
          ticketData.approximate_enter_time,
          "YYYY-MM-DD HH:mm:ss"
        ).format(" MMMM Do - h:mm a")}
      </p>
    </Modal>
  );
};

export default ManagerConfirm;
