import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const UpdateForm = (props) => {
  const { setForm, updateItem } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    setForm(form);
    form.setFieldsValue({ categoryName: updateItem.name });
  }, [updateItem]);
  return (
    <Form form={form} layout="vertical" name="formData">
      <Form.Item
        name="categoryName"
        label="分类名称"
        rules={[
          {
            required: true,
            message: "分类名称是必填项",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
export default UpdateForm;
