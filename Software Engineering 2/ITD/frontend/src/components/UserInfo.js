import { Button, Table } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { stateContext } from "../context/stateContext";
import moment from "moment";
import { Link } from "react-router-dom";
import * as ROUTES from "./../constants/routes";

const ticketColumns = [
  //   {
  //     title: "Ticket QR",
  //     dataIndex: "ticket_id",
  //     key: "ticket_id",
  //     render: (ticketId) => (
  //       <Link to={`${ROUTES.LINEUP}/${ticketId}`}>
  //         <QRCode value={ticketId} />
  //       </Link>
  //     ),
  //   },
  {
    title: "Approximate enter time",
    dataIndex: "time_of_visit",
    key: "time_of_visit",
    render: (text) =>
      `${moment(text, "YYYY-MM-DD HH:mm:ss").format(" MMMM Do - h:mm a")}`,
  },
  {
    title: "View detail/print",
    dataIndex: "ticket_id",
    render: (ticketId) => (
      <Link to={`${ROUTES.LINEUP}/${ticketId}`}>
        <Button>View</Button>
      </Link>
    ),
  },
];
const bookingColumns = [
  {
    title: "Enter date",
    dataIndex: "time_of_visit",
    key: "time_of_visit",
    render: (text) => {
      return (
        <p>{moment(text, "YYYY-MM-DD HH:mm:ss").format(" MMMM Do - h:mm a")}</p>
      );
    },
  },
  {
    title: "View detail/print",
    dataIndex: "ticket_id",
    render: (ticketId) => (
      <Link to={`${ROUTES.BOOK}/${ticketId}`}>
        <Button>View</Button>
      </Link>
    ),
  },
];

const UserInfo = () => {
  const { currentUserData } = useContext(stateContext);

  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(() => {
    if (currentUserData) setCurrentUserInfo(currentUserData);
  }, [currentUserData]);

  if (!currentUserInfo) return <div></div>;

  return (
    <div className={"userInfo"}>
      {currentUserInfo.active_tickets[0] && (
        <div className={"tickets"}>
          <h2>Your active tickets</h2>
          <Table
            dataSource={currentUserInfo.active_tickets}
            columns={ticketColumns}
            pagination={false}
            rowKey={"ticket_id"}
            size={"middle"}
          />
        </div>
      )}
      {currentUserInfo.bookings[0] && (
        <div className={"bookings"}>
          <h2>Your active bookings</h2>
          <Table
            dataSource={currentUserInfo.bookings}
            columns={bookingColumns}
            pagination={false}
            size={"middle"}
            rowKey={"ticket_id"}
          />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
