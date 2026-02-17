import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { getBearerToken } from "@/services/ApiService";
import { current } from "@/services/AccountService";
import { AuthAttributes } from "@/types/user";

export const AuthContext = createContext<
  [
    AuthAttributes | null,
    Dispatch<SetStateAction<AuthAttributes>> | null,
  ]
>([null, null]);

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthAttributes>({
    user: null, isAuthorized: false, validating: true,
  });

  useEffect(() => {
    if (getBearerToken()) {
      (async () => {
        const userData = await current();
        if (userData) {
          setAuth({ user: userData, isAuthorized: true, validating: false});
        } else {
          setAuth({ user: null, isAuthorized: false, validating: false});
        }
      })();
    } else {      
      setAuth({ user: null, isAuthorized: false, validating: false});
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
