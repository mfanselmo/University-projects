import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import QRCode from "qrcode.react";
import { stateContext } from "../../context/stateContext";
import moment from "moment";
import { getTicketStatus } from "./../../api";
import { Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LineUpConfirmationPage = () => {
  const state = useContext(stateContext);
  const { ticketId } = useParams();
  const { currentUser, axios } = state;
  const [ticketData, setTicketData] = useState(null);
  const history = useHistory();

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
          </div>
        )}
      </Spin>
    </div>
  );
};

export default LineUpConfirmationPage;
