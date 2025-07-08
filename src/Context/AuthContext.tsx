import { setProgress } from "@/Container/reducer/slicers/ProgressSlicer";
import {
  selectCurrentUser,
  setUser,
  clearUser,
} from "@/Container/reducer/slicers/userSlicer";
import authServices from "@/Services/authService";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      await new authServices().logout();
      console.log("logout");
      dispatch(clearUser());
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(clearUser());
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const verifyToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const auth: any = await new authServices().verifyToken();
      console.log(auth);
      if (auth?.user) {
        console.log(auth.user);
        dispatch(setUser(auth.user));
        dispatch(setProgress(auth?.progress ?? []));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      console.error("Token verification failed:", error);

      // Optional: check if token is actually invalid
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await logout(); // Only logout on token expiry or unauth
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, logout]);

  const refreshAuthState = useCallback(async () => {
    try {
      await verifyToken();
    } catch (err) {
      console.log(err);
    }
  }, [verifyToken]);

  useEffect(() => {
    let isMounted = true;
    verifyToken().finally(() => {
      if (!isMounted) return;
    });
    return () => {
      isMounted = false;
    };
  }, [verifyToken]);

  useEffect(() => {
    console.log("Auth context updated:", { user, isAuthenticated, isLoading });
  }, [user, isAuthenticated, isLoading]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      logout,
      verifyToken,
      refreshAuthState,
    }),
    [user, isAuthenticated, isLoading, logout, verifyToken, refreshAuthState]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
