import React, { useState, useMemo, useCallback } from 'react';
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
import AdminDataTable from '@/components/tables/AdminDataTable';
import AdminMetricStatCard from '@/components/cards/AdminMetricStatCard';
import AdminStatusBadge from '@/components/ui/AdminStatusBadge';
import { useNotifications } from '@/context/NotificationContext';
import { useReviews } from '@/pages/admin/hooks/useReviews';
import AdminNotificationBell from '@/components/layout/AdminNotificationBell';


const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'published', label: 'Published' },
  { key: 'rejected', label: 'Rejected' },
  { key: '5_stars', label: '5 Stars' },
];

export default function AdminReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { reviewsData, tableState, fetchReviews, refreshReviews } = useReviews({ 
    status: activeFilter, 
    search 
  });

  const { openReviewDetail } = useNotifications();

  const rows = reviewsData.data || [];
  const summary = reviewsData.summary || [];
  const { count, currentPage, perPage } = tableState;

  const { pendingCount, publishedCount, rejectedCount, totalCount, avgRating } = useMemo(() => {
    const getStat = (status) => summary.find((s) => s.status.toLowerCase() === status.toLowerCase())?.count || 0;
    const total = summary.reduce((acc, curr) => acc + curr.count, 0);
    return {
      pendingCount: getStat('New'),
      publishedCount: getStat('Published'),
      rejectedCount: getStat('Rejected'),
      totalCount: total,
      avgRating: reviewsData.averageRating ? Number(reviewsData.averageRating).toFixed(1) : '0.0',
    };
  }, [summary, reviewsData.averageRating]);

  const tabCount = useCallback((key) => {
    if (key === 'all') return totalCount;
    if (key === 'pending') return pendingCount;
    const s = summary.find((x) => x.status.toLowerCase() === key.toLowerCase());
    return s?.count || 0;
  }, [totalCount, pendingCount, summary]);

  const tableOptions = useMemo(() => ({
    serverSide: true,
    count,
    page: currentPage,
    rowsPerPage: perPage,
    rowsPerPageOptions: [10, 20, 50],
    onTableChange: (action, ts) => {
      const apiPage = ts.page + 1;
      if (action === 'changePage' || action === 'changeRowsPerPage') {
        fetchReviews(apiPage, ts.rowsPerPage, ts.page);
      }
    },
  }), [count, currentPage, perPage, fetchReviews]);


  const columns = useMemo(() => [
    {
      name: 'client',
      label: 'Customer',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
          const name = row.fullName || row.client || row.name || 'Unnamed';
          const avatarLetter = name.charAt(0).toUpperCase();
          const serviceName = row.serviceType?.name || row.service || 'N/A';
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 160 }}>
              <Box sx={{ minWidth: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,215,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: '#FFD700', fontSize: 13, fontWeight: 700 }}>{avatarLetter}</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{name}</Typography>
                <Typography sx={{ color: '#888', fontSize: 11 }}>{row.source || 'Google'} · {serviceName}</Typography>
              </Box>
            </Box>
          );
        },
      },
    },
    {
      name: 'review',
      label: 'Review',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return '...';
          const displayDate = row.createdAt
            ? new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'N/A';
          return (
            <Box sx={{ maxWidth: { xs: 200, md: 320 } }}>
              <Typography noWrap sx={{ color: '#AAAAAA', fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {row.review}
              </Typography>
              <Typography sx={{ color: '#666', fontSize: 11, mt: 0.5 }}>{displayDate}</Typography>
            </Box>
          );
        },
      },
    },
    {
      name: 'rating',
      label: 'Rating',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          return row ? <Rating value={Number(row.rating) || 0} readOnly size="small" sx={{ color: '#FFD700' }} /> : '...';
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          return row ? <AdminStatusBadge status={row.status} /> : '...';
        },
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        empty: true,
        sort: false,
        searchable: false,
        customBodyRenderLite: (dataIndex) => {
          const row = rows[dataIndex];
          if (!row) return null;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="View or Moderate">
                <IconButton
                  onClick={() => openReviewDetail(row)}
                  size="small"
                  sx={{ color: '#888', '&:hover': { color: '#FFD700', bgcolor: 'rgba(255,215,0,0.08)' } }}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ], [rows, openReviewDetail]);


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
        bgcolor: '#000000',
      }}
    >
 
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 800 }}>Reviews Management</Typography>
          <Typography sx={{ color: '#888', fontSize: 13, mt: 0.5 }}>Manage and moderate your customer reviews.</Typography>
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
              border: '1px solid #1F1F1F',
              bgcolor: '#0A0A0A',
              px: 1.5,
              py: 1,
              '&:focus-within': { borderColor: 'primary.main' },
              transition: 'border-color 0.2s',
            }}
          >
            <SearchOutlinedIcon sx={{ fontSize: 16, color: '#555', flexShrink: 0 }} />
            <InputBase
              placeholder="Search or filter..."
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
          <AdminNotificationBell />
        </Box>
      </Box>

      {/* ─── Metric cards ─── */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ flexShrink: 0 }}>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Pending"
            value={pendingCount}
            Icon={ReportProblemOutlinedIcon}
            change="Requires attention"
            changeColor="#FFD700"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Published"
            value={publishedCount}
            Icon={ThumbUpOutlinedIcon}
            change="Visible to public"
            changeColor="#4ADE80"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Rejected"
            value={rejectedCount}
            Icon={CancelOutlinedIcon}
            change="Not published"
            changeColor="#F87171"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Average Rating"
            value={avgRating}
            Icon={BarChartOutlinedIcon}
            change={`Across ${totalCount} reviews`}
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
        <AdminDataTable
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                All Reviews
              </Typography>
              <Box sx={{ borderRadius: 9999, bgcolor: 'rgba(255,215,0,0.12)', px: 1.25, py: 0.5 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main' }}>
                  {count} Records
                </Typography>
              </Box>
            </Box>
          }
            loading={reviewsData.loading}
            data={rows}
            columns={columns}
            options={tableOptions}
          />
        </Box>
    </Box>
  );
}
