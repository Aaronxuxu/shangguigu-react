// 商品路由
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getProducts,
  updateStatus,
  searchforNameDesc,
} from "../../../../api/axios";
import {
  Card,
  Button,
  Form,
  Select,
  Input,
  Space,
  notification,
  Table,
  Popconfirm,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

// 搜索框组件
const SearchBtn = (props) => {
  const handleSearch = async (values) => {
    const { searchPoint, searchValue } = values;
    const { pageSize, setProItems, setSearchArr } = props;
    const obj = {
      [searchPoint]: searchValue,
      pageSize,
      pageNum: 1,
    };
    const { data, status, msg } = await searchforNameDesc(obj);
    if (status !== 0) {
      return notification["error"]({
        message: msg,
      });
    }
    setSearchArr({ [searchPoint]: searchValue, isSearch: true });
    setProItems(data);
  };

  return (
    <Form
      layout="inline"
      initialValues={{
        searchPoint: "productName",
      }}
      onFinish={handleSearch}
    >
      <Form.Item name="searchPoint">
        <Select>
          <Option value="productName">按商品名称搜索</Option>
          <Option value="productDesc">按商品描述搜索</Option>
        </Select>
      </Form.Item>
      <Form.Item name="searchValue">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
};

const Products = () => {
  const navigate = useNavigate();
  // 表格
  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      width: "10%",
    },
    {
      title: "商品描述",
      dataIndex: "desc",
      key: "desc",
      responsive: ["md"],
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      width: "5%",
      responsive: ["md"],
      render: (text) => `￥${text}`,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "5%",
      render: (text, record) => (
        <Space direction="vertical" align="center">
          <Popconfirm
            title={`确定要${text === 1 ? "下架" : "上架"}吗`}
            onConfirm={() =>
              handleUpdateStatue(record._id, record.status === 1 ? 0 : 1)
            }
          >
            <Button type="primary">{text === 1 ? "下架" : "上架"}</Button>
          </Popconfirm>
          <span> {text === 1 ? "在售" : "已下架"}</span>
        </Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <Space size="middle" direction="vertical" align="center">
          <Link to="detail/" state={{ id: record._id }}>
            详情
          </Link>
          <Link to="addupdate/" state={{ id: record._id }}>
            修改
          </Link>
        </Space>
      ),
    },
  ];

  // 设置State
  const [proItems, setProItems] = useState({
    pageNum: 1,
    pageSize: 3,
    total: 0,
    list: [],
  });

  // 是否搜索
  const [searchArr, setSearchArr] = useState({ isSearch: false });
  // 加载中
  const [isLoading, setIsLoading] = useState(true);
  // 获取商品列表
  const getProduct = async (pageNum, pageSize) => {
    let result;
    const { isSearch } = searchArr;
    setIsLoading(true);
    if (isSearch) {
      result = await searchforNameDesc({ ...searchArr, pageSize, pageNum });
    } else {
      result = await getProducts(pageNum, pageSize);
    }
    const { data, status } = result;
    setIsLoading(false);
    if (status !== 0) {
      return notification["error"]({
        message: "暂时无法查找到商品数据",
      });
    }
    setProItems(data);
  };

  // 页码/页数发生变化时
  const handlePageChange = (value) => {
    const { current, pageSize } = value;
    return getProduct(current, pageSize);
  };

  // 添加/修改按钮
  const handleAddEdit = () => {
    return navigate("/product/addupdate/");
  };

  // 修改商品上架状态
  const handleUpdateStatue = async (id, uStatus) => {
    const { status, msg } = await updateStatus(id, uStatus);
    if (status !== 0) {
      notification["error"]({
        message: msg,
      });
    } else {
      notification["success"]({
        message: "更新状态成功。",
      });
    }
    return getProduct(proItems.pageNum, proItems.pageSize);
  };

  //  模拟生命周期
  useEffect(() => {
    getProduct(proItems.pageNum, proItems.pageSize);
  }, []);

  return (
    <Card
      bordered={false}
      title={
        <SearchBtn
          pageSize={proItems.pageSize}
          setProItems={setProItems}
          setSearchArr={setSearchArr}
        ></SearchBtn>
      }
      extra={
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddEdit}
        >
          添加商品
        </Button>
      }
    >
      <Table
        loading={isLoading}
        bordered
        columns={columns}
        dataSource={proItems.list}
        rowKey="_id"
        pagination={{
          position: ["bottomCenter"],
          total: proItems.total,
          pageSize: proItems.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [3, 5, 7, 9],
          showQuickJumper: true,
          current: proItems.pageNum,
        }}
        onChange={handlePageChange}
      />
    </Card>
  );
};
export default Products;
