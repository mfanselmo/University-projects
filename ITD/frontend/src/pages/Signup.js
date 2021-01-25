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
      <h2>Sign up</h2>
      <Form onFinish={onFinish}>
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
        <Form.Item
          label={"Confirm your password"}
          name="paswordConfirm"
          rules={[
            {
              required: true,
              message: "Confirm your password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
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

export default SignupPage;
