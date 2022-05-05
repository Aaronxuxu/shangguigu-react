import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../redux/actions/loginState";
import { Button, message, Modal, Skeleton } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

const Admin = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const handleRemove = () => {
    confirm({
      title: "确定退出登录吗?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        props.removeCookie();
        setTimeout(function () {
          navigate("/login");
        }, 1000);
      },
      onCancel() {},
    });
  };
  useEffect(() => {
    if (Object.keys(user).length < 1) {
      message.error("当前未登录，一秒后返回登陆页面");
      return navigate("/login");
    }
  }, []);
  return Object.keys(user).length < 1 ? (
    <Skeleton />
  ) : (
    <div>
      <h1>你好,{user.username}</h1>
      <Button onClick={handleRemove}>退出登录</Button>
    </div>
  );
};
export default connect((state) => ({ user: state.loginState }), {
  removeCookie,
})(Admin);
