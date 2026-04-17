import { Navigate, useLocation, matchPath } from 'react-router-dom';
import { helpPermsion } from '@/helpers/helpPermsion';
import { storageService } from '@/services/storageService';

// ─── ProtectSidebarRouter ─────────────────────────────────────────────────────
// Guard de rol para el área privada con sidebar.
// 1. Si no hay usuario → redirige a /login.
// 2. Si el pathname actual no coincide con ninguna ruta permitida → redirige
//    a la primera ruta permitida del rol.
const ProtectSidebarRouter = ({ children }) => {
  const { filterRouter } = helpPermsion();
  const { pathname } = useLocation();

  const { rol } = storageService.getUser() ?? {};

  // Sin sesión → login
  if (!rol) {
    return <Navigate to="/login" replace />;
  }

  const { routes } = filterRouter(rol);

  // Verificar si el pathname actual coincide con alguna de las rutas (soporta parámetros :id)
  const isAllowed = routes.some(routePattern => {
    // 1. Coincidencia exacta
    if (routePattern === pathname) return true;
    
    // 2. Coincidencia con parámetros (ej: :id)
    if (routePattern.includes(':')) {
      const patternSegments = routePattern.split('/').filter(Boolean);
      const pathSegments = pathname.split('/').filter(Boolean);
      
      if (patternSegments.length === pathSegments.length) {
        return patternSegments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
      }
    }
    return false;
  });

  if (!isAllowed) {
    return <Navigate to={routes[0]} replace />;
  }

  return <>{children}</>;
};

export default ProtectSidebarRouter;
