import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import TransactionForm from "../Pages/TransactionForm/TransactionForm";

// import { RouterProvider } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/myapp",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/myapp/addnew",
        element: (
          <ProtectedRoute>
            <TransactionForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
