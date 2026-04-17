import AdminSidebarLayout    from '@/components/layout/AdminSidebarLayout';
import ProtectSidebarRouter  from '@/routes/ProtectSidebarRouter';
import SolicitudesPage       from '@/pages/admin/SolicitudesPage';
import { SidebarProvider }   from '@/context/SidebarContext';
import AdminReviewsPage from '../pages/admin/ReviewsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';
import AdminGalleryPage from '../pages/admin/AdminGalleryPage';
import CreateProjectPage from '../pages/admin/CreateProjectPage';
import AdminBlogPage from '../pages/admin/AdminBlogPage';
import BlogFormPage from '../pages/admin/BlogFormPage';
import EmailsPage       from '../pages/admin/EmailsPage';


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
