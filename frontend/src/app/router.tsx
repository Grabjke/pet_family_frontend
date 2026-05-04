import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../shared/components/RootLayout";
import { MainPage } from "../pages/Main/MainPage";
import { Login } from "../pages/Login/LoginPage";
import { ProtectedRoute } from "../shared/ProtectedRoute";
import RegistrationMenu from "../pages/Registration/RegistrationMenu";
import { PetDetailPage } from "../pages/PetDetail/PetDetailPage";
import { HelpPage } from "../pages/Help/HelpPage";
import { VolunteersPage } from "../pages/Volunteers/VolunteersPage";
import { VolunteerDetailPage } from "../pages/Volunteers/VolunteerDetailPage";
import { FavoritesPage } from "../pages/Favorites/FavoritesPage";
import { CreatePetPage } from "../pages/CreatePet/CreatePetPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";

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
          <ProtectedRoute roles={["admin", "participant", "volunteer"]}>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "pets/:petId",
        element: (
          <ProtectedRoute roles={["admin", "participant", "volunteer"]}>
            <PetDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "volunteers",
        element: <VolunteersPage />,
      },
      {
        path: "volunteers/:volunteerId",
        element: <VolunteerDetailPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "create-pet",
        element: (
          <ProtectedRoute roles={["volunteer"]}>
            <CreatePetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute roles={["admin", "participant", "volunteer"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <div>Страница не найдена</div>,
  },
]);
