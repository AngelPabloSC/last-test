
const ADMINISTRADOR = {
  menuItems: [
    { id: 'solicitudes',   name: 'Requests',  route: '/admin/requests',  icon: 'mdi:inbox',         badge: null    },
    { id: 'reviews',       name: 'Reviews',   route: '/admin/reviews',   icon: 'mdi:star-outline',  badge: null },
    { id: 'gallery',       name: 'Gallery',   route: '/admin/gallery',   icon: 'mdi:image-multiple-outline', badge: null },
    { id: 'blog',          name: 'Blog',      route: '/admin/blog',      icon: 'mdi:post-outline',  badge: null },
    { id: 'correos',       name: 'Emails',    route: '/admin/emails',   icon: 'mdi:email-outline',  badge: null },
  ],
  routes: [
    '/admin/requests',
    '/admin/reviews',
    '/admin/gallery',
    '/admin/gallery/new',
    '/admin/gallery/edit/:id',
    '/admin/blog',
    '/admin/blog/new',
    '/admin/blog/edit/:id',
    '/admin/profile',
    '/admin/emails',
  ],
};


export const ROLE_PERMISSIONS = {
  ADMINISTRADOR,

};


export const EMPTY_PERMISSIONS = { menuItems: [], routes: [] };
