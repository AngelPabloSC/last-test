import { Navigate, useLocation } from 'react-router-dom';
import { helpPermsion } from '@/helpers/helpPermsion';
import { storageService } from '@/services/storageService';

// ─── ProtectSidebarRouter ─────────────────────────────────────────────────────
// Guard de rol para el área privada con sidebar.
// 1. Si no hay usuario → redirige a /login.
// 2. Si el pathname actual no está entre las rutas del rol → redirige
//    a la primera ruta permitida del rol (evita accesos cruzados entre roles).
const ProtectSidebarRouter = ({ children }) => {
  const { filterRouter } = helpPermsion();
  const { pathname } = useLocation();

  const { rol } = storageService.getUser() ?? {};

  // Sin sesión → login
  if (!rol) {
    return <Navigate to="/login" replace />;
  }

  const { routes } = filterRouter(rol);

  // Ruta no permitida para este rol → primera ruta del rol
  if (!routes.includes(pathname)) {
    return <Navigate to={routes[0]} replace />;
  }

  return <>{children}</>;
};

export default ProtectSidebarRouter;
