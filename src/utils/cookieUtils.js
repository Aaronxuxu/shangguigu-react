import cookies from "react-cookies";

// 设置过期时间
let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000); //一天

// cookies相关
export const getCookies = () => cookies.load("user") || {};
export const setCookies = (obj) =>
  cookies.save("user", obj, { expires: inFifteenMinutes });
export const removeCookies = () => {
  cookies.remove("userid");
  return cookies.remove("user");
};
