import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import TransactionForm from "../Pages/TransactionForm/TransactionForm";
import TransactionList from "./../Pages/TransactionList/TransactionList";
import ExpenseList from "../Pages/ExpenseList/ExpenseList";
import IncomeList from "../Pages/IncomList/IncomeList";
import UpdateTransaction from "../Pages/UpdateTransaction/UpdateTransaction";

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
      {
        path: "/myapp/statements",
        element: (
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myapp/expenses",
        element: (
          <ProtectedRoute>
            <ExpenseList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myapp/incomes",
        element: (
          <ProtectedRoute>
            <IncomeList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myapp/statements/:id",
        element: <UpdateTransaction />,
      },
    ],
  },
]);
