import { render } from "@testing-library/react";
import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import * as ROUTES from "./../constants/routes";

const AnonymousUserCheck = () => {
  const [open, setOpen] = useState(false);
  const scannerRef = useRef(null);
  const history = useHistory();

  const handleScan = (data) => {
    if (data) {
      history.push(`${ROUTES.BOOK}/${data}`);
    }
  };

  return (
    <div>
      <h4>Check ticket status</h4>
      <Button onClick={() => setOpen(true)}>Scan QR</Button>
      <Modal
        destroyOnClose={true}
        title="Scan QR"
        visible={open}
        onCancel={() => {
          scannerRef.current.stopCamera();
          setOpen(!open);
        }}
        footer={
          <Button
            onClick={() => {
              scannerRef.current.stopCamera();
              setOpen(!open);
            }}
          >
            Cancel
          </Button>
        }
      >
        <QrReader
          ref={scannerRef}
          delay={300}
          onScan={handleScan}
          onError={message.error}
        />
      </Modal>
    </div>
  );
};

export default AnonymousUserCheck;
