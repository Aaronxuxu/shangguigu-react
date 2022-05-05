import { getCookies } from "../../utils/cookieUtils";
import { LOGIN, LOGOUT } from "../constant";
const init = getCookies();

function loginState(prev = init, action) {
  const { type, data } = action;
  switch (type) {
    case LOGIN:
      return data;
    case LOGOUT:
      return data;
    default:
      return prev;
  }
}
export default loginState;
