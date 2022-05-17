import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
// 返回上一页路由组件
const ReturnRoute = (props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    return navigate(-1, { replace: true });
  };
  return (
    <Space size="large">
      <Button
        type="primary"
        onClick={handleBack}
        icon={<ArrowLeftOutlined />}
        size="large"
      ></Button>
      <span style={{ fontSize: "20px" }}>{props.title}</span>
    </Space>
  );
};
export default ReturnRoute;
