import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";

import "./index.less";
import { Link, useLocation } from "react-router-dom";
import menuItems from "../../config/menuConfig";
import { connect } from "react-redux";
import { setHeader } from "../../redux/actions/headerTitle";
import deepMenu from "../../config/deepMenu";

const { Sider } = Layout;

const LeftNav = (props) => {
  // 设置state
  const [openKeys, setOpenKeys] = useState([]);
  const [selectKeys, setSelectKeys] = useState("");
  const [items, setItems] = useState([]);
  const location = useLocation();

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
    //  获取选中与展开的菜单栏
    const itemsList = getMenuNodes(menuItems);
    setItems(itemsList);
  }, []);

  useEffect(() => {
    const deepItem = deepMenu(menuItems);
    const selectKeys = deepItem.find((e) => location.pathname.includes(e.key));
    const openKeys = getOpenkey(location.pathname, menuItems);
    setOpenKeys(openKeys);
    setSelectKeys(location.pathname === "/" ? "/home" : selectKeys.key);
  }, [location.pathname]);

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
export default connect(() => ({}), {
  setHeader,
})(LeftNav);
