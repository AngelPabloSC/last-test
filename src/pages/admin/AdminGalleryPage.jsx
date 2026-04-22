import React, { useState, useMemo, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Chip, 
  Stack,
  Tooltip,
  Grid
} from '@mui/material';
import Plus          from '@mui/icons-material/Add';
import Eye           from '@mui/icons-material/Visibility';
import Edit          from '@mui/icons-material/Edit';
import ImageIcon     from '@mui/icons-material/Image';
import AssessmentIcon from '@mui/icons-material/AssessmentOutlined';
import CheckIcon     from '@mui/icons-material/CheckCircleOutlined';
import EditIcon      from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useGallery } from './hooks/useGallery';
import AdminDataTable from '@/components/tables/AdminDataTable';
import { useSnackbar } from '@/context/SnackbarContext';
import GalleryDetailDialog from './gallery/components/GalleryDetailDialog';
import { useDialog } from '@/hooks/useDialog';
import AdminMetricStatCard from '@/components/cards/AdminMetricStatCard';

const AdminGalleryPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { galleryData, tableState, refreshGallery } = useGallery();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const detailDialog = useDialog();

  // Memoized derived stats – only recompute when galleryData changes
  const { totalCount, publishedCount, draftCount, categoriesCount } = useMemo(() => {
    const projects = galleryData.data || [];
    const summary = galleryData.summary || [];
    return {
      totalCount: galleryData.loading ? 0 : (summary.length > 0 ? summary.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0) : tableState.count),
      publishedCount: summary.length > 0 ? (summary.find((s) => s.status === 'Visible')?.count || 0) : projects.filter((p) => p.status === 'Visible').length,
      draftCount: summary.length > 0 ? (summary.find((s) => s.status === 'Hidden')?.count || 0) : projects.filter((p) => p.status === 'Hidden').length,
      categoriesCount: new Set(projects.map((p) => p.serviceType?.name).filter(Boolean)).size,
    };
  }, [galleryData, tableState.count]);

  const handleView = useCallback((project) => {
    setSelectedProject(project);
    detailDialog.handleOpenDialog();
  }, [detailDialog]);

  const handleEdit = useCallback((project) => {
    navigate(`/admin/gallery/edit/${project.id}`, { state: { project } });
  }, [navigate]);

  // Memoize columns – render functions are expensive to recreate
  const columns = useMemo(() => [
    {
      name: 'images',
      label: 'Preview',
      options: {
        customBodyRender: (value) => {
          const cover = value?.[0]?.url || value?.[0] || null;
          return (
            <Box 
              sx={{ 
                width: 60, 
                height: 45, 
                borderRadius: '6px', 
                bgcolor: '#141414', 
                border: '1px solid #1F1F1F',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {cover ? (
                <Box component="img" src={cover} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <ImageIcon size={16} color="#333" />
              )}
            </Box>
          );
        }
      }
    },
    {
      name: 'name',
      label: 'Project Name',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>{value || tableMeta.rowData[2]}</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              {tableMeta.rowData[3]?.name || 'No category'}
            </Typography>
          </Box>
        )
      }
    },
    { name: 'title', label: 'Title', options: { display: 'excluded' } },
    { name: 'serviceType', label: 'Category', options: { 
        display: 'excluded',
        customBodyRender: (value) => value?.name || 'Category'
    } },
    {
      name: 'status',
      label: 'Status',
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value === 'Visible' ? 'Published' : 'Draft'}
            size="small"
            sx={{
              bgcolor: value === 'Visible' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 175, 55, 0.1)',
              color: value === 'Visible' ? '#4ADE80' : '#D4AF37',
              fontWeight: 800,
              fontSize: '10px',
              textTransform: 'uppercase',
              borderRadius: '4px'
            }}
          />
        )
      }
    },
    {
      name: 'year',
      label: 'Year',
      options: {
        customBodyRender: (value) => (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{value || '2024'}</Typography>
        )
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (value, tableMeta) => {
          const project = galleryData.data[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="View Project">
                <IconButton size="small" onClick={() => handleView(project)} sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}>
                  <Eye size={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Project">
                <IconButton size="small" onClick={() => handleEdit(project)} sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                  <Edit size={18} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    }
  ], [galleryData.data, handleView, handleEdit]);

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
      {/* Page header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>
            Gallery Projects
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
            Manage your portfolio and project showcase.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => navigate('/admin/gallery/new')}
          sx={{ borderRadius: '8px', px: 3, py: 1.2, fontWeight: 800 }}
        >
          Add New Project
        </Button>
      </Box>

      {/* ─── Metric cards ─── */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ mb: 4, flexShrink: 0 }}>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Total Projects"
            value={totalCount}
            Icon={AssessmentIcon}
            change="All projects in portfolio"
            changeColor="#3B82F6"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Published"
            value={publishedCount}
            Icon={CheckIcon}
            change="Visible on website"
            changeColor="#4ADE80"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Drafts"
            value={draftCount}
            Icon={EditIcon}
            change="Not visible to public"
            changeColor="#FFD700"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Service Types"
            value={categoriesCount}
            Icon={ImageIcon}
            change="Active categories"
            changeColor="#8B5CF6"
          />
        </Grid>
      </Grid>

      <AdminDataTable
        title="Project Portfolio"
        data={galleryData.data}
        columns={columns}
        loading={galleryData.loading}
      />

      <GalleryDetailDialog 
        open={detailDialog.isOpen}
        onClose={detailDialog.handleCloseDialog}
        project={selectedProject}
      />
    </Box>
  );
};

export default AdminGalleryPage;
