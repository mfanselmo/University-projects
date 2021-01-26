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
      <h2>Login</h2>
      <Form onFinish={onFinish} autoComplete={"off"}>
        <Form.Item
          label={"Phone number"}
          name="phoneNumber"
          rules={[
            {
              required: true,
              message:
                "Your phone number is required for sign in (format 3xx xxxxxxx)",
              pattern: new RegExp("^[3]{1}[-s./0-9]*$", "i"),
              transform: (val) => val.replace(/\D/g, ""),
              validator: (_, value) =>
                value.length === 10
                  ? Promise.resolve()
                  : Promise.reject("Follow format +39 3xx xxxxxxx"),
            },
          ]}
        >
          <Input addonBefore={"+39"} />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name="password"
          rules={[
            { required: true, message: "Password is required for sign in" },
          ]}
        >
          <Input.Password />
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
