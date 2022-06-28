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

// 添加商品
export const addProduct = (obj) => ajax("/api/manage/product/add", obj, POST);

// 更新商品
export const upadteProduct = (obj) =>
  ajax("/api/manage/product/update", obj, POST);

// 查找指定商品
export const searchOneProduct = (id) =>
  ajax("/api/manage/product/searchOne", { id }, GET);

// 删除图片
export const deleteImg = (img) =>
  ajax("/api/manage/img/delete", { name: img }, POST);

// 获取角色列表
export const getRoles = () => ajax("/api/manage/role/list", {}, GET);

// 获取单一角色
export const getRoleOne = (id) =>
  ajax("/api/manange/role/searchOne", { id }, GET);

// 添加角色
export const addRole = (roleName) =>
  ajax("/api/manage/role/add", { roleName }, POST);

// 更新角色(给角色设置权限)
export const updateRole = (obj) =>
  ajax("/api/manage/role/update", { ...obj }, POST);

// 删除角色
export const deleteRole = (id) => ajax("/api/manage/role/delete", { id }, POST);

// 获取用户
export const getUsers = () => ajax("/api/manage/user/list", {}, GET);
// 获取单一用户
export const getOneUser = (username) =>
  ajax("/api/manage/user/findOne", { username }, GET);
// 添加用户
export const addUser = (userValue) =>
  ajax("/api/manage/user/add", userValue, POST);

// 删除用户
export const delUser = (id) =>
  ajax("/api/manage/user/delete", { userId: id }, POST);

// 修改用户数据
export const updateUser = (value) =>
  ajax("/api/manage/user/update", value, POST);
