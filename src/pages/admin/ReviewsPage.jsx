import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Rating,
  InputBase,
  Grid,
} from '@mui/material';
import SearchOutlinedIcon            from '@mui/icons-material/SearchOutlined';
import ReportProblemOutlinedIcon     from '@mui/icons-material/ReportProblemOutlined';
import ThumbUpOutlinedIcon           from '@mui/icons-material/ThumbUpOutlined';
import CancelOutlinedIcon            from '@mui/icons-material/CancelOutlined';
import BarChartOutlinedIcon          from '@mui/icons-material/BarChartOutlined';
import VisibilityOutlinedIcon        from '@mui/icons-material/VisibilityOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GlobalTable          from '@/components/common/GlobalTable';
import MetricCard           from '@/pages/admin/components/MetricCard';
import StatusBadge          from '@/pages/admin/components/StatusBadge';
import ReviewDetailDialog  from '@/pages/admin/components/ReviewDetailDialog';
import ConfirmActionDialog  from '@/pages/admin/components/ConfirmActionDialog';
import { useReviewDialogs } from '@/pages/admin/hooks/useReviewDialogs';


const INITIAL_REVIEWS = [
  {
    id: 1,
    client: 'María García',
    email: 'maria.garcia@email.com',
    source: 'Google',
    avatar: 'MG',
    service: 'Roofing',
    review: 'Excelente trabajo en mi techo. Muy profesionales y cumplen los plazos. Totalmente recomendables.',
    rating: 5,
    status: 'pendiente',
    date: '12 Dic 2024',
  },
  {
    id: 2,
    client: 'John Smith',
    email: 'john.smith@email.com',
    source: 'Google',
    avatar: 'JS',
    service: 'Roof Repair',
    review: 'Gran servicio de reparación de techo. Rápidos, limpios y el precio fue muy justo por el trabajo.',
    rating: 5,
    status: 'publicada',
    date: '10 Dic 2024',
  },
  {
    id: 3,
    client: 'Roberto López',
    email: 'roberto.lopez@email.com',
    source: 'Google',
    avatar: 'RL',
    service: 'Gutters',
    review: 'Buen trabajo en los canalones, aunque tardaron un poco más de lo esperado. El resultado final fue bueno.',
    rating: 4,
    status: 'publicada',
    date: '8 Dic 2024',
  },
  {
    id: 4,
    client: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    source: 'Google',
    avatar: 'SJ',
    service: 'Siding',
    review: 'Instalación de siding perfecta. Transformaron completamente el exterior de mi casa. Increíble.',
    rating: 5,
    status: 'publicada',
    date: '6 Dic 2024',
  },
  {
    id: 5,
    client: 'David Chen',
    email: 'david.chen@email.com',
    source: 'Google',
    avatar: 'DC',
    service: 'Roofing',
    review: 'Realmente feliz con los resultados de Nova Solutions. El equipo fue muy atento durante todo el proceso.',
    rating: 3,
    status: 'rechazada',
    date: '5 Dic 2024',
  },
  {
    id: 6,
    client: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    source: 'Google',
    avatar: 'AM',
    service: 'Insulation',
    review: 'No me gustó el servicio de aislamiento. Tuvieron que volver tres veces para dejarlo correcto. Muy frustrante.',
    rating: 2,
    status: 'rechazada',
    date: '4 Dic 2024',
  },
  {
    id: 7,
    client: 'Carlos Rosa',
    email: 'carlos.rosa@email.com',
    source: 'Google',
    avatar: 'CR',
    service: 'Roof Repair',
    review: 'Muy buena calidad en la reparación. Detectaron problemas que otra empresa había pasado por alto.',
    rating: 4,
    status: 'pendiente',
    date: '3 Dic 2024',
  },
  {
    id: 8,
    client: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    source: 'Google',
    avatar: 'LT',
    service: 'Gutters',
    review: 'Cálida atención al cliente, instalación perfecta de canalones. Se nota que son profesionales.',
    rating: 4,
    status: 'publicada',
    date: '2 Dic 2024',
  },
  {
    id: 9,
    client: 'Michael Brown',
    email: 'michael.brown@email.com',
    source: 'Google',
    avatar: 'MB',
    service: 'Siding',
    review: 'Excelente comunicación en todo momento y el trabajo quedó perfecto. 100% lo recomiendo.',
    rating: 5,
    status: 'pendiente',
    date: '1 Dic 2024',
  },
];


