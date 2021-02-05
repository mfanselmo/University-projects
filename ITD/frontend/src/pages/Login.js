import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";

import { login } from "./../api";
import { stateContext } from "../context/stateContext";

const LoginPage = () => {
  const context = useContext(stateContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (context.currentUser) {
      history.push("/");
    }
  }, [history, context.currentUser]);

  const onFinish = (values) => {
    let { phoneNumber, password } = values;
    phoneNumber = "+39" + phoneNumber;
    setLoading(true);

    login(context.axios, phoneNumber, password)
      .then((res) => {
        setLoading(false);
        context.login(
          "+39" + values.phoneNumber,
          res.data.authentication_token,
          res.data.isManager
        );
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message)
            message.error(err.response.data.message);
          else message.error("Unexpected error");
        }
        setLoading(false);
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
        {/* <Form.Item name="isManager" valuePropName="checked">
          <Checkbox>Manager login (debugging purposes)</Checkbox>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
