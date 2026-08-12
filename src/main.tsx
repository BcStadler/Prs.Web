import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";
import ErrorPage from "./ErrorPage";
import IndexPage from "./IndexPage";
import Layout from "./Layout";
import SignInPage from "./account/SignInPage";
import ProductCreatePage from "./products/ProductCreatePage";
import ProductEditPage from "./products/ProductEditPage";
import ProductsPage from "./products/ProductsPage";
import RequestsPage from "./requests/RequestsPage";
import RequestDetailPage from "./requests/RequestDetailPage";
import RequestCreatePage from "./requests/RequestCreatePage";
import RequestEditPage from "./requests/RequestEditPage";
import RequestItemCreatePage from "./requestLines/RequestLineCreatePage";
import RequestItemEditPage from "./requestLines/RequestLineEditPage";
import VendorsPage from "./vendors/VendorsPage";
import VendorDetailPage from "./vendors/VendorDetailPage";
import VendorCreatePage from "./vendors/VendorCreatePage";
import VendorEditPage from "./vendors/VendorEditPage";
import UserCreatePage from "./users/UserCreatePage";
import UserEditPage from "./users/UserEditPage";
import UsersPage from "./users/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      {
        element: <Layout />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "products/create", element: <ProductCreatePage /> },
          { path: "products/edit/:id", element: <ProductEditPage /> },
          { path: "requests", element: <RequestsPage /> },
          { path: "requests/create", element: <RequestCreatePage /> },
          { path: "requests/edit/:id", element: <RequestEditPage /> },
          { path: "requests/detail/:id", element: <RequestDetailPage /> },
          {
            path: "requests/detail/:id/requestline/create",
            element: <RequestItemCreatePage />,
          },
          {
            path: "requests/detail/:id/requestline/edit/:lineId",
            element: <RequestItemEditPage />,
          },
          { path: "vendors", element: <VendorsPage /> },
          { path: "vendors/create", element: <VendorCreatePage /> },
          { path: "vendors/edit/:id", element: <VendorEditPage /> },
          { path: "vendors/detail/:id", element: <VendorDetailPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "users/create", element: <UserCreatePage /> },
          { path: "users/edit/:id", element: <UserEditPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
