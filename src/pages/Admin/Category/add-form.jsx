import React, { useState, useEffect } from "react";
import { Form, Input, Select, notification } from "antd";

import { getCategory } from "../../../api/axios";
const { Option } = Select;
const AddForm = (props) => {
  // 获取父组件传递过来函数
  const { setForm, setIsSecond, isSecond } = props;
  // 设置state

  const [getParentCate, setParentCate] = useState([]);
  // 方法
  const [form] = Form.useForm();

  const handleSecond = async (value) => {
    if (value === "1") {
      const { data, status } = await getCategory("0");
      if (status !== 0) {
        return notification["error"]({
          message: "未能找到父系分类",
        });
      }
      setIsSecond(true);
      form.setFieldsValue({ parentId: data[0]._id });
      setParentCate(data);
    } else {
      setParentCate([]);
      return setIsSecond(false);
    }
  };

  // 组件挂载时
  useEffect(() => {
    setForm(form);
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      name="formData"
      initialValues={{
        belongCate: "0",
      }}
    >
      <Form.Item
        name="belongCate"
        label="所属分类"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select onChange={handleSecond}>
          <Option value="0">一级分类</Option>
          <Option value="1">二级分类</Option>
        </Select>
      </Form.Item>
      {isSecond ? (
        <Form.Item
          name="parentId"
          label="所属父类"
          rules={[
            {
              required: true,
              message: "请选择所属父系",
            },
          ]}
        >
          <Select>
            {getParentCate.map((e) => (
              <Option value={e._id} key={e._id}>
                {e.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}
      <Form.Item
        name="categoryName"
        label="分类名称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
export default AddForm;
