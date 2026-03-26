import { useState } from 'react';
import { Box, Typography, InputBase, Grid, useTheme } from '@mui/material';
import NoteAddOutlinedIcon    from '@mui/icons-material/NoteAddOutlined';
import HourglassEmptyIcon     from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon       from '@mui/icons-material/ErrorOutline';
import SearchIcon             from '@mui/icons-material/SearchOutlined';
import NotificationsNoneIcon  from '@mui/icons-material/NotificationsNoneOutlined';
import TrendingUpIcon         from '@mui/icons-material/TrendingUp';
import TrendingDownIcon       from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon       from '@mui/icons-material/TrendingFlat';
import RequestsTable from './components/RequestsTable';
import MetricCard             from './components/MetricCard';

import { useContacts } from './hooks/useContacts';

const METRIC_CONFIG = [
  {
    status: 'New',
    label: 'New Requests',
    Icon: NoteAddOutlinedIcon,
    change: '+15% vs last week',
    changeColor: '#4ADE80',
    TrendIcon: TrendingUpIcon,
  },
  {
    status: 'In Progress',
    label: 'In Progress',
    Icon: HourglassEmptyIcon,
    change: '3 assigned today',
    changeColor: '#60A5FA',
    TrendIcon: TrendingFlatIcon,
  },
  {
    status: 'Completed',
    label: 'Completed',
    Icon: CheckCircleOutlineIcon,
    change: '98% satisfaction',
    changeColor: '#666',
    prefix: '✓',
  },
  {
    status: 'Canceled',
    label: 'Pending Response',
    Icon: ErrorOutlineIcon,
    change: '-2 this week',
    changeColor: '#F87171',
    TrendIcon: TrendingDownIcon,
  },
];

const FILTER_CONFIG = [
  { id: 'all',         apiStatus: null,          label: 'All' },
  { id: 'new',         apiStatus: 'New',         label: 'New' },
  { id: 'in_progress', apiStatus: 'In Progress', label: 'In Progress' },
  { id: 'completed',   apiStatus: 'Completed',   label: 'Completed' },
  { id: 'canceled',    apiStatus: 'Canceled',    label: 'Canceled' },
];

export default function SolicitudesPage() {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { contactsData, tableState, fetchContacts, refreshContacts } = useContacts({ 
    status: activeFilter, 
    search: searchTerm,
  });

  const summary = contactsData.summary || [];
  
  // Mapear métricas dinámicamente
  const metrics = METRIC_CONFIG.map(m => {
    const apiMatch = summary.find(s => s.status === m.status);
    return { ...m, value: apiMatch ? String(apiMatch.count) : '0' };
  });

  // Mapear filtros dinámicamente
  const filters = FILTER_CONFIG.map(f => {
    let count = 0;
    if (f.id === 'all') {
      count = summary.reduce((acc, curr) => acc + curr.count, 0);
    } else {
      const apiMatch = summary.find(s => s.status === f.apiStatus);
      count = apiMatch ? apiMatch.count : 0;
    }
    return { ...f, count };
  });

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
        color: theme.palette.text.primary,
      }}
    >
      {/* Page header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, flexShrink: 0 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: theme.palette.text.primary }}>
            Service Requests
          </Typography>
          <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary, mt: 0.5 }}>
            Manage all customer service requests.
          </Typography>
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
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: '#0A0A0A',
              px: 1.5,
              py: 1,
              '&:focus-within': { borderColor: 'primary.main' },
              transition: 'border-color 0.2s',
            }}
          >
            <SearchIcon sx={{ fontSize: 16, color: theme.palette.text.disabled, flexShrink: 0 }} />
            <InputBase
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                fontSize: 13,
                color: theme.palette.text.primary,
                width: { xs: '100%', md: 160 },
                '& input::placeholder': { color: theme.palette.text.disabled, opacity: 1 },
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
              border: `1px solid ${theme.palette.divider}`,
              background: 'none',
              cursor: 'pointer',
              color: theme.palette.text.secondary,
              transition: 'all 0.15s',
              '&:hover': { 
                color: theme.palette.text.primary,
                bgcolor: 'rgba(255,255,255,0.05)'
              },
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ flexShrink: 0 }}>
        {metrics.map((m) => (
          <Grid size={{ xs: 6, sm: 6, lg: 3 }} key={m.label}>
            <MetricCard {...m} />
          </Grid>
        ))}
      </Grid>
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
        {filters.map(({ id, label, count }) => {
          const active = id === activeFilter;
          return (
            <Box
              key={id}
              component="button"
              onClick={() => setActiveFilter(id)}
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
                border: active ? 'none' : `1px solid ${theme.palette.divider}`,
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? 'primary.contrastText' : theme.palette.text.secondary,
                cursor: 'pointer',
                transition: 'all 0.15s',
                '&:hover': { borderColor: theme.palette.text.disabled },
              }}
            >
              {label}
              <Typography
                component="span"
                sx={{ fontSize: { xs: 10, sm: 11 }, fontWeight: 700, color: active ? 'primary.contrastText' : theme.palette.text.disabled }}
              >
                {count}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <RequestsTable 
        contactsData={contactsData}
        tableState={tableState}
        fetchContacts={fetchContacts}
        refreshContacts={refreshContacts}
        filter={activeFilter}
        search={searchTerm}
      />
    </Box>
  );
}
