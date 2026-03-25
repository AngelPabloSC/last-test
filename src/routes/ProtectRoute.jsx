import { Navigate } from 'react-router-dom';
import { storageService } from '@/services/storageService';

// ─── ProtectRoute ─────────────────────────────────────────────────────────────
// Guard básico: si no hay access_token redirige al login.
// Se usa como wrapper de cualquier ruta privada que no necesite validación de rol.
const ProtectRoute = ({ children }) => {
  const token = storageService.getToken();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectRoute;
