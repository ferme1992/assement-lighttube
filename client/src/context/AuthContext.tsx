import { createContext, ReactNode, useContext, useState, useMemo } from 'react';
import { signIn, signUp } from '../sdk/auth';

interface AuthContextType {
  token?: string;
  loggedIn: boolean;
  storeToken: (email: string, password: string) => void;
  signUpUser: (name: string, email: string, password: string) => void;
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
    if (currentToken) {
      setToken(currentToken);
      setLoggedIn(true);
    }
  }

  async function signUpUser(name: string, email: string, password: string) {
    const currentToken = await signUp(name, email, password);
    if (currentToken) {
      setToken(currentToken);
      setLoggedIn(true);
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
