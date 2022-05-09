// 分类路由
import React, { useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Button,
  Modal,
  Select,
  Form,
  Input,
  notification,
} from "antd";

import "./index.less";

const { Option } = Select;
const Category = () => {
  // 添加框
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [form] = Form.useForm();

  // 添加/修改按钮事件
  const handleAddEdit = (target) => {
    if (target === "add") {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }
    setModalVisible(true);
  };

  // 确认添加/修改按钮事件
  const handleOk = async () => {
    const wo = await form.validateFields();
    form.resetFields();
    return setModalVisible(false);
  };

  // 取消添加/修改按钮事件
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="admin-category">
      <Row
        justify="space-between"
        align="middle"
        style={{ height: 60 + "px" }}
        className="admin-category-header"
      >
        <Col>一级分类列表</Col>
        <Col>
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            size="large"
            onClick={() => handleAddEdit("add")}
          >
            添加
          </Button>
          <Modal
            okText="确认"
            cancelText="取消"
            visible={isModalVisible}
            title={isAdd ? "添加" : "修改"}
            maskClosable={false}
            onCancel={handleCancel}
            onOk={handleOk}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                categoryId: "0",
              }}
            >
              <Form.Item label="所属分类：" name="categoryId" preserve={false}>
                <Select style={{ width: 100 + "%" }}>
                  <Option value="0">一级分类</Option>
                  <Option value="1">二级分类</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="分类名称"
                name="categoryName"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateFirst={true}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      <div className="admin-category-content"></div>
    </div>
  );
};
export default Category;
