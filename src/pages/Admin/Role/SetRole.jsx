import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { Tree, Space, Input } from "antd";
import menuList from "../../../config/menuConfig";

const getMenuChiKeys = (list) => {
  return list.reduce((a, c) => {
    if (c.children && c.children.length > 0) {
      let arr = getMenuChiKeys(c.children);
      if (arr.length > 0) {
        a.push(c.key, ...arr);
      } else {
        a.push(c.key);
      }
    }
    return a;
  }, []);
};

const SetRole = (props, ref) => {
  const { roleTarget } = props;
  const [roleDetail, getRoleDetail] = useState({});

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  useEffect(() => {
    getRoleDetail(roleTarget);
    setCheckedKeys(roleTarget.menus);
  }, [roleTarget]);

  useEffect(() => {
    setExpandedKeys(["", ...getMenuChiKeys(menuList)]);
  }, []);

  useImperativeHandle(ref, () => ({
    changeRole: () => checkedKeys.filter((e) => e),
  }));

  return (
    <>
      <Space direction="vertical" size="large">
        <Space>
          <span>角色名称：</span>
          <Input disabled value={roleDetail && roleDetail.name}></Input>
        </Space>
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={(checkedKeysValue) => setCheckedKeys(checkedKeysValue)}
          checkedKeys={checkedKeys}
          treeData={[{ title: "平台权限", key: "", children: menuList }]}
        />
      </Space>
    </>
  );
};
export default forwardRef(SetRole);
