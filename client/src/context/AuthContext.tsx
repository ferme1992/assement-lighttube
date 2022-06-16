import { createContext, ReactNode, useContext, useState, useMemo } from 'react';
import { signIn, signUp } from '../sdk/auth';

interface AuthContextType {
  token?: string;
  loggedIn: boolean;
  storeToken: (email: string, password: string) => void;
  signUpUser: (name: string, email: string, password: string) => void;
  isLoggedIn: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [token, setToken] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  async function storeToken(email: string, password: string) {
    const currentToken = await signIn(email, password);
    if (token) {
      setToken(currentToken);
    }
  }

  async function signUpUser(name: string, email: string, password: string) {
    const currentToken = await signUp(name, email, password);
    if (token) {
      setToken(currentToken);
    }
  }

  function isLoggedIn() {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function logout() {
    setToken(undefined);
    setLoggedIn(false);
  }

  const memoedValue = useMemo(
    () => ({
      token,
      loggedIn,
      storeToken,
      signUpUser,
      isLoggedIn,
      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
