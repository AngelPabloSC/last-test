import { Navigate } from 'react-router-dom';
import { useLoginContext } from '@/context/LoginContext';
import { helpPermsion } from '@/helpers/helpPermsion';

// ─── GuestRoute ───────────────────────────────────────────────────────────────
// Guard inverso: si el usuario YA está autenticado lo redirige a su primera
// ruta permitida. Evita que un admin logueado vuelva a ver el /login.
// Usa LoginContext como fuente de verdad (reactivo a cambios de estado).
const GuestRoute = ({ children }) => {
  const { isLoggedIn, user } = useLoginContext();

  if (isLoggedIn) {
    const { filterRouter } = helpPermsion();
    const { routes } = filterRouter(user?.rol);
    return <Navigate to={routes[0] ?? '/admin/solicitudes'} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
