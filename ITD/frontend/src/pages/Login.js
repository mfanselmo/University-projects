import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import { login } from "./../api";
import { stateContext } from "../context/stateContext";

const LoginPage = () => {
  const context = useContext(stateContext);
  const history = useHistory();

  useEffect(() => {
    if (context.currentUser) {
      history.push("/");
    }
  }, [history, context.currentUser]);

  const onFinish = (values) => {
    login(context.axios).then((res) => {
      context.login(
        values.phoneNumber,
        res.authentication_token,
        res.is_manager
      );
    });
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="phoneNumber" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
