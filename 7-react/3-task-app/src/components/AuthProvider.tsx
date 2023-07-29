import React, { useState } from 'react';
import IAuthContextProps from './IAuthContextProps';
import IAuthProviderProps from './IAuthProviderProps';

export const AuthContext = React.createContext<IAuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
