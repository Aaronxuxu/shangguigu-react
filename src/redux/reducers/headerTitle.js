import { SETTITLE } from "../constant";
import deepMenu from "../../config/deepMenu";
import menu from "../../config/menuConfig";
// 暂时性写法，返回的是数组深度遍历flot的结果

const { pathname } = window.location;
const result = deepMenu(menu);
let init;
if (pathname === "/login") {
  init = "后台管理系统";
} else if (pathname === "/") {
  init = "首页";
} else {
  init = result.find((e) => pathname.includes(e.key)).title;
}
const headerTitle = (prev = init, action) => {
  const { type, data } = action;
  switch (type) {
    case SETTITLE:
      return data;
    default:
      return prev;
  }
};
export default headerTitle;
