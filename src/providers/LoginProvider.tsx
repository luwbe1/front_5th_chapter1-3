import React, { useMemo, useState, createContext, useContext } from "react";
import { User } from "../types";
import { useNotificationContext } from "../providers/NotificationProvider";

interface LoginContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};
