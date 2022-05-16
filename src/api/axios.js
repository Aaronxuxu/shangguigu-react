import ajax from "./ajax";
const POST = "POST";
const GET = "GET";
//  读取用户账号密码登录
export const login = (obj) => ajax("/api/login", obj, POST);

// 获取一级或某个二级分类列表
export const getCategory = (id) =>
  ajax(
    "/api/manage/category/list",
    {
      parentId: id,
    },
    GET
  );

// 根据分类ID获取分类
export const getCategoryID = (id) =>
  ajax("/api/manage/category/info", { categoryId: id }, GET);

// 添加分类
export const addCategory = (obj) => ajax("/api/manage/category/add", obj, POST);

// 更新分类名称
export const updateCateName = (obj) =>
  ajax("/api/manage/category/update", obj, POST);

// 获取商品
export const getProducts = (pageNum, pageSize) =>
  ajax("/api/manage/product/list", { pageNum, pageSize }, GET);

// 修改商品上下架状态
export const updateStatus = (productId, status) =>
  ajax(
    "/api/manage/product/updateStatus",
    {
      productId,
      status,
    },
    POST
  );

// 根据ID/Name搜索产品分页列表
export const searchforNameDesc = (obj) =>
  ajax("/api/manage/product/search", obj, GET);
