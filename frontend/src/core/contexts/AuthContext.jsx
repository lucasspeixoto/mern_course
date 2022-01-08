import { useState, useCallback, createContext, useEffect } from "react";

let logoutTimer;

export const AuthContext = createContext({
  isLogged: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState("");

  const login = useCallback((id, token, expirationDate) => {
    setToken(token);
    setUserId(id);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback((id) => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(id);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!token,
        token: token,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
