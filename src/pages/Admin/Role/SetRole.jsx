import React, { useState, useEffect } from "react";
import { Tree, Form, Input } from "antd";
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
  const [roleForm] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [target, setTarget] = useState({});
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // 深度遍历获取所有父系节点并展开
  useEffect(() => {
    const { setForm } = props;
    setExpandedKeys(["", ...getMenuChiKeys(menuList)]);
    setForm(roleForm);
  }, []);

  useEffect(() => {
    setTarget(roleTarget);
  }, [roleTarget]);

  useEffect(() => {
    roleForm.setFieldsValue(target);
  }, [target.menus]);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    target.menus = checkedKeysValue.filter((e) => e);
    setTarget({ ...target });
  };

  return (
    <Form form={roleForm}>
      <Form.Item label="角色名称" name="name">
        <Input disabled />
      </Form.Item>
      <Form.Item name="menus">
        <Tree
          checkable
          selectable={false}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={target.menus}
          treeData={[
            {
              title: "平台权限",
              key: "",
              children: menuList,
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
export default SetRole;
