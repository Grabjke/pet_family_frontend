import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../modules/auth/authSlice";
import { useRefreshMutation } from "../modules/refresh/api";

export const useAuthInit = () => {
  const [isReady, setIsReady] = useState(false);
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refresh().unwrap();

        if (data.result) {
          dispatch(
            authActions.tokenReceived({
              accessToken: data.result.accessToken,
              userId: data.result.userId,
              roles: data.result.roles,
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