const FILTER_TABS = [
  { key: 'todas', label: 'Todas' },
  { key: 'pendiente', label: 'Pendientes' },
  { key: 'publicada', label: 'Publicadas' },
  { key: 'rechazada', label: 'Rechazadas' },
  { key: '5estrellas', label: '5 Estrellas' },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('todas');
  const [search, setSearch] = useState('');

  const publishReview = (id) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'publicada' } : r)));

  const rejectReview = (id) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rechazada' } : r)));

  const deleteReview = (id) =>
    setReviews((prev) => prev.filter((r) => r.id !== id));

  const {
    detailReview,
    openDetail,
    closeDetail,
    confirmDialog,
    openConfirm,
    closeConfirm,
    handleConfirmAction,
  } = useReviewDialogs({ onPublish: publishReview, onReject: rejectReview, onDelete: deleteReview });

  // ── Derived stats ──
  const total = reviews.length;
  const pendientes = reviews.filter((r) => r.status === 'pendiente').length;
  const publicadas = reviews.filter((r) => r.status === 'publicada').length;
  const rechazadas = reviews.filter((r) => r.status === 'rechazada').length;
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / (total || 1)).toFixed(1);

  // ── Filtering ──
  const filtered = reviews.filter((r) => {
    const matchSearch =
      !search ||
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.review.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      activeFilter === 'todas' ||
      (activeFilter === '5estrellas' ? r.rating === 5 : r.status === activeFilter);

    return matchSearch && matchFilter;
  });

  const tabCount = (key) => {
    if (key === 'todas') return reviews.length;
    if (key === '5estrellas') return reviews.filter((r) => r.rating === 5).length;
    return reviews.filter((r) => r.status === key).length;
  };

  const columns = [
    {
      name: 'client',
      label: 'Cliente',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = filtered[dataIndex];
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 160 }}>
              <Box sx={{ minWidth: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,215,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#FFD700', fontSize: 13, fontWeight: 700 }}>{row.avatar}</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{row.client}</Typography>
                <Typography sx={{ color: '#888', fontSize: 11 }}>{row.source} · {row.service}</Typography>
              </Box>
            </Box>
          );
        },
      },
    },
    {
      name: 'review',
      label: 'Reseña',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = filtered[dataIndex];
          return (
            <Box sx={{ maxWidth: { xs: 200, md: 320 } }}>
              <Typography noWrap sx={{ color: '#AAAAAA', fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {row.review}
              </Typography>
              <Typography sx={{ color: '#666', fontSize: 11, mt: 0.5 }}>{row.date}</Typography>
            </Box>
          );
        },
      },
    },
    {
      name: 'rating',
      label: 'Rating',
      options: {
        customBodyRenderLite: (dataIndex) => (
          <Rating value={filtered[dataIndex].rating} readOnly size="small" sx={{ color: '#FFD700' }} />
        ),
      },
    },
    {
      name: 'status',
      label: 'Estado',
      options: {
        customBodyRenderLite: (dataIndex) => <StatusBadge status={filtered[dataIndex].status} />,
      },
    },
    {
      name: 'actions',
      label: 'Acciones',
      options: {
        empty: true,
        sort: false,
        searchable: false,
        customBodyRenderLite: (dataIndex) => {
          const row = filtered[dataIndex];
          return (
            <Tooltip title="Ver / Modificar">
              <IconButton
                onClick={() => openDetail(row)}
                size="small"
                sx={{ color: '#888', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          );
        },
      }
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2.5, md: 3.5 },
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, md: 4 },
        flexGrow: 1,
        minHeight: '100%',
        bgcolor: '#0A0A0A',
      }}
    >
 
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 800 }}>Gestión de Reviews</Typography>
          <Typography sx={{ color: '#888', fontSize: 13, mt: 0.5 }}>Administra y modera las reseñas de tus clientes.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          {/* Search */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flex: { xs: 1, md: 'none' },
              borderRadius: '8px',
              border: '1px solid #2A2A2A',
              bgcolor: '#111111',
              px: 1.5,
              py: 1,
              '&:focus-within': { borderColor: 'primary.main' },
              transition: 'border-color 0.2s',
            }}
          >
            <SearchOutlinedIcon sx={{ fontSize: 16, color: '#555', flexShrink: 0 }} />
            <InputBase
              placeholder="Buscar o filtrar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                fontSize: 13,
                color: 'white',
                width: { xs: '100%', md: 160 },
                '& input::placeholder': { color: '#555', opacity: 1 },
              }}
            />
          </Box>
          {/* Bell */}
          <Box
            component="button"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '8px',
              border: '1px solid #2A2A2A',
              background: 'none',
              cursor: 'pointer',
              color: '#888',
              transition: 'color 0.15s',
              '&:hover': { color: 'white' },
              position: 'relative'
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
            {pendientes > 0 && (
              <Box sx={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.5 }}>
                <Typography sx={{ color: 'black', fontSize: 9, fontWeight: 900 }}>{pendientes}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* ─── Metric cards ─── */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ flexShrink: 0 }}>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Pendientes"
            value={pendientes}
            Icon={ReportProblemOutlinedIcon}
            change="Requieren atención"
            changeColor="#FFD700"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Publicadas"
            value={publicadas}
            Icon={ThumbUpOutlinedIcon}
            change="Visibles al público"
            changeColor="#4ADE80"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Rechazadas"
            value={rechazadas}
            Icon={CancelOutlinedIcon}
            change="No publicadas"
            changeColor="#F87171"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Rating Promedio"
            value={avgRating}
            Icon={BarChartOutlinedIcon}
            change={`Sobre ${total} reseñas`}
            changeColor="#FFD700"
          />
        </Grid>
      </Grid>

      {/* ─── Filter Tabs (Scrollable on Mobile) ─── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5 },
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
          overflowX: { xs: 'auto', sm: 'visible' },
          pb: { xs: 1, sm: 0 },
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          flexShrink: 0,
        }}
      >
        {FILTER_TABS.map(({ key, label }) => {
          const active = activeFilter === key;
          return (
            <Box
              key={key}
              component="button"
              onClick={() => setActiveFilter(key)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                borderRadius: 9999,
                px: { xs: 1.5, sm: 2.25 },
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: 11, sm: 13 },
                whiteSpace: 'nowrap',
                fontWeight: active ? 700 : 500,
                border: active ? 'none' : '1px solid #444',
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? 'primary.contrastText' : '#AAAAAA',
                cursor: 'pointer',
                transition: 'all 0.15s',
                '&:hover': { borderColor: '#666' },
              }}
            >
              {label}
              <Typography
                component="span"
                sx={{ fontSize: { xs: 10, sm: 11 }, fontWeight: 700, color: active ? 'primary.contrastText' : '#888' }}
              >
                {tabCount(key)}
              </Typography>
            </Box>
          );
        })}
      </Box>

      
      <Box sx={{ width: '100%', flex: 1 }}>
        <GlobalTable
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                Todas las Reviews
              </Typography>
              <Box sx={{ borderRadius: 9999, bgcolor: 'rgba(255,215,0,0.12)', px: 1.25, py: 0.5 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main' }}>
                  {filtered.length} Registros
                </Typography>
              </Box>
            </Box>
          }
            data={filtered}
            columns={columns}
          />
        </Box>

      <ReviewDetailDialog
        review={detailReview}
        onClose={closeDetail}
        onPublish={(review) => openConfirm('publish', review)}
        onReject={(review) => openConfirm('reject', review)}
        onDelete={(review) => openConfirm('delete', review)}
      />

      <ConfirmActionDialog
        isOpen={confirmDialog.open}
        variant={confirmDialog.variant}
        review={confirmDialog.review}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirm}
      />
    </Box>
  );
}
