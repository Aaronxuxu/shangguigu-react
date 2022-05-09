import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Outlet } from "react-router-dom";
import "./index.less";
// 路由内容显示区

const { Content } = Layout;
const AdminContent = () => {
  return (
    <Content className="admin-content-main">
      <Outlet></Outlet>
    </Content>
  );
};
export default AdminContent;
