import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpPermsion } from '@/helpers/helpPermsion';
import { storageService } from '@/services/storageService';
import { useSnackbar } from '@/context/SnackbarContext';

// ─── Context ──────────────────────────────────────────────────────────────────
const LoginContext = createContext();

export const useLoginContext = () => {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error('useLoginContext must be used inside <LoginProvider>');
  return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const { filterRouter } = helpPermsion();
  const { showSnackbar } = useSnackbar();

  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(null);

  // Rehydrate from storage on mount
  useEffect(() => {
    const storedUser  = storageService.getUser();
    const storedToken = storageService.getToken();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // ── Remote session expiry listener ─────────────────────────────────────────
  // useRef lets the handler always read the latest user value without needing
  // to re-register the event listener on every render.
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  useEffect(() => {
    const handleSessionExpired = (e) => {
      // Only act if the user is currently logged in
      if (!userRef.current) return;

      const serverMsg = e.detail?.message || 'Tu sesión fue cerrada remotamente.';

      storageService.clearSession();
      setUser(null);
      setToken(null);
      showSnackbar(serverMsg, 'warning');
      navigate('/login');
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => window.removeEventListener('sessionExpired', handleSessionExpired);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── login ──────────────────────────────────────────────────────────────────
  // API response: { accessToken, sessionToken, user: { id, username, email, ... } }
  const login = (data, shouldNavigate = true) => {
    const { accessToken, sessionToken, user } = data;
    const rol = user?.rol ?? 'ADMINISTRADOR';

    // Store the full user object along with the role and accessToken
    const newUser = { 
      ...user, 
      rol, 
      accessToken 
    };

    storageService.setUser(newUser);
    storageService.setToken(accessToken);
    if (user?.id) storageService.setIdUser(user.id);
    if (sessionToken) storageService.setSessionToken(sessionToken);

    setUser(newUser);
    setToken(accessToken);

    if (shouldNavigate) {
      const { routes } = filterRouter(rol);
      navigate(routes[0] ?? '/');
    }
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    storageService.clearSession();
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const value = useMemo(() => ({
    user,
    isLoggedIn: !!user && !!token,
    login,
    logout,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user, token]);

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
};
