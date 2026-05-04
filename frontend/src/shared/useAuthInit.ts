import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../modules/auth/authSlice";
import { useRefreshMutation } from "../modules/refresh/api";

type RoleWithName = { name: string };

export const useAuthInit = () => {
  const [isReady, setIsReady] = useState(false);
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refresh().unwrap();

        if (data.result) {
          // Преобразуем роли, если они приходят как объекты { name: "role" }
          const roles = data.result.roles.map((role: string | RoleWithName) =>
            typeof role === "string" ? role : role.name
          );

          dispatch(
            authActions.tokenReceived({
              accessToken: data.result.accessToken,
              userId: data.result.userId,
              roles,
            })
          );
        }
      } catch {
        dispatch(authActions.logout());
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, [dispatch, refresh]);

  return { isReady };
};
