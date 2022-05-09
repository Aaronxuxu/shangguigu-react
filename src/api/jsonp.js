import { message } from "antd";
import jsonp from "jsonp";
export const reqWeather = (url, obj) => {
  const str = Object.keys(obj).reduce((a, c, i, arr) => {
    if (i === arr.length - 1) {
      a = a + `${c}=${obj[c]}`;
    } else {
      a = a + `${c}=${obj[c]}&`;
    }
    return a;
  }, "");
  return new Promise((resolve, rejcet) => {
    jsonp(`${url}?${str}`, {}, function (err, data) {
      if (!err && data.status) {
        resolve(data.lives[0]);
      } else {
        message.error("api接口请求出错：" + err);
      }
    });
  });
};
