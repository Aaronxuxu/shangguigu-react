import React, { useState, useEffect } from "react";
import { Layout, Menu, message } from "antd";

import "./index.less";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menuItems from "../../config/menuConfig";
import { connect } from "react-redux";
import { setHeader } from "../../redux/actions/headerTitle";
import deepMenu from "../../config/deepMenu";

const { Sider } = Layout;

function getRoleNav(role, nav) {
  const data = nav
    .map((e) => {
      if (role.some((el) => el === e.key)) {
        return e;
      } else {
        if (e.children && e.children.length > 0) {
          const result = getRoleNav(role, e.children).filter((i) => i);
          if (result.length > 0) {
            return { ...e, children: result };
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })
    .filter((e) => e);
  return data;
}

const LeftNav = (props) => {
  const {
    loginState: {
      username,
      role: { menus },
    },
  } = props;
  // 设置state

  // 展开导航栏
  const [openKeys, setOpenKeys] = useState([]);
  // 选中导航栏
  const [selectKeys, setSelectKeys] = useState("");
  // 导航栏列表
  const [items, setItems] = useState([]);

  // 路由跳转
  const navigate = useNavigate();
  // 路径
  const location = useLocation();
  const { pathname } = location;

  // 遍历路由链接，生成左侧导航栏
  const getMenuNodes = (menuItems) => {
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
          label: (
            <Link to={e.key} state={e.state && { ...e.state }}>
              {e.title}
            </Link>
          ),
          icon: e.icon,
          key: e.key,
        };
      }
    });
  };

  // 获取路由的展开菜单（如有展开列表的情况下）
  const getOpenkey = (url, items) => {
    items = items.filter((e) => e.children);
    for (let i = 0; i < items.length; i++) {
      if (items[i].children.find((e) => url.includes(e.key))) {
        return [items[i].key];
      }
    }
    return [];
  };

  // 更换展开的菜单栏
  const openChange = (keys) => {
    setOpenKeys(keys);
  };

  const onSelect = (target) => {
    const { keyPath, domEvent } = target;
    props.setHeader(domEvent.target.innerText);
    return keyPath.length > 1 ? setOpenKeys(keyPath.slice(1)) : setOpenKeys([]);
  };

  useEffect(() => {
    let items;
    if (username !== "admin") {
      items = getRoleNav(menus, menuItems);
    } else {
      items = menuItems;
    }
    const itemLists = getMenuNodes(items);
    setItems(itemLists);
  }, []);

  useEffect(() => {
    const deepItem = deepMenu(menuItems);
    const selectKeys = deepItem.find((e) => pathname.includes(e.key));
    const openKeys = getOpenkey(pathname, menuItems);
    setOpenKeys(openKeys);
    setSelectKeys(pathname === "/" ? "/home" : selectKeys.key);
  }, [pathname]);
  useEffect(() => {
    if (username !== "admin" && pathname !== "/") {
      const isRolePage = menus.some((e) => pathname.includes(e));
      if (!isRolePage) {
        message.error("当前用户角色并无此页面权限，一秒后返回首页。");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    }
  }, [pathname]);
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
          selectedKeys={selectKeys}
          openKeys={openKeys}
          onOpenChange={openChange}
          onSelect={onSelect}
        />
      </div>
    </Sider>
  );
};
export default connect(
  (state) => ({
    loginState: state.loginState,
  }),
  {
    setHeader,
  }
)(LeftNav);
