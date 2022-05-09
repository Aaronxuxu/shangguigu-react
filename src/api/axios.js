import ajax from "./ajax";
const POST = "POST";
const GET = "GET";
//  读取用户账号密码登录
export const login = (obj) => ajax("/api/login", obj, POST);

// 分类获取
export const getCategory = (obj) => ajax("/api/manage/category/list", obj, GET);

// 添加分类
export const addCategory = (obj) => ajax("/api/manage/category/add", obj, POST);
