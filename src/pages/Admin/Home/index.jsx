// 首页路由

import React from "react";
import MyEmpty from "../../../components/Empty.js";

const Home = (props) => {
  const { items } = props;
  return items ? <div className="admin-Home"></div> : <MyEmpty></MyEmpty>;
};
export default Home;
