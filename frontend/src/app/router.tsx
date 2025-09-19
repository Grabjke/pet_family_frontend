import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../shared/components/RootLayout";
import { MainPage } from "../pages/Main/MainPage";
import { Login } from "../pages/Login/LoginPage";
import { ProtectedRoute } from "../shared/ProtectedRoute";
import RegistrationMenu from "../pages/Registration/RegistrationMenu";

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
        path: "registration",
        element: <RegistrationMenu />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute roles={["admin", "participant"]}>
            <MainPage />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <div>Страница не найдена</div>,
  },
]);
