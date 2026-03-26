import AdminSidebarLayout    from '@/components/layout/AdminSidebarLayout';
import ProtectSidebarRouter  from '@/routes/ProtectSidebarRouter';
import SolicitudesPage       from '@/pages/admin/SolicitudesPage';
import { SidebarProvider }   from '@/context/SidebarContext';
import AdminReviewsPage from '../pages/admin/ReviewsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';

// ─── Placeholder para rutas futuras ──────────────────────────────────────────
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
      { path: 'profile',      element: <AdminProfilePage /> },
      { path: 'customers',    element: <ComingSoon title="Customers" /> },
      { path: 'settings',     element: <ComingSoon title="Settings" /> },
    ],
  },
];
