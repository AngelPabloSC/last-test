import { lazy } from 'react';
import Layout from '@/components/layout/Layout';
import GuestRoute from '@/routes/GuestRoute';

const Landing          = lazy(() => import('@/pages/Landing'));
const ServicePage      = lazy(() => import('@/pages/ServicePage'));
const AboutPage        = lazy(() => import('@/pages/AboutPage'));
const ContactPage      = lazy(() => import('@/pages/ContactPage'));
const ReviewsPage      = lazy(() => import('@/pages/ReviewsPage'));
const LeaveReviewPage  = lazy(() => import('@/pages/LeaveReviewPage'));
const TermsPrivacyPage = lazy(() => import('@/pages/TermsPrivacyPage'));
const AdminLogin       = lazy(() => import('@/pages/AdminLogin'));
const GalleryPage      = lazy(() => import('@/pages/GalleryPage'));
const GalleryDetailPage = lazy(() => import('@/pages/GalleryDetailPage'));
const BlogPage         = lazy(() => import('@/pages/BlogPage'));
const BlogDetailPage   = lazy(() => import('@/pages/BlogDetailPage'));
const NotFoundPage     = lazy(() => import('@/pages/NotFoundPage'));
import {
  ROOFING,
  ASPHALT_SHINGLE,
  METAL_ROOFING,
  COMMERCIAL_ROOFING,
  ROOF_INSTALLATION,
  INSURANCE_CLAIMS,
  ROOFING_REPAIR,
  HAIL_DAMAGE,
  ROOF_INSPECTION,
  STORM_DAMAGE,
  SIDING,
  VINYL_SIDING,
  FIBER_CEMENT_SIDING,
  SIDING_REPLACEMENT,
  GUTTERS,
  GUTTER_GUARDS,
  GUTTER_CAP,
  GUTTER_COVERS,
  GUTTER_PROTECTION,
  LEAF_FILTERS,
  LEAF_GUARDS,
  GUTTER_REPAIRS,
  GUTTER_REPLACEMENT,
} from '@/data/servicesData';

export const publicRoutes = [
  // ── Admin (standalone, no Layout) ─────────────────────────────────────────
  // GuestRoute: si ya hay sesión activa redirige al panel (evita volver al login)
  { path: '/login', element: <GuestRoute><AdminLogin /></GuestRoute> },

  {
    path: '/',
    element: <Layout />,
    children: [
      // Home
      { index: true, element: <Landing /> },

  
      { path: 'Roofing',                   element: <ServicePage data={ROOFING}            category="Roofing" /> },
      { path: 'Roofing/Roof-installation', element: <ServicePage data={ROOF_INSTALLATION}  category="Roofing" /> },
      { path: 'Roofing/Asphalt-Single',    element: <ServicePage data={ASPHALT_SHINGLE}    category="Roofing" /> },
      { path: 'Roofing/Insurance-Claims',  element: <ServicePage data={INSURANCE_CLAIMS}   category="Roofing" /> },
      { path: 'Roofing/Metal-Roofing',     element: <ServicePage data={METAL_ROOFING}      category="Roofing" /> },
      { path: 'Roofing/Commercial',        element: <ServicePage data={COMMERCIAL_ROOFING} category="Roofing" /> },


      { path: 'Roofing-Repair',                   element: <ServicePage data={ROOFING_REPAIR}  category="Roofing Repair" /> },
      { path: 'Roofing-Repair/Roof-Inspection',   element: <ServicePage data={ROOF_INSPECTION} category="Roofing Repair" /> },
      { path: 'Roofing-Repair/Storm-Damage',      element: <ServicePage data={STORM_DAMAGE}    category="Roofing Repair" /> },
      { path: 'Roofing-Repair/Hail-Damage',       element: <ServicePage data={HAIL_DAMAGE}     category="Roofing Repair" /> },

      
      { path: 'Siding',                      element: <ServicePage data={SIDING}               category="Siding" /> },
      { path: 'Siding/Vinyl-Siding',         element: <ServicePage data={VINYL_SIDING}          category="Siding" /> },
      { path: 'Siding/Siding-Replacement',   element: <ServicePage data={SIDING_REPLACEMENT}    category="Siding" /> },
      { path: 'Siding/fiber-Cement-Siding',  element: <ServicePage data={FIBER_CEMENT_SIDING}   category="Siding" /> },

    
      { path: 'Gutters',                                   element: <ServicePage data={GUTTERS}           category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards',                     element: <ServicePage data={GUTTER_GUARDS}     category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards/Gutter-Protection',   element: <ServicePage data={GUTTER_PROTECTION} category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards/Leaf-Filters',        element: <ServicePage data={LEAF_FILTERS}      category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards/Leaf-Guards',         element: <ServicePage data={LEAF_GUARDS}       category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards/Gutter-Covers',       element: <ServicePage data={GUTTER_COVERS}     category="Gutters" /> },
      { path: 'Gutters/Gutter-Guards/Gutter-Cap',          element: <ServicePage data={GUTTER_CAP}        category="Gutters" /> },
      { path: 'Gutters/Gutter-Replacement',                element: <ServicePage data={GUTTER_REPLACEMENT} category="Gutters" /> },
      { path: 'Gutters/Gutter-Repairs',                    element: <ServicePage data={GUTTER_REPAIRS}    category="Gutters" /> },
      { path: 'Gallery',                                   element: <GalleryPage /> },
      { path: 'Gallery/:id',                               element: <GalleryDetailPage /> },

      { path: 'About', element: <AboutPage /> },
      { path: 'About/Contact-us', element: <ContactPage /> },

 
      { path: 'Reviews', element: <ReviewsPage /> },
      { path: 'Leave-Review', element: <LeaveReviewPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogDetailPage /> },
      { path: 'privacy-policy', element: <TermsPrivacyPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
