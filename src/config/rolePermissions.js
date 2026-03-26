
const ADMINISTRADOR = {
  menuItems: [
    { id: 'solicitudes',   name: 'Requests',  route: '/admin/requests',  icon: 'mdi:inbox',         badge: 8    },
    { id: 'reviews',       name: 'Reviews',   route: '/admin/reviews',   icon: 'mdi:star-outline',  badge: null },
    { id: 'gallery',       name: 'Gallery',   route: '/admin/gallery',   icon: 'mdi:image-multiple', badge: null },
    { id: 'clientes',      name: 'Customers', route: '/admin/customers', icon: 'mdi:account-group', badge: null },
    { id: 'configuracion', name: 'Settings',  route: '/admin/settings',  icon: 'mdi:cog-outline',   badge: null },
  ],
  routes: [
    '/admin/requests',
    '/admin/reviews',
    '/admin/gallery',
    '/admin/gallery/new',
    '/admin/gallery/edit/:id',
    '/admin/profile',
    '/admin/customers',
    '/admin/settings',
  ],
};


export const ROLE_PERMISSIONS = {
  ADMINISTRADOR,

};


export const EMPTY_PERMISSIONS = { menuItems: [], routes: [] };
