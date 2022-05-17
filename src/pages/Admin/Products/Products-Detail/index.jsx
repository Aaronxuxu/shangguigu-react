import React, { useEffect, useState } from "react";
import ReturnRoute from "../../../../components/Return-Route";
import { useLocation } from "react-router-dom";
import { Card, List, Skeleton, Space, Image } from "antd";
import { getCategoryID } from "../../../../api/axios";
import { BASE_IMG_URL } from "../../../../utils/constant";
import "./index.less";

const ProductsDetail = () => {
  const location = useLocation();
  const [isloading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const { name, price, imgs, desc, detail, categoryId, pCategoryId } =
      location.state.data;
    const result = await Promise.all([
      getCategoryID(pCategoryId),
      getCategoryID(categoryId),
    ]);
    setProduct({
      name,
      price,
      imgs,
      desc,
      detail,
      categoryItems: result.map((e) => e.data.name),
    });
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
                    ? product.imgs.map((e) => (
                        <Image src={BASE_IMG_URL + e}></Image>
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
            ) : product.detail !== undefined ? (
              <span
                className="products-content"
                dangerouslySetInnerHTML={{
                  __html: product.detail,
                }}
              ></span>
            ) : (
              "该商品未添加详情"
            )}
          </Space>
        </List.Item>
      </List>
    </Card>
  );
};
export default ProductsDetail;
