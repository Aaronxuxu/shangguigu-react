import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Card,
  Input,
  InputNumber,
  Cascader,
  notification,
  Button,
  message,
} from "antd";
import ReturnRoute from "../../../../components/Return-Route";

import {
  getCategory,
  upadteProduct,
  addProduct,
  searchOneProduct,
  deleteImg,
} from "../../../../api/axios";
import { useLocation } from "react-router-dom";
import PicUpload from "./Pic-Upload";
import DraftWysiwyg from "./Draft-Wysiwyg";

const { TextArea } = Input;

const ProductsAddUpdate = () => {
  // 获取分类列表
  const [optionCate, setOptionCate] = useState([]);
  // 判断添加或修改
  const [isAdd, setIsAdd] = useState(false);

  // 获取路径传递过来的state
  const location = useLocation();
  // 定义表单form属性
  const [form] = Form.useForm();
  // 跳转路由
  const navigate = useNavigate();
  // 获取子组件图片
  const picArr = useRef();

  // 判断添加/修改，并获取该商品所有数据。
  const getProductDetail = async () => {
    let cateItems = await getCategories(0);
    // 判断修改/添加
    if (location.state) {
      const { setImgs } = picArr.current;
      let cateChil = [];
      const {
        state: { id },
      } = location;
      const { status, data, msg } = await searchOneProduct(id);
      if (status === 1) {
        notification["error"]({
          message: msg + "，一秒后回到上一页",
        });
        return setTimeout(() => {
          return navigate(-1);
        }, 1000);
      }
      const { categoryId, pCategoryId } = data;
      let categoryIds = [];
      if (pCategoryId === "0") {
        categoryIds = [categoryId];
      } else {
        const result = await getCategories(pCategoryId);
        cateChil = result.map((e) => ({ value: e._id, label: e.name }));
        categoryIds = [pCategoryId, categoryId];
      }
      cateItems = cateItems.map((e) => ({
        label: e.name,
        value: e._id,
        isLeaf: false,
        children:
          cateChil.length > 0 && e._id === pCategoryId ? [...cateChil] : null,
      }));
      setOptionCate(cateItems);
      setImgs(data.imgs);
      return form.setFieldsValue({
        ...data,
        categoryIds,
      });
    } else {
      setIsAdd(true);
      return setOptionCate(
        cateItems.map((e) => ({
          label: e.name,
          isLeaf: false,
          value: e._id,
        }))
      );
    }
  };

  // 获取一级/二级分类（添加）
  const getCategories = async (target) => {
    const { data, status, msg } = await getCategory(target);
    if (status === 1) {
      return notification["error"]({
        message: msg,
      });
    }
    return data;
  };

  // 分类加载
  const handleLoad = async (selOptions) => {
    const target = selOptions[selOptions.length - 1];
    target.loading = true;
    const data = await getCategories(target.value);
    if (data.length > 0) {
      target.children = data.map((e) => ({ label: e.name, value: e._id }));
    } else {
      target.isLeaf = true;
    }
    target.loading = false;
    return setOptionCate([...optionCate]);
  };

  // 提交数据
  const handleFinish = async (values) => {
    const { categoryIds } = values;
    const { getImgs, delImgs } = picArr.current;
    values.imgs = getImgs();
    // return;
    if (location.state) {
      values["_id"] = location.state.id;
    }
    values = {
      ...values,
      categoryId: categoryIds[categoryIds.length - 1],
      pCategoryId: categoryIds.length > 1 ? categoryIds[0] : "0",
    };
    let result = null;
    if (isAdd) {
      result = await addProduct(values);
    } else {
      result = await upadteProduct(values);
      const imgArr = delImgs();
      if (imgArr.length > 0) {
        const result = await Promise.all(imgArr.map((e) => deleteImg(e)));
        const status = result.every((e) => e.status === 0);
        if (status) {
          message.success("删除图片成功");
        } else {
          return message.error("删除图片失败");
        }
      }
    }
    const { status, msg } = result;
    if (status !== 0) {
      return notification["error"]({
        message: msg + "，请重新提交",
      });
    }
    notification["success"]({
      message: `${isAdd ? "添加成功" : "修改成功"}，一秒后返回上一页`,
    });
    return setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  // 判断是否添加/修改数据
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Card title={<ReturnRoute title={isAdd ? "添加商品" : "修改商品"} />}>
      <Form
        form={form}
        size="large"
        layout="horizontal"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 6 }}
        onFinish={handleFinish}
      >
        {/* 必须 */}
        <Form.Item label="商品名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="商品描述" name="desc" rules={[{ required: true }]}>
          <TextArea autoSize={{ minRows: 1 }}></TextArea>
        </Form.Item>
        <Form.Item label="商品价格" name="price" rules={[{ required: true }]}>
          <InputNumber addonAfter="元" />
        </Form.Item>
        {/* 必须 */}
        <Form.Item
          label="商品分类"
          name="categoryIds"
          rules={[{ required: true }]}
        >
          <Cascader
            placeholder="请选择"
            loadData={handleLoad}
            options={optionCate}
            changeOnSelect
          ></Cascader>
        </Form.Item>
        <Form.Item label="商品图片" name="imgs" wrapperCol={{ span: 20 }}>
          <PicUpload ref={picArr}></PicUpload>
        </Form.Item>
        <Form.Item label="商品详情" name="detail" wrapperCol={{ span: 20 }}>
          <DraftWysiwyg></DraftWysiwyg>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isAdd ? "添加" : "修改"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ProductsAddUpdate;
