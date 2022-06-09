import React, { useEffect } from "react";
import { Form, Input } from "antd";
const AddRole = (props) => {
  const [addForm] = Form.useForm();
  useEffect(() => {
    const { setForm } = props;
    setForm(addForm);
  }, []);
  return (
    <Form form={addForm} name="formData">
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[{ required: true, message: "角色名称是必填项" }]}
      >
        <Input placeholder="请输入角色名称"></Input>
      </Form.Item>
    </Form>
  );
};
export default AddRole;
