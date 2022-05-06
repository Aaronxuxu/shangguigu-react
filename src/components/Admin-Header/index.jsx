import React, { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import dayjs from "dayjs";
import "./index.less";
const { Header } = Layout;

const AdminHeader = () => {
  const [timeNow, setTimeNow] = useState(dayjs().format("YYYY-MM-DD hh:mm:ss"));

  useEffect(() => {
    const setToken = setInterval(() => {
      setTimeNow(dayjs().format("YYYY-MM-DD hh:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(setToken);
    };
  }, []);
  return (
    <Header className="admin-header">
      <Row justify="end" gutter={24}>
        <Col>
          <span>{timeNow}</span>
        </Col>
        <Col>2</Col>
        <Col>3</Col>
      </Row>
    </Header>
  );
};
export default AdminHeader;
