import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Menu, Dropdown, Space, Button, Modal } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import "./index.less";
import { removeCookie } from "../../redux/actions/loginState";

const { Header } = Layout;
const { confirm } = Modal;

const AdminHeader = (props) => {
  const navigate = useNavigate();
  // 设置State当前时间
  const [timeNow, setTimeNow] = useState(dayjs().format("hh:mm:ss"));
  // 设置State当前登录用户名
  const [userName, setUserName] = useState("");
  // 退出登录
  const handleLogout = () => {
    confirm({
      title: "确定退出登录吗?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      centered: true,
      onOk() {
        props.removeCookie();
        setTimeout(function () {
          navigate("/login");
        }, 1000);
      },
      onCancel() {},
    });
  };

  // 模拟生命周期
  useEffect(() => {
    // 获取当前时间
    const setToken = setInterval(() => {
      setTimeNow(dayjs().format("hh:mm:ss"));
    }, 1000);
    setUserName(props.username);
    return () => {
      clearInterval(setToken);
    };
  }, []);

  return (
    <Header className="admin-header">
      <Row
        justify="space-between"
        align="middle"
        gutter={24}
        style={{ height: 80 + "px" }}
      >
        <Col>
          <Space>
            <span>{timeNow}</span>
          </Space>
        </Col>
        <Col>
          <Dropdown
            overlay={
              <Menu
                items={[
                  {
                    label: (
                      <Button type="text" onClick={handleLogout}>
                        退出登录
                      </Button>
                    ),
                    disabled: true,
                  },
                ]}
              />
            }
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <span>
              <Space>
                <span className="admin-header-username">{userName}</span>
                <DownOutlined />
              </Space>
            </span>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};
export default connect(
  (state) => ({
    username: state.loginState.username,
  }),
  {
    removeCookie,
  }
)(AdminHeader);
