import React, { Component } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import "./index.less";
export default class Login extends Component {
  handleSubmit = async (values) => {
    console.log(
      "成功回调",
      values
      // await axios.post("http://localhost:5000/login", values)
    );
  };
  handleSubmitFailed = (values) => {
    return message.error("请修改/填入字段", 2);
  };
  render() {
    return (
      <div className="login">
        <div className="login-main">
          <h1 className="login-main-header">管理员登陆</h1>
          <div className="login-main-form">
            <Form
              name="basic"
              autoComplete="off"
              size="large"
              className="login-form"
              onFinish={this.handleSubmit}
              onFinishFailed={this.handleSubmitFailed}
            >
              <Form.Item
                name="username"
                className="login-form-item"
                rules={[
                  { required: true },
                  { type: String },
                  { max: 12 },
                  { min: 4 },
                  { pattern: /^[0-9a-zA-Z_]+$/ },
                  { whitespace: true },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="账号"
                />
              </Form.Item>
              <Form.Item
                className="login-form-item"
                name="password"
                rules={[
                  { required: true },
                  { type: String },
                  { max: 12 },
                  { min: 4 },
                  { pattern: /^[0-9a-zA-Z_]+$/ },
                  { whitespace: true },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
