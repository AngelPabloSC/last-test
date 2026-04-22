import { lazy } from 'react';
import AdminSidebarLayout   from '@/components/layout/AdminSidebarLayout';
import ProtectSidebarRouter from '@/routes/ProtectSidebarRouter';
import { SidebarProvider }  from '@/context/SidebarContext';

const SolicitudesPage  = lazy(() => import('@/pages/admin/SolicitudesPage'));
const AdminReviewsPage = lazy(() => import('../pages/admin/ReviewsPage'));
const AdminProfilePage = lazy(() => import('../pages/admin/AdminProfilePage'));
const AdminGalleryPage = lazy(() => import('../pages/admin/AdminGalleryPage'));
const CreateProjectPage = lazy(() => import('../pages/admin/CreateProjectPage'));
const AdminBlogPage    = lazy(() => import('../pages/admin/AdminBlogPage'));
const BlogFormPage     = lazy(() => import('../pages/admin/BlogFormPage'));
const EmailsPage       = lazy(() => import('../pages/admin/EmailsPage'));


const ComingSoon = ({ title }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 12,
    color: '#888',
    fontFamily: "'Inter', sans-serif",
  }}>
    <span style={{ fontSize: 48 }}>🚧</span>
    <p style={{ fontSize: 18, fontWeight: 600, color: '#ccc' }}>{title}</p>
    <p style={{ fontSize: 14 }}>Coming Soon…</p>
  </div>
);


export const adminRoutes = [
  {
    path: 'admin',
    element: (
      <ProtectSidebarRouter>
        <SidebarProvider>
          <AdminSidebarLayout />
        </SidebarProvider>
      </ProtectSidebarRouter>
    ),
    children: [
      { path: 'requests',     element: <SolicitudesPage /> },
      { path: 'reviews',      element: <AdminReviewsPage /> },
      { path: 'gallery',      element: <AdminGalleryPage /> },
      { path: 'gallery/new',  element: <CreateProjectPage /> },
      { path: 'gallery/edit/:id', element: <CreateProjectPage /> },
      { path: 'blog',         element: <AdminBlogPage /> },
      { path: 'blog/new',     element: <BlogFormPage /> },
      { path: 'blog/edit/:id', element: <BlogFormPage /> },
      { path: 'profile',      element: <AdminProfilePage /> },
      { path: 'emails',       element: <EmailsPage /> },
    ],
  },
];
