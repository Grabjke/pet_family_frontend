import { useEffect, useState, type ReactNode } from "react";
import { useRefreshMutation } from "../../modules/refresh/api";
// ↑ путь к refreshApi подгони под свой проект

// Модульный флаг — переживает двойной mount React StrictMode
let refreshStarted = false;

type Props = {
  children: ReactNode;
};

export const AuthInit = ({ children }: Props) => {
  const [refresh] = useRefreshMutation({ fixedCacheKey: "auth-refresh" });
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (refreshStarted) {
      setBootstrapped(true);
      return;
    }
    refreshStarted = true;

    refresh()
      .unwrap()
      .catch(() => {
        // нет валидной сессии — норм, ProtectedRoute сам отправит на /login
      })
      .finally(() => setBootstrapped(true));
  }, [refresh]);

  if (!bootstrapped) {
    return <div>Loading...</div>; // замени на свой спиннер
  }

  return <>{children}</>;
};
