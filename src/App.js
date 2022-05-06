import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { connect } from "react-redux";
const items = [
  {
    path: "home/",
    element: lazy(() => import("./pages/Admin/Home")),
  },
  {
    path: "users/",
    element: lazy(() => import("./pages/Admin/Users")),
  },
  {
    path: "category/",
    element: lazy(() => import("./pages/Admin/Category")),
  },
  {
    path: "product/",
    element: lazy(() => import("./pages/Admin/Products")),
  },
  {
    path: "role/",
    element: lazy(() => import("./pages/Admin/Role")),
  },
  {
    path: "charts/bar/",
    element: lazy(() => import("./pages/Admin/Charts/bar")),
  },
  {
    path: "charts/line/",
    element: lazy(() => import("./pages/Admin/Charts/line")),
  },
  {
    path: "charts/pie/",
    element: lazy(() => import("./pages/Admin/Charts/pie")),
  },
];

function App(props) {
  document.title = props.headerTitle;
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Admin />}>
        {items.map((e, i) => (
          <Route
            key={i}
            path={e.path}
            element={
              <Suspense fallback={<div>加载中</div>}>
                <e.element />
              </Suspense>
            }
          ></Route>
        ))}
        <Route path="" element={<Navigate to="/home" />}></Route>
      </Route>
    </Routes>
  );
}

export default connect(
  (state) => ({
    headerTitle: state.headerTitle,
  }),
  {}
)(App);
