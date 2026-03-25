// ─── rolePermissions.js ───────────────────────────────────────────────────────
// OCP: este es el ÚNICO archivo que se modifica al agregar un nuevo rol.
// La lógica de resolución (helpPermsion) nunca cambia.
//
// Estructura de cada rol:
//   menuItems → ítems visibles en el sidebar
//   routes    → rutas a las que tiene acceso (usadas por los guards)
//
// Los íconos son strings de Iconify — no requieren imports.

// ── ADMINISTRADOR ─────────────────────────────────────────────────────────────
const ADMINISTRADOR = {
  menuItems: [
    { id: 'solicitudes',   name: 'Requests',  route: '/admin/requests',  icon: 'mdi:inbox',         badge: 8    },
    { id: 'reviews',       name: 'Reviews',   route: '/admin/reviews',   icon: 'mdi:star-outline',  badge: null },
    { id: 'clientes',      name: 'Customers', route: '/admin/customers', icon: 'mdi:account-group', badge: null },
    { id: 'configuracion', name: 'Settings',  route: '/admin/settings',  icon: 'mdi:cog-outline',   badge: null },
  ],
  routes: [
    '/admin/requests',
    '/admin/reviews',
    '/admin/customers',
    '/admin/settings',
  ],
};

// ── Para agregar un nuevo rol, define su config aquí y agrégala al mapa ───────
// const SUPERADMIN = { menuItems: [...], routes: [...] };
// const CONTADOR   = { menuItems: [...], routes: [...] };

// ── Mapa rol → config ─────────────────────────────────────────────────────────
export const ROLE_PERMISSIONS = {
  ADMINISTRADOR,
  // SUPERADMIN,
  // CONTADOR,
};

// ── Fallback para roles sin configuración ─────────────────────────────────────
export const EMPTY_PERMISSIONS = { menuItems: [], routes: [] };
