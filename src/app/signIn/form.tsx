"use client";

import {
  LockOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Col, Row, Typography } from "antd";
import { useFormState, useFormStatus } from "react-dom";

export default function SignInForm({ authenticate }) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Row justify="center" align="middle" className="min-h-screen">
      <Col span={8}>
        <Typography.Title level={2}>Sign in</Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            username: "",
            password: "",
          }}
          onFinish={dispatch}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <LoginButton />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <ExclamationCircleOutlined className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      className="w-full"
      disabled={pending}
      htmlType="submit"
      type="primary"
    >
      Log in
    </Button>
  );
}
