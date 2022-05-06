import { SETTITLE } from "../constant";
import menu from "../../config/menuConfig";

// 暂时性写法，返回的是数组深度遍历flot的结果
function getTitle(menu) {
  return menu.reduce((a, c) => {
    if (c.children) {
      a.push(...getTitle(c.children));
    } else {
      a.push(c);
    }
    return a;
  }, []);
}
const { pathname } = window.location;
let init;
if (pathname === "/login") {
  init = "后台管理系统";
} else if (pathname === "/") {
  init = "首页";
} else {
  init = getTitle(menu).find((e) => e.key === pathname).title;
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
