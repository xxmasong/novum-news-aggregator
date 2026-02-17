'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthContextProvider";
import { AuthUser } from "@/types/user";

export default function useAuth() {
  const router = useRouter();
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  const [auth, setAuth] = context;

  const setAuthUser = (user: AuthUser) => {
    if (setAuth && auth) {
      setAuth({ 
        ...auth,
        user: user, 
      });
    }
  };

  const setAuthorized = () => {
    if (setAuth) {
      setAuth({ 
        user: null, 
        isAuthorized: true, 
        validating: true,
      });
      window.location.href = "/";
    }
  };

  const setUnauthorized = () => {
    localStorage.clear();
    if (setAuth) {
      setAuth({ 
        user: null, 
        isAuthorized: false, 
        validating: true,
      });
      window.location.href = "/";
    }
  };

  return {
    user: auth?.user,
    isAuthorized: auth?.isAuthorized,
    validating: auth?.validating,
    setAuthUser,
    setAuthorized,
    setUnauthorized,
  };
}
