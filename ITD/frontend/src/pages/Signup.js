import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import { signup } from "./../api";
import { stateContext } from "../context/stateContext";

const SignupPage = () => {
  const context = useContext(stateContext);
  const history = useHistory();

  useEffect(() => {
    if (context.currentUser) {
      history.push("/");
    }
  }, [history, context.currentUser]);

  const onFinish = (values) => {
    signup(context.axios).then((res) => {
      history.push("/login");
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
        <Form.Item name="passwordConfirm" rules={[{ required: true }]}>
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

export default SignupPage;
