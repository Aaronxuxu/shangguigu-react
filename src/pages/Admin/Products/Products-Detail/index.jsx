import React, { useEffect, useState } from "react";
import ReturnRoute from "../../../../components/Return-Route";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Divider, Skeleton } from "antd";
import { getCategoryID } from "../../../../api/axios";
import "./index.less";

const ProductsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProduct = async () => {
    const { data } = location.state;
    const {
      data: { name: pName },
    } = await getCategoryID(data.pCategoryId);
    const {
      data: { name: cName },
    } = await getCategoryID(data.categoryId);
    setResult([
      {
        key: "name",
        chiName: "商品名称：",
        value: data.name,
      },
      {
        key: "desc",
        chiName: "商品描述：",
        value: data.desc,
      },
      {
        key: "price",
        chiName: "商品价格：",
        value: data.price,
      },
      {
        key: "category",
        chiName: "所属分类：",
        value: `${pName} ==> ${cName}`,
      },
      {
        key: "img",
        chiName: "商品图片：",
        value: data.img,
      },
      {
        key: "detail",
        chiName: "商品详情：",
        value: data.detail,
      },
    ]);
    setLoading(false);
  };
  const handleBack = () => {
    return navigate(-1);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Card title={<ReturnRoute title="商品详情" />} bordered={false}>
      {result.map((e, i) => (
        <div key={i}>
          <Row align="middle">
            <Col span={2} style={{ fontSize: "22px", fontWeight: 700 }}>
              {e.chiName}
            </Col>

            <Col span={22} style={{ fontSize: "16px" }}>
              <Skeleton loading={loading} active>
                {e.value}
              </Skeleton>
            </Col>
          </Row>
          <Divider></Divider>
        </div>
      ))}
    </Card>
  );
};
export default ProductsDetail;
