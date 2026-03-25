import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { helpPermsion } from '@/helpers/helpPermsion';
import { storageService } from '@/services/storageService';

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

  // ── login ──────────────────────────────────────────────────────────────────
  // data.user = { rol, accessToken, id }
  const login = (data) => {
    const { user: { rol, accessToken, id } } = data;

    const newUser = { rol, accessToken, id };

    storageService.setUser(newUser);
    storageService.setToken(accessToken);
    storageService.setIdUser(id);

    setUser(newUser);
    setToken(accessToken);

    // Redirige a la primera ruta permitida del rol
    const { routes } = filterRouter(rol);
    navigate(routes[0] ?? '/');
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
