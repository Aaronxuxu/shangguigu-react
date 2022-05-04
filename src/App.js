import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route index element={<Admin />}></Route>
    </Routes>
  );
}

export default App;
