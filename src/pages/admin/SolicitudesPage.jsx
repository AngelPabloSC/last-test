import { useState } from 'react';
import { Box, Typography, InputBase, Grid } from '@mui/material';
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

const METRICS = [
  {
    label: 'New Requests',
    value: '18',
    Icon: NoteAddOutlinedIcon,
    change: '+15% vs last week',
    changeColor: '#4ADE80',
    TrendIcon: TrendingUpIcon,
  },
  {
    label: 'In Progress',
    value: '7',
    Icon: HourglassEmptyIcon,
    change: '3 assigned today',
    changeColor: '#60A5FA',
    TrendIcon: TrendingFlatIcon,
  },
  {
    label: 'Completed',
    value: '142',
    Icon: CheckCircleOutlineIcon,
    change: '98% satisfaction',
    changeColor: '#666',
    prefix: '✓',
  },
  {
    label: 'Pending Response',
    value: '5',
    Icon: ErrorOutlineIcon,
    change: '-2 this week',
    changeColor: '#F87171',
    TrendIcon: TrendingDownIcon,
  },
];

const FILTERS = [
  { id: 'todas',       label: 'All',         count: 172 },
  { id: 'nuevas',      label: 'New',         count: 18  },
  { id: 'en_progreso', label: 'In Progress', count: 7   },
  { id: 'completadas', label: 'Completed',   count: 142 },
  { id: 'canceladas',  label: 'Canceled',    count: 5   },
];

export default function SolicitudesPage() {
  const [activeFilter, setActiveFilter] = useState('todas');

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
        fontFamily: "'Inter', sans-serif",
        color: 'white',
      }}
    >
      {/* Page header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2, flexShrink: 0 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: 'white' }}>
            Service Requests
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#777', mt: 0.5 }}>
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
              border: '1px solid #2A2A2A',
              bgcolor: '#111111',
              px: 1.5,
              py: 1,
              '&:focus-within': { borderColor: 'primary.main' },
              transition: 'border-color 0.2s',
            }}
          >
            <SearchIcon sx={{ fontSize: 16, color: '#555', flexShrink: 0 }} />
            <InputBase
              placeholder="Search..."
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
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>
      </Box>

      
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ flexShrink: 0 }}>
        {METRICS.map((m) => (
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
        {FILTERS.map(({ id, label, count }) => {
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
                {count}
              </Typography>
            </Box>
          );
        })}
      </Box>

   
      <RequestsTable />
    </Box>
  );
}
