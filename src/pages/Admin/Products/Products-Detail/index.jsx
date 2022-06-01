import React, { useEffect, useState } from "react";
import ReturnRoute from "../../../../components/Return-Route";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, List, Skeleton, Space, Image, notification } from "antd";
import { getCategoryID, searchOneProduct } from "../../../../api/axios";
import { BASE_IMG_URL, ERROR_IMG } from "../../../../utils/constant";
import "./index.less";

const ProductsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const { id } = location.state;
    const { status, data, msg } = await searchOneProduct(id);
    if (status !== 0) {
      notification["error"]({
        message: msg + "，正在跳转回上一页",
      });
      return setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
    const { pCategoryId, categoryId } = data;
    if (pCategoryId === "0") {
      const result = await getCategoryID(categoryId);
      data["categoryItems"] = [result.data.name];
    } else {
      const result = await Promise.all([
        getCategoryID(pCategoryId),
        getCategoryID(categoryId),
      ]);
      data["categoryItems"] = result.map((e) => e.data.name);
    }
    setProduct({ ...data });
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Card title={<ReturnRoute title="商品详情" />} bordered={false}>
      <List>
        <List.Item className="products-list-items">
          <Space wrap>
            <div className="products-title">商品名称：</div>
            <div className="products-content">
              {isloading ? (
                <Skeleton.Input active size="large"></Skeleton.Input>
              ) : (
                <span className="products-content">{product.name}</span>
              )}
            </div>
          </Space>
        </List.Item>
        <List.Item className="products-list-items">
          <Space wrap>
            <span className="products-title">商品描述：</span>
            {isloading ? (
              <Skeleton.Input
                active
                size="large"
                loading={isloading}
              ></Skeleton.Input>
            ) : (
              <span className="products-content">
                {product.desc === undefined
                  ? "该商品未添加商品描述"
                  : product.desc}
              </span>
            )}
          </Space>
        </List.Item>
        <List.Item className="products-list-items">
          <Space wrap>
            <span className="products-title">商品价格：</span>
            {isloading ? (
              <Skeleton.Input
                active
                size="large"
                loading={isloading}
              ></Skeleton.Input>
            ) : (
              <span className="products-content">{product.price}元</span>
            )}
          </Space>
        </List.Item>
        <List.Item className="products-list-items">
          <Space wrap>
            <span className="products-title">所属分类：</span>
            {isloading ? (
              <Skeleton.Input
                active
                size="large"
                loading={isloading}
              ></Skeleton.Input>
            ) : (
              <span className="products-content">
                {product.categoryItems.reduce((a, c) => `${a} ==> ${c}`)}
              </span>
            )}
          </Space>
        </List.Item>
        <List.Item className="products-list-items">
          <Space wrap>
            <span className="products-title">商品图片：</span>
            {isloading ? (
              <Skeleton.Image
                active
                size="large"
                loading={isloading}
              ></Skeleton.Image>
            ) : (
              <span className="products-content">
                <Space wrap size="middle">
                  {product.imgs.length > 0
                    ? product.imgs.map((e, i) => (
                        <Image
                          key={i}
                          src={BASE_IMG_URL + e}
                          style={{
                            width: "110px",
                            height: "110px",
                            border: "1px solid #ccc",
                          }}
                          fallback={ERROR_IMG}
                        ></Image>
                      ))
                    : "该商品未添加相关图片"}
                </Space>
              </span>
            )}
          </Space>
        </List.Item>
        <List.Item className="products-list-items">
          <Space wrap>
            <span className="products-title">商品详情：</span>
            {isloading ? (
              <Skeleton.Input
                active
                size="large"
                loading={isloading}
              ></Skeleton.Input>
            ) : (
              <span
                className="products-content"
                dangerouslySetInnerHTML={{
                  __html:
                    typeof product.detail !== "undefined"
                      ? product.detail
                      : "<h1>暂无添加商品详情</h1>",
                }}
              ></span>
            )}
          </Space>
        </List.Item>
      </List>
    </Card>
  );
};
export default ProductsDetail;
