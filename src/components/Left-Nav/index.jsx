import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";

import "./index.less";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../../config/menuConfig";
const { Sider } = Layout;

// 遍历生成items导航栏
// const itemsList = menuItems.reduce((a, c) => {
//   let fnobj;
//   if (c.children) {
//     fnobj = getItem(
//       c.title,
//       c.key,
//       c.icon,
//       c.children.map((e) =>
//         getItem(<Link to={e.key}>{e.title}</Link>, e.key, e.icon)
//       )
//     );
//   } else {
//     fnobj = getItem(<Link to={c.key}>{c.title}</Link>, c.key, c.icon);
//   }
//   return [...a, fnobj];
// }, []);
function getMenuNodes(menuItems) {
  return menuItems.map((e) => {
    if (e.children) {
      return {
        label: e.title,
        icon: e.icon,
        key: e.key,
        children: getMenuNodes(e.children),
      };
    } else {
      return {
        label: <Link to={e.key}>{e.title}</Link>,
        icon: e.icon,
        key: e.key,
      };
    }
  });
}

const LeftNav = () => {
  const [items, setItems] = useState([]);
  // const [openKeys, setOpenkey] = useState(["/products"]);
  const location = useLocation();
  const openKeys = [];
  // 遍历路由链接，生成左侧导航栏
  const getMenuNodes = (menuItems) => {
    const { pathname } = location;
    return menuItems.map((e) => {
      if (e.children) {
        const resultKey = e.children.find((el) => el.key === pathname);
        if (resultKey) {
          openKeys.push(e.key);
          console.log(resultKey, e.key, openKeys);
        }
        return {
          label: e.title,
          icon: e.icon,
          key: e.key,
          children: getMenuNodes(e.children),
        };
      } else {
        return {
          label: <Link to={e.key}>{e.title}</Link>,
          icon: e.icon,
          key: e.key,
        };
      }
    });
  };

  useEffect(() => {
    const itemsList = getMenuNodes(menuItems);
    setItems(itemsList);
  }, []);
  return (
    <Sider className="admin-leftNav">
      <div className="admin-leftNav-header">Mall</div>
      <div className="admin-leftNav-nav">
        <Menu
          theme="dark"
          style={{
            width: 100 + "%",
            backgroundColor: "#304156",
            color: "#fff",
          }}
          mode="inline"
          items={items}
          selectedKeys={location.pathname}
          defaultOpenKeys={openKeys}
        />
      </div>
    </Sider>
  );
};
export default LeftNav;
