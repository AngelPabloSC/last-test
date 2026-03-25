// ─── helpPermsion.js ─────────────────────────────────────────────────────────
// Lógica de resolución de permisos por rol.
// OCP: este archivo nunca cambia al agregar nuevos roles.
//      Los datos viven en src/config/rolePermissions.js.

import { storageService } from '@/services/storageService';
import { ROLE_PERMISSIONS, EMPTY_PERMISSIONS } from '@/config/rolePermissions';

export const helpPermsion = () => {
  const filterRouter = (customRol) => {
    const rol = customRol || storageService.getUser()?.rol;
    if (!rol) return EMPTY_PERMISSIONS;
    return ROLE_PERMISSIONS[rol] ?? EMPTY_PERMISSIONS;
  };

  return { filterRouter };
};
