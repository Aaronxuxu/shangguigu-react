import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
// 设置全局表单空填提示信息
const validateMessages = {
  required: "该该栏位必填字段",
  whitespace: "该栏位不能为空字符",
  string: {
    max: "该栏位最大长度为${max}",
    min: "该栏位最小长度为${min}",
  },
  pattern: {
    mismatch: "该栏位必须是英文，数字或下划线组成",
  },
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} form={{ validateMessages }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
