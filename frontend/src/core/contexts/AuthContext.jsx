import { useState, useCallback, createContext } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  const login = useCallback(() => {
    setIsLogged(true);
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
