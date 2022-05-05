import { message } from "antd";
import { login } from "../../api/users";
import { setCookies, removeCookies } from "../../utils/cookieUtils";
import { LOGIN, LOGOUT } from "../constant";
// 设置cookies
export const setCookie = (obj) => {
  return async (dispatch) => {
    const { status, data, msg } = await login(obj);
    if (status === 1) {
      return message.warn("登录失败：" + msg);
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
      message.success("登录成功");
    }
  };
};
// 清除cookies
export const removeCookie = () => {
  removeCookies();
  message.success("退出成功，并在一秒后返回登陆页面");
  return { type: LOGOUT, data: {} };
};
