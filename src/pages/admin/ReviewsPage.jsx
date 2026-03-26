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
import EditOutlinedIcon              from '@mui/icons-material/EditOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GlobalTable          from '@/components/common/GlobalTable';
import MetricCard           from '@/pages/admin/components/MetricCard';
import StatusBadge          from '@/pages/admin/components/StatusBadge';
import ReviewDetailDialog  from '@/pages/admin/components/ReviewDetailDialog';
import ConfirmActionDialog  from '@/pages/admin/components/ConfirmActionDialog';
import ReviewStatusDialog   from '@/pages/admin/components/ReviewStatusDialog';
import { useReviewDialogs } from '@/pages/admin/hooks/useReviewDialogs';
import { useReviews }       from '@/pages/admin/hooks/useReviews';
import { useReviewActions } from '@/pages/admin/hooks/useReviewActions';


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

  const { updateReviewStatus, getReviewHistory } = useReviewActions();

  const rows = reviewsData.data || [];
  const summary = reviewsData.summary || [];
  const { count, currentPage, perPage } = tableState;

  const {
    detailReview,
    openDetail,
    closeDetail,
    confirmDialog,
    openConfirm,
    closeConfirm,
    handleConfirmAction,
    statusDialog,
    openStatusDialog,
    closeStatusDialog,
  } = useReviewDialogs({ 
    onPublish: async (id, message) => {
      const success = await updateReviewStatus(id, 'Published', message);
      if (success) refreshReviews();
    }, 
    onReject: async (id, message) => {
      const success = await updateReviewStatus(id, 'Rejected', message);
      if (success) refreshReviews();
    }
  });

  const onConfirmStatusUpdate = async (newStatus, message) => {
    const success = await updateReviewStatus(statusDialog.review.id, newStatus, message);
    if (success) {
      refreshReviews();
      closeStatusDialog();
    }
  };

  // ── Stats from API ──
  const getStat = (status) => summary.find((s) => s.status.toLowerCase() === status.toLowerCase())?.count || 0;
  
  const pendingCount = getStat('New'); // API sends "New" for arrivals requiring attention
  const publishedCount = getStat('Published');
  const rejectedCount = getStat('Rejected');
  const totalCount = summary.reduce((acc, curr) => acc + curr.count, 0);
  const avgRating = reviewsData.averageRating ? Number(reviewsData.averageRating).toFixed(1) : '0.0';

  const tabCount = (key) => {
    if (key === 'all') return totalCount;
    if (key === 'pending') return pendingCount;
    return getStat(key);
  };

  const tableOptions = {
    serverSide: true,
    count: count,
    page: currentPage,
    rowsPerPage: perPage,
    rowsPerPageOptions: [10, 20, 50],
    onTableChange: (action, tableState) => {
      const { page, rowsPerPage } = tableState;
      const apiPage = page + 1;
      if (action === "changePage" || action === "changeRowsPerPage") {
        fetchReviews(apiPage, rowsPerPage, page);
      }
    },
  };

  const columns = [
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
          const displayDate = row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
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
          return row ? <StatusBadge status={row.status} /> : '...';
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
              <Tooltip title="View Details">
                <IconButton
                  onClick={() => openDetail(row)}
                  size="small"
                  sx={{ color: '#888', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Update Status">
                <IconButton
                  onClick={() => openStatusDialog(row)}
                  size="small"
                  sx={{ color: '#888', '&:hover': { color: '#FFD700', bgcolor: 'rgba(255,215,0,0.08)' } }}
                >
                  <EditOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>
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
              border: '1px solid #1F1F1F',
              bgcolor: '#0A0A0A',
              cursor: 'pointer',
              color: '#888',
              transition: 'color 0.15s',
              '&:hover': { color: 'white', bgcolor: '#111' },
              position: 'relative'
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
            {pendingCount > 0 && (
              <Box sx={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.5 }}>
                <Typography sx={{ color: 'black', fontSize: 9, fontWeight: 900 }}>{pendingCount}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* ─── Metric cards ─── */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ flexShrink: 0 }}>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Pending"
            value={pendingCount}
            Icon={ReportProblemOutlinedIcon}
            change="Requires attention"
            changeColor="#FFD700"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Published"
            value={publishedCount}
            Icon={ThumbUpOutlinedIcon}
            change="Visible to public"
            changeColor="#4ADE80"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
            label="Rejected"
            value={rejectedCount}
            Icon={CancelOutlinedIcon}
            change="Not published"
            changeColor="#F87171"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <MetricCard
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
        <GlobalTable
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

      <ReviewDetailDialog
        review={detailReview}
        onClose={closeDetail}
        onPublish={(r) => openConfirm('publish', r)}
        onReject={(r) => openConfirm('reject', r)}
        getHistory={getReviewHistory}
      />

      <ConfirmActionDialog
        isOpen={confirmDialog.open}
        variant={confirmDialog.variant}
        review={confirmDialog.review}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirm}
      />

      <ReviewStatusDialog
        open={statusDialog.open}
        onClose={closeStatusDialog}
        data={statusDialog.review}
        onConfirm={onConfirmStatusUpdate}
      />
    </Box>
  );
}
