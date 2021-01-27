import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import QRCode from "qrcode.react";
import { stateContext } from "../../context/stateContext";
import moment from "moment";
import { getAllStores, getBookingStatus } from "./../../api";
import { Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BookConfirmationPage = () => {
  const state = useContext(stateContext);
  const { ticketId } = useParams();
  const { currentUser, axios } = state;
  const [ticketData, setTicketData] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const checkTicket = async () => {
      getBookingStatus(axios, ticketId)
        .then((res) => {
          console.log(res);
          setTicketData(res);
        })
        .catch((err) => {
          message.error(err.message);
          // redirect to home
        });
    };

    checkTicket();
  }, [axios, ticketId]);

  useEffect(() => {
    const loadStore = async () => {
      getAllStores(axios).then((res) => {
        setStore(res.data.find((d) => d.store_id === ticketData.store_id));
      });
    };

    if (ticketData) loadStore();
  }, [axios, ticketData]);

  const date = ticketData ? new Date(ticketData.enter_time) : null;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Spin indicator={antIcon} spinning={!ticketData}>
        <div>
          <h2>CLup - Book a ticket</h2>
        </div>
        {ticketData && store && (
          <div>
            <h4>Confirmation page</h4>
            <QRCode value={ticketId} size={256} />
            <p>Time to enter: {moment(date).format(" MMMM Do - h:mm a")}</p>
            <p>Store: {store.address}</p>
            <h5>Categories: </h5>
            <ul>
              {store.shopping_categories.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Button onClick={() => window.print()}>Print this code</Button>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default BookConfirmationPage;
