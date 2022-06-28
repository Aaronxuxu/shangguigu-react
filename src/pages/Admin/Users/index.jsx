// 用户路由
import React, { useEffect, useState } from "react";
import { Card, Button, Table, Space, message, Modal, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers, delUser, updateUser } from "../../../api/axios";
import dayjs from "dayjs";
import UserForm from "./User-form";

const Users = () => {
  // 表格标题
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
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
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      render: (text) =>
        "" || (text && usersList.roles.find((e) => e._id === text).name),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleClick(record)}>
            修改
          </Button>
          <Popconfirm
            title="确认要删除该用户数据吗？"
            onConfirm={() => handleDel(record._id)}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 路由跳转
  const navigate = useNavigate();
  // 用户数据
  const [usersList, setUsersList] = useState([]);
  // 表单数据
  const [form, setForm] = useState({});
  // 是否修改数据
  const [isEdit, setIsEdit] = useState({ bol: false });
  // 弹出框
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 标题组件
  const UsersTitle = () => {
    return (
      <Button type="primary" onClick={() => handleClick()}>
        创建用户
      </Button>
    );
  };

  // 获取用户数据
  const getUserItems = async () => {
    const { status, data, msg } = await getUsers();
    if (status !== 0) {
      message.error(msg, "一秒后返回上一页。");
      return setTimeout(() => {
        navigate(-1, { replace: true });
      }, 1000);
    }
    setUsersList(data);
  };

  // 添加/修改弹出框
  const handleClick = (intent) => {
    setIsModalVisible(true);
    if (intent && intent._id) {
      setIsEdit({
        bol: true,
        editValue: { ...intent },
      });
    } else {
      setIsEdit({
        bol: false,
      });
    }
  };

  // 提交数据
  const handleOk = () => {
    return form
      .validateFields()
      .then(async (value) => {
        const { bol } = isEdit;
        let axiosReq = null;
        if (bol) {
          axiosReq = await updateUser({
            _id: isEdit.editValue._id,
            ...value,
          });
        } else {
          axiosReq = await addUser(value);
        }
        const { status, msg } = axiosReq;
        if (status !== 0) {
          message.error(msg);
        } else {
          message.success(bol ? "修改成功" : "添加成功");
        }
        form.resetFields();
        setIsModalVisible(false);
        return getUserItems();
      })
      .catch((e) => {
        message.error("请确认必填项是否已填写/用户名是否已存在");
      });
  };

  // 删除用户
  const handleDel = async (id) => {
    const { status } = await delUser(id);
    if (status !== 0) {
      message.error("删除该用户数据失败");
    } else {
      message.success("删除该用户数据成功");
    }
    getUserItems();
  };

  // componentDidMount
  useEffect(() => {
    getUserItems();
  }, []);

  return (
    <>
      <Card title={<UsersTitle />}>
        <Table
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={usersList.users}
          pagination={{ position: ["bottomCenter"], pageSize: 8 }}
        ></Table>
      </Card>
      <Modal
        title={isEdit.bol ? "修改用户" : "添加用户"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false);
        }}
      >
        <UserForm
          setForm={setForm}
          isEdit={isEdit}
          roles={usersList.roles}
        ></UserForm>
      </Modal>
    </>
  );
};
export default Users;
