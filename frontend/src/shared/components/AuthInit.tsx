import { useAuthInit } from "../useAuthInit";

export const AuthInit = ({ children }: { children: React.ReactNode }) => {
  const isReady = useAuthInit();

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
