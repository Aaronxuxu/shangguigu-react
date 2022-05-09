import React from "react";
import { Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.less";
//  空状态组件
function MyEmpty() {
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(0);
  };
  return (
    <Empty className="myEmpty">
      <Button type="primary" onClick={handleClick}>
        刷新页面
      </Button>
    </Empty>
  );
}
export default MyEmpty;
