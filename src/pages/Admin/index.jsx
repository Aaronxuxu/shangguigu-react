import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../redux/actions/loginState";
import { message, Modal, Skeleton, Layout } from "antd";
import AdminHeader from "../../components/Admin-Header";
import LeftNav from "../../components/Left-Nav";
import AdminContent from "../../components/Admin-Content";

// import { ExclamationCircleOutlined } from "@ant-design/icons";

// const { confirm } = Modal;

const Admin = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  // const handleRemove = () => {
  //   confirm({
  //     title: "确定退出登录吗?",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "",
  //     onOk() {
  //       props.removeCookie();
  //       setTimeout(function () {
  //         navigate("/login");
  //       }, 1000);
  //     },
  //     onCancel() {},
  //   });
  // };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      message.error("当前未登录，一秒后返回登陆页面");
      return navigate("/login");
    }
  }, []);

  return Object.keys(user).length < 1 ? (
    <Skeleton />
  ) : (
    <Layout style={{ height: 100 + "%" }}>
      <LeftNav></LeftNav>
      <Layout>
        <AdminHeader />
        <AdminContent />
      </Layout>
    </Layout>
  );
};

export default connect((state) => ({ user: state.loginState }), {
  removeCookie,
})(Admin);
