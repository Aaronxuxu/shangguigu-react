// 用户路由
import React from "react";
import { Card, Button, Table, Space } from "antd";
const UsersTitle = () => {
  return <Button type="primary">创建用户</Button>;
};
const columns = [
  {
    title: "用户名",
    dataIndex: "name",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "电话",
    dataIndex: "phone",
  },
  {
    title: "注册时间",
    dataIndex: "create_time",
  },
  {
    title: "所属角色",
    dataIndex: "role_id",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button type="link">修改</Button>
        <Button type="link">删除</Button>
      </Space>
    ),
  },
];
const Users = () => {
  return (
    <Card title={<UsersTitle />}>
      <Table rowKey="_id" columns={columns}></Table>
    </Card>
  );
};
export default Users;
