import { useCallback } from "react";
import { useAppDispatch } from "../../shared/redux";
import { authActions } from "./authSlice";
import { useLogoutMutation } from "./api";

export function useLogout() {
  const dispatch = useAppDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logout = useCallback(async () => {
    console.log("Starting logout...");
    try {
      console.log("Calling logout mutation...");
      const result = await logoutMutation().unwrap();
      console.log("Logout successful:", result);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      console.log("Clearing auth state...");
      dispatch(authActions.logout());
    }
  }, [dispatch, logoutMutation]);

  return { logout, isLoading };
}
