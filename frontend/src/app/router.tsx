import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/RootLayout";
import { MainPage } from "../pages/Main/MainPage";
import { Login } from "../pages/Login/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
    ],
    errorElement: <div>Страница не найдена</div>,
  },
]);
