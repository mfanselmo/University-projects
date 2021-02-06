import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import QRCode from "qrcode.react";
import { stateContext } from "../../context/stateContext";
import moment from "moment";
import { cancelTicket, getTicketStatus } from "./../../api";
import { Button, message, Spin, Popconfirm } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LineUpConfirmationPage = () => {
  const state = useContext(stateContext);
  const { ticketId } = useParams();
  const { axios, reloadCurrentUserData } = state;
  const [ticketData, setTicketData] = useState(null);

  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);

  const history = useHistory();

  const handleDeleteTicket = () => {
    if (!axios) {
      message.error("You must be logged in to perform this action");
    }

    setConfirmDeleteLoading(true);
    cancelTicket(axios, ticketId)
      .then((res) => {
        setConfirmDeleteLoading(false);
        setDeleteConfirmVisible(false);
        message.success("Ticket canceled correclty");
        reloadCurrentUserData();
        history.push("/");
      })
      .catch((err) => {
        setConfirmDeleteLoading(false);
        setDeleteConfirmVisible(false);
        message.error("Something went bad, try again");
      });
  };

  useEffect(() => {
    const checkTicket = async () => {
      getTicketStatus(axios, ticketId)
        .then((res) => {
          setTicketData(res.data);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.message)
              message.error(err.response.data.message);
            else message.error("Unexpected error");
          }

          // redirect to home
          history.push("/");
        });
    };

    checkTicket();
  }, [axios, ticketId, history]);

  const date = ticketData
    ? moment(ticketData.approximate_enter_time, "YYYY-MM-DD HH:mm:ss")
    : null;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Spin indicator={antIcon} spinning={!ticketData}>
        <div>
          <h2>CLup - Line up</h2>
        </div>
        {ticketData && (
          <div>
            <h4>Confirmation page</h4>
            <QRCode value={ticketId} size={256} />
            <p>Approximate time to enter: {date.format(" MMMM Do - h:mm a")}</p>
            <p>Store: {ticketData.store_name}</p>
            <p>Address: {ticketData.address}</p>
            <p>Status: {ticketData.status}</p>
            <Button onClick={() => window.print()}>Print this code</Button>
            {ticketData.status === "New" && (
              <Popconfirm
                title="Are you sure?"
                okText={"Cancel"}
                visible={deleteConfirmVisible}
                onConfirm={handleDeleteTicket}
                okButtonProps={{
                  loading: confirmDeleteLoading,
                  type: "danger",
                }}
                onCancel={() => setDeleteConfirmVisible(false)}
              >
                <Button
                  type="danger"
                  onClick={() => setDeleteConfirmVisible(true)}
                >
                  Cancel ticket
                </Button>
              </Popconfirm>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
};

export default LineUpConfirmationPage;
