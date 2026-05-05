import { Navigate } from 'react-router-dom';
import { storageService } from '@/services/storageService';

// ─── ProtectSidebarRouter ─────────────────────────────────────────────────────
// Guard de autenticación para el área privada con sidebar.
// Solo verifica que haya una sesión activa con rol.
// La redirección al índice por defecto del rol se maneja en adminRoutes.jsx
// mediante un elemento <index> para evitar bucles de re-renderizado.
const ProtectSidebarRouter = ({ children }) => {
  const { rol } = storageService.getUser() ?? {};

  // Sin sesión → login
  if (!rol) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectSidebarRouter;
