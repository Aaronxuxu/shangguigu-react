import React from "react";
import { Form, Card } from "antd";

import ReturnRoute from "../../../../components/Return-Route";
const ProductsAddUpdate = (props) => {
  const { updateValue } = props;
  return (
    <Card
      title={<ReturnRoute title={updateValue ? "修改商品" : "添加商品"} />}
    ></Card>
  );
};
export default ProductsAddUpdate;
