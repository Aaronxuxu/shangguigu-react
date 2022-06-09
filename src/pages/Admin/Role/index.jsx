// 权限路由
import React, { useState, useEffect, useRef } from "react";

import { Card, Space, Button, Modal, message, Table } from "antd";
import AddRole from "./AddRole";
import SetRole from "./SetRole";
import { addRole, updateRole, getRoles } from "../../../api/axios";
import { getCookies } from "../../../utils/cookieUtils";
import dayjs from "dayjs";

// 卡片标题组件
const CardTitle = (props) => {
  // 获取修改数据
  const { roleTarget } = props;
  // 是否展开
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 添加/设置
  const [isAdd, setIsAdd] = useState(true);
  // 异步加载
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 表单属性
  const [form, setForm] = useState({});
  // 弹出框回调
  const showModal = (target) => {
    setIsModalVisible(true);
    if (target === "add") {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }
  };

  // 提交数据
  const handleSubmit = async () => {
    const { getRolesItems } = props;
    setConfirmLoading(true);

    return form
      .validateFields()
      .then(async (values) => {
        const { roleName } = values;
        if (isAdd) {
          const { status, msg, data } = await addRole(roleName);
          if (status !== 0) {
            message.error(msg);
          } else {
            message.success("添加角色成功");
          }
        } else {
          const { username } = getCookies();
          const { status, msg, data } = await updateRole({
            _id: roleTarget._id,
            menus: values.menus,
            auth_name: username,
          });
          if (status !== 0) {
            message.error(msg);
          } else {
            message.success("修改角色成功");
          }
        }
        setConfirmLoading(false);
        form.resetFields();
        getRolesItems();
        setIsModalVisible(false);
      })
      .catch((err) => {
        return message.warning("请填入必填项");
      });
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => showModal("add")}>
          创建角色
        </Button>
        <Button
          type="primary"
          onClick={() => showModal("set")}
          disabled={roleTarget && roleTarget._id ? false : true}
        >
          设置角色权限
        </Button>
      </Space>
      <Modal
        title={isAdd ? "创建角色" : "设置角色权限"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        maskClosable={false}
        confirmLoading={confirmLoading}
      >
        {isAdd ? (
          <AddRole setForm={setForm} />
        ) : (
          <SetRole setForm={setForm} roleTarget={roleTarget} />
        )}
      </Modal>
    </>
  );
};

// 角色页面
const Role = () => {
  // 表格标题
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      render: (text) => text && dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
    },
  ];
  // 角色数据
  const [roleItems, setRoleItems] = useState([]);
  // 当前选中目标
  const [roleTarget, setRoleTarget] = useState({});
  // 加载
  const [loading, setLoading] = useState(false);
  // 获取角色列表
  const getRolesItems = async () => {
    setLoading(true);
    const { status, data, msg } = await getRoles();
    if (status !== 0) {
      message.error(msg);
    }
    setRoleItems(data);
    setLoading(false);
  };
  //
  // 生命周期
  useEffect(() => {
    getRolesItems();
  }, []);

  return (
    <Card
      title={
        <CardTitle getRolesItems={getRolesItems} roleTarget={roleTarget} />
      }
    >
      <Table
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => setRoleTarget({ ...selectedRows[0] }),
        }}
        bordered={true}
        columns={columns}
        dataSource={roleItems}
        loading={loading}
        rowKey="_id"
        pagination={{ position: ["bottomCenter"], pageSize: 8 }}
      />
    </Card>
  );
};
export default Role;
