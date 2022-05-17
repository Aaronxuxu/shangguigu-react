import React from "react";
import { Form, Card, Input, Select, Upload } from "antd";

import ReturnRoute from "../../../../components/Return-Route";
const { Option } = Select;
const ProductsAddUpdate = (props) => {
  const { updateValue } = props;
  return (
    <Card title={<ReturnRoute title={updateValue ? "修改商品" : "添加商品"} />}>
      <Form
        size="large"
        // labelAlign="left"
        labelCol={{ xs: { span: 24 }, lg: { span: 2 } }}
        wrapperCol={{ xs: { span: 24 }, lg: { span: 8 } }}
      >
        {/* 必须 */}
        <Form.Item label="商品名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="商品描述" name="desc">
          <Input />
        </Form.Item>
        <Form.Item label="商品价格" name="price">
          <Input addonAfter="元" />
        </Form.Item>
        {/* 必须 */}
        <Form.Item
          label="商品分类"
          name="pCategoryId"
          rules={[{ required: true }]}
        >
          <Select placeholder="请选择父分类"></Select>
        </Form.Item>
        <Form.Item label="商品图片" name="imgs">
          <Input />
        </Form.Item>
        <Form.Item label="商品详情" name="detail">
          <Input />
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ProductsAddUpdate;
