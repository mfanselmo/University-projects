import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";

import { signup } from "./../api";
import { stateContext } from "../context/stateContext";

const SignupPage = () => {
  const { axios, currentUser, login } = useContext(stateContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [history, currentUser]);

  const onFinish = (values) => {
    setLoading(true);

    signup(
      axios,
      "+39" + values.phoneNumber,
      values.password,
      values.emailAdress,
      values.username
    )
      .then((res) => {
        setLoading(false);
        login(
          "+39" + values.phoneNumber,
          res.data.authentication_token,
          res.data.isManager === "true"
        );

        history.push("/login");
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
          label={"Email address"}
          name="emailAddress"
          rules={[
            {
              required: true,
              message: "Add a valid email address",
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Username"}
          name="username"
          rules={[
            {
              required: true,
              message: "Add a valid username (4 characters or more)",
              min: 4,
            },
          ]}
        >
          <Input />
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;
