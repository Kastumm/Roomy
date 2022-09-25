import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import IUserData from "../interfaces/IUserData";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<IUserData | null>(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      const userData: IUserData = jwtDecode(accessToken);
      setAuth(userData);
    } else {
      setAuth(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;