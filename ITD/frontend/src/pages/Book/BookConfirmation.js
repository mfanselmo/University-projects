import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import QRCode from "qrcode.react";
import { stateContext } from "../../context/stateContext";
import moment from "moment";
import { getBookingStatus } from "./../../api";
import { Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BookConfirmationPage = () => {
  const state = useContext(stateContext);
  const history = useHistory();

  const { ticketId } = useParams();
  const { currentUser, axios } = state;
  const [ticketData, setTicketData] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const checkTicket = async () => {
      getBookingStatus(axios, ticketId)
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
          <h2>CLup - Book a ticket</h2>
        </div>
        {ticketData && (
          <div>
            <h4>Confirmation page</h4>
            <QRCode value={ticketId} size={256} />
            <p>Time to enter: {date.format(" MMMM Do - h:mm a")}</p>
            <p>Store: {ticketData.store_name}</p>
            <p>Address: {ticketData.address}</p>
            <p>Status: {ticketData.status}</p>
            {/* <h5>Categories: </h5>
            <ul>
              {store.shopping_categories.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul> */}
            <Button onClick={() => window.print()}>Print this code</Button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BookConfirmationPage;
