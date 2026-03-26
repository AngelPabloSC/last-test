import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, InputBase, Grid, Button, useTheme, Skeleton, IconButton, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { useGallery } from './hooks/useGallery';
import MetricCard from './components/MetricCard';
import GlobalTable from '@/components/common/GlobalTable';
import GalleryDetailDialog from './components/GalleryDetailDialog';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const FILTER_CONFIG = [
  { id: 'all',         label: 'All' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial',  label: 'Commercial' },
  { id: 'industrial',  label: 'Industrial' },
  { id: 'interior',    label: 'Interior Design' },
];

export default function AdminGalleryPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { galleryData, loading, deleteProject } = useGallery({
    status: activeFilter,
    search: searchTerm,
  });

  const { data = [], summary = [] } = galleryData;

  const handleView = (project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const handleEdit = (project) => {
    navigate(`/admin/gallery/edit/${project.id}`);
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      await deleteProject(project.id);
      // refreshGallery(); // In a real app we would call this
    }
  };

  const metrics = [
    {
      label: 'Total Photos',
      value: String(summary.find(s => s.status === 'Total')?.count || 0),
      Icon: PhotoLibraryOutlinedIcon,
      change: '+4 new this month',
      changeColor: '#4ADE80',
      TrendIcon: TrendingUpIcon,
    },
    {
      label: 'Visible on Site',
      value: String(summary.find(s => s.status === 'Visible')?.count || 0),
      Icon: VisibilityOutlinedIcon,
      change: 'Active status',
      changeColor: '#60A5FA',
    },
    {
      label: 'Commercial',
      value: String(summary.find(s => s.status === 'Commercial')?.count || 0),
      Icon: FilterListOutlinedIcon,
      change: 'Main category',
      changeColor: '#FFD700',
    },
  ];

  const columns = [
    {
      name: 'img',
      label: 'Preview',
      options: {
        customBodyRender: (value) => (
          <Box
            component="img"
            src={value}
            sx={{ width: 44, height: 44, borderRadius: '6px', objectFit: 'cover', border: '1px solid #1F1F1F' }}
          />
        )
      }
    },
    {
      name: 'name',
      label: 'Project Name',
      options: {
        customBodyRender: (value) => (
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{value}</Typography>
        )
      }
    },
    {
      name: 'category',
      label: 'Category',
      options: {
        customBodyRender: (value) => (
          <Chip label={value} size="small" sx={{ fontSize: 10, fontWeight: 800, bgcolor: 'rgba(255,215,0,0.1)', color: 'primary.main', borderRadius: '4px' }} />
        )
      }
    },
    {
      name: 'location',
      label: 'Location',
      options: {
        customBodyRender: (value) => (
          <Typography sx={{ fontSize: 12, color: '#888' }}>{value || 'N/A'}</Typography>
        )
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const project = data[dataIndex];
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" onClick={() => handleView(project)} sx={{ color: '#888', '&:hover': { color: 'white' } }}>
                <VisibilityOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleEdit(project)} sx={{ color: '#888', '&:hover': { color: 'primary.main' } }}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(project)} sx={{ color: '#888', '&:hover': { color: 'error.main' } }}>
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        }
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
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: theme.palette.text.primary }}>
            Gallery Management
          </Typography>
          <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary, mt: 0.5 }}>
            Update and manage your public project portfolio.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flex: 1,
              borderRadius: '8px',
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: '#0A0A0A',
              px: 1.5,
              py: 1,
              minWidth: { md: 200 }
            }}
          >
            <SearchIcon sx={{ fontSize: 16, color: theme.palette.text.disabled }} />
            <InputBase
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ fontSize: 13, color: theme.palette.text.primary, width: '100%' }}
            />
          </Box>
          
          <Button
            component={Link}
            to="/admin/gallery/new"
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              px: 2,
              borderRadius: '8px',
              height: 42,
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            Create Project
          </Button>

          <IconButton sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '8px', height: 42, width: 42 }}>
            <NotificationsNoneIcon sx={{ fontSize: 20, color: theme.palette.text.secondary }} />
          </IconButton>
        </Box>
      </Box>

      {/* Metrics */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
        {metrics.map((m) => (
          <Grid size={{ xs: 6, sm: 4, lg: 3 }} key={m.label}>
            <MetricCard {...m} />
          </Grid>
        ))}
      </Grid>

      {/* Filter Tabs */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {FILTER_CONFIG.map(({ id, label }) => {
          const active = id === activeFilter;
          const count = id === 'all' 
            ? summary.find(s => s.status === 'Total')?.count || 0
            : summary.find(s => s.status.toLowerCase().includes(label.toLowerCase()))?.count || 0;

          return (
            <Box
              key={id}
              component="button"
              onClick={() => setActiveFilter(id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 9999,
                px: 2.25,
                py: 1,
                fontSize: 13,
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
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: active ? 'primary.contrastText' : theme.palette.text.disabled }}>
                {count}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Gallery Table */}
      <Box sx={{ position: 'relative', minHeight: 400 }}>
        <GlobalTable
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Project Portfolio</Typography>
              <Box sx={{ bgcolor: 'rgba(255,215,0,0.1)', px: 1.25, py: 0.5, borderRadius: 999 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 800, color: 'primary.main' }}>{data.length} Total</Typography>
              </Box>
            </Box>
          }
          data={data}
          columns={columns}
          loading={loading}
          options={{
            search: false,
            filter: false,
            selectableRows: 'none',
          }}
        />
      </Box>

      <GalleryDetailDialog
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProject}
      />
    </Box>
  );
}
