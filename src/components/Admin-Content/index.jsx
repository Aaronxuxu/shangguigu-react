import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Outlet } from "react-router-dom";

// 路由内容显示区

const { Content } = Layout;
const AdminContent = () => {
  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,  
          backgroundColor: "#fff",
        }}
      >
        <Outlet></Outlet>
      </div>
    </Content>
  );
};
export default AdminContent;
