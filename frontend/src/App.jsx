import React from "react";
import GlobalStyles from "./styles/GlobalStyles";

import { AppRoutes } from "./core/config/routes";
import { AuthContextProvider } from "./core/contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <GlobalStyles />
      <AppRoutes />
    </AuthContextProvider>
  );
};

export default App;
