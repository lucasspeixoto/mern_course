import { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");

  const login = useCallback((id) => {
    setIsLogged(true);
    setUserId(id);
  }, []);

  const logout = useCallback((id) => {
    setIsLogged(false);
    setUserId(id);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
