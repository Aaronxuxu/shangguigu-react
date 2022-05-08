import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../redux/actions/loginState";
import { message, Skeleton, Layout } from "antd";
import AdminHeader from "../../components/Admin-Header";
import LeftNav from "../../components/Left-Nav";
import AdminContent from "../../components/Admin-Content";

const Admin = (props) => {
  const { user } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      message.error("当前未登录，一秒后返回登陆页面");
      navigate("/login", { replace: true });
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
