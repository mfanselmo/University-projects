import React, { useContext, useEffect } from "react";
import { Form, Button } from "antd";
import { useHistory } from "react-router-dom";

import { logout } from "./../api";
import { stateContext } from "../context/stateContext";

const Logout = () => {
  const context = useContext(stateContext);
  const history = useHistory();

  useEffect(() => {
    if (!context.currentUser) {
      history.push("/");
    }
  }, [history, context.currentUser]);

  const onFinish = (values) => {
    logout(context.axios).then((res) => {
      context.logout();
    });
  };

  return (
    <div>
      <h2>Logout from CLup</h2>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Logout
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Logout;
