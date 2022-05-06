import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// 引入登录状态redux
import loginState from "./reducers/loginState";
// 引入浏览器标题redux
import headerTitle from "./reducers/headerTitle";

export default createStore(
  combineReducers({
    loginState,
    headerTitle,
  }),
  applyMiddleware(thunk)
);
