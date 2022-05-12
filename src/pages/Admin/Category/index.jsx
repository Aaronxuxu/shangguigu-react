// 分类路由
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  notification,
  Breadcrumb,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getCategory, addCategory, updateCateName } from "../../../api/axios";
import AddForm from "./add-form";
import UpdateForm from "./upadte-form";
import "./index.less";

const Category = () => {
  // 表格标题
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      width: 30 + "%",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() =>
              handleAddEdit({
                id: record._id,
                name: record.name,
                method: "edit",
              })
            }
          >
            修改分类
          </Button>
          <Button
            onClick={() => handleSonCate({ id: record._id, name: record.name })}
          >
            查看子分类
          </Button>
        </Space>
      ),
    },
  ];

  // 设置state
  const [cateItems, setCateItems] = useState([]); // 分类数据列表
  const [parentId, setParentId] = useState(0); // 查找parentId的分类
  const [parentName, setParentName] = useState(""); // 当前分类名称
  const [isLoading, setIsLoading] = useState(true); // 是否加载中

  const [isModalVisible, setVisible] = useState(false); //对话框是否显示
  const [form, setForm] = useState({}); //  添加表单的数据
  const [isAdd, setIsAdd] = useState(true); //判断是否添加/编辑
  const [isSecond, setIsSecond] = useState(false); //  添加表单是否显示二级分类
  const [updateItem, setUpdateItem] = useState({}); // 修改更新分类名称

  // 获取分类列表
  const getCate = async (id) => {
    const { data } = await getCategory(id);
    setIsLoading(false);
    setCateItems(data);
  };

  // 添加/修改分类
  const handleAddEdit = (target) => {
    if (target.method === "add") {
      setIsAdd(true);
    } else {
      setUpdateItem({ ...target });
      setIsAdd(false);
    }
    return setVisible(true);
  };

  // 对话框提交数据
  const handleOk = () => {
    return form
      .validateFields()
      .then(async (value) => {
        if (isAdd) {
          const { status } = await addCategory({
            ...value,
            parentId: value.parentId || value.belongCate,
          });
          if (status !== 0) {
            return notification["error"]({
              message: "添加分类失败",
            });
          }
          notification["success"]({
            message: "添加分类成功",
          });
        } else {
          const { status } = await updateCateName({
            categoryId: updateItem.id,
            categoryName: value.categoryName,
          });
          if (status === 0) {
            notification["success"]({
              message: "更改分类名字成功",
            });
          } else {
            return notification["error"]({
              message: "更改失败",
            });
          }
        }
        setUpdateItem({});
        setIsSecond(false);
        form.resetFields();
        getCate(parentId);
        return setVisible(false);
      })
      .catch((err) => {
        notification["error"]({
          message: "请填入必填项",
        });
      });
  };

  // 对话框显示隐藏
  const handleCancel = () => {
    setIsSecond(false);
    form.resetFields();
    return setVisible(false);
  };

  // 查看子分类
  const handleSonCate = (value) => {
    const { id, name } = value;
    setParentId(id);
    setParentName(name);
    return getCate(value);
  };

  // 返回一级分类
  const handleFirst = () => {
    setParentId(0);
    getCate();
  };
  // 模拟生命周期
  useEffect(() => {
    getCate(parentId);
  }, []);

  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item onClick={handleFirst} className="base-cursor">
            一级分类
          </Breadcrumb.Item>
          {parentId !== 0 && <Breadcrumb.Item>{parentName}</Breadcrumb.Item>}
        </Breadcrumb>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => handleAddEdit({ method: "add" })}
        >
          添加
        </Button>
      }
      bordered={false}
    >
      <Table
        loading={isLoading}
        bordered={true}
        columns={columns}
        dataSource={cateItems}
        rowKey="_id"
        pagination={{
          hideOnSinglePage: true,
          position: ["bottomCenter"],
          defaultPageSize: 6,
        }}
      />
      <Modal
        title={isAdd ? "添加分类" : "修改分类名称"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isAdd ? (
          <AddForm
            setForm={setForm}
            isSecond={isSecond}
            setIsSecond={setIsSecond}
          />
        ) : (
          <UpdateForm setForm={setForm} updateItem={updateItem} />
        )}
      </Modal>
    </Card>
  );
};
export default Category;
