import { CloseCircleOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { login } from "../../api/users";
import { setCookies, removeCookies } from "../../utils/cookieUtils";
import { LOGIN, LOGOUT } from "../constant";
// 设置cookies
export const setCookie = (obj) => {
  return async (dispatch) => {
    const { status, data, msg } = await login(obj);
    if (status === 1) {
      return notification["error"]({
        message: msg,
        icon: <CloseCircleOutlined />,
      });
    } else {
      const newObj = {
        _id: data._id,
        username: data.username,
        role: data.role,
      };
      setCookies(newObj);
      dispatch({
        type: LOGIN,
        data: newObj,
      });
      notification["success"]({
        message: "登录成功",
        duration: 1.5,
      });
    }
  };
};
// 清除cookies
export const removeCookie = () => {
  removeCookies();
  notification["success"]({
    message: "退出成功，并在一秒后返回登陆页面",
    duration: 1.5,
  });
  return { type: LOGOUT, data: {} };
};
