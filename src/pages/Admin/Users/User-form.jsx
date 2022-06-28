import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { getOneUser } from "../../../api/axios";
const { Option } = Select;

const UserForm = (props) => {
  const { setForm, isEdit, roles } = props;
  const [form] = Form.useForm();

  // 挂载时把form参数传递父组件
  useEffect(() => {
    setForm(form);
  }, []);

  useEffect(() => {
    if (isEdit.bol) {
      form.setFieldsValue(isEdit.editValue);
    }
  }, [isEdit]);

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item
        validateFirst={true}
        label="用户名"
        name="username"
        rules={[
          { required: true, message: "请填入用户名" },
          { type: "string", min: 4, max: 12 },
          !isEdit.bol && {
            validator: async (_, username) => {
              const { msg, status, isExist } = await getOneUser(username);
              if (status !== 0) {
                return Promise.reject(new Error("获取用户名失败，请重新尝试"));
              }
              if (isExist) {
                return Promise.reject(
                  new Error("该用户名已存在，请选择新的用户名")
                );
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input placeholder="请填入用户名" />
      </Form.Item>
      {isEdit.bol ? null : (
        <Form.Item
          validateFirst={true}
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请填入密码" },
            { type: "string", min: 4, max: 12 },
            {
              pattern: /^[0-9a-zA-Z_]+$/,
              message: "该字段只匹配字母、数字、下划线",
            },
          ]}
        >
          <Input.Password placeholder="请填入密码" />
        </Form.Item>
      )}
      <Form.Item label="电话" name="phone">
        <Input placeholder="请填入电话号码" />
      </Form.Item>
      <Form.Item
        validateFirst={true}
        label="邮箱"
        name="email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input placeholder="请填入邮箱" />
      </Form.Item>
      <Form.Item label="角色" name="role_id">
        <Select placeholder="请选择角色">
          {roles.map((e) => (
            <Option value={e._id} key={e._id}>
              {e.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
export default UserForm;
