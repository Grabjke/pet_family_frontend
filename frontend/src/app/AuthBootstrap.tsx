import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "../modules/refresh/api";
// ↑ путь поправь под свой — туда, где лежит refreshApi.ts из твоего вопроса

// Модульный флаг — переживает двойной маунт React StrictMode
let refreshStarted = false;

export const AuthBootstrap = () => {
  const [refresh] = useRefreshMutation({ fixedCacheKey: "auth-refresh" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (refreshStarted) {
      setDone(true);
      return;
    }
    refreshStarted = true;

    refresh()
      .unwrap()
      .catch(() => {
        // Нет валидной сессии — это нормально, просто пойдём на /login
      })
      .finally(() => setDone(true));
  }, [refresh]);

  if (!done) return <div>Loading...</div>; // замени на свой Spinner

  return <Outlet />;
};
