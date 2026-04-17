import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  Tooltip,
  Avatar,
  Grid
} from '@mui/material';
import {
  Add as Plus,
  Edit,
  Article as FileText,
  Visibility as Eye,
  ArticleOutlined as ArticleIcon,
  CheckCircleOutlined as CheckIcon,
  ModeEditOutlineOutlined as EditOutlineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBlog } from './hooks/useBlog';
import AdminDataTable from '@/components/tables/AdminDataTable';
import AdminMetricStatCard from '@/components/cards/AdminMetricStatCard';
import { useSnackbar } from '@/context/SnackbarContext';
import { useDialog } from '@/hooks/useDialog';
import AdminBlogDetailDialog from '@/components/dialogs/AdminBlogDetailDialog';

const AdminBlogPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { blogData, tableState, refreshBlogs, updateBlogStatus } = useBlog();

  const detailDialog = useDialog();

  // Memoized derived stats – only recompute when blogData changes
  const { totalCount, publishedCount, draftCount, categoriesCount } = useMemo(() => {
    const posts = blogData.data || [];
    const summary = blogData.summary || [];
    return {
      totalCount: blogData.loading ? 0 : (summary.length > 0 ? summary.reduce((acc, curr) => acc + (Number(curr.count) || 0), 0) : tableState.count),
      publishedCount: summary.length > 0 ? (summary.find((s) => s.status === 'Published')?.count || 0) : posts.filter((p) => p.status === 'Published').length,
      draftCount: summary.length > 0 ? (summary.find((s) => s.status === 'Hidden')?.count || 0) : posts.filter((p) => p.status === 'Hidden').length,
      categoriesCount: new Set(posts.map((p) => p.category)).size,
    };
  }, [blogData, tableState.count]);

  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleView = useCallback((blog) => {
    setSelectedBlog(blog);
    detailDialog.handleOpenDialog();
  }, [detailDialog]);

  const handleEdit = useCallback((id) => {
    navigate(`/admin/blog/edit/${id}`);
  }, [navigate]);

  // Memoize columns – render functions are expensive to recreate
  const columns = useMemo(() => [
    {
      name: 'photo',
      label: 'Image',
      options: {
        customBodyRender: (value) => (
          <Avatar 
            src={value} 
            variant="rounded" 
            sx={{ width: 60, height: 40, bgcolor: '#141414', border: '1px solid #1F1F1F' }}
          >
            <FileText size={16} />
          </Avatar>
        )
      }
    },
    {
      name: 'title',
      label: 'Post Details',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>{value}</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              By {tableMeta.rowData[2]} • {tableMeta.rowData[3] || 'No date'}
            </Typography>
          </Box>
        )
      }
    },
    { name: 'author', label: 'Author', options: { display: 'excluded' } },
    { name: 'createdAt', label: 'Date', options: { 
        display: 'excluded',
        customBodyRender: (val) => new Date(val).toLocaleDateString()
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
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (value, tableMeta) => {
          const blog = blogData.data[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="View Post">
                <IconButton size="small" onClick={() => handleView(blog)} sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}>
                  <Eye sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Post">
                <IconButton size="small" onClick={() => handleEdit(blog.id)} sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                  <Edit sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    }
  ], [blogData.data, handleView, handleEdit]);

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
            Blog Articles
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
            Manage your news, tips, and updates.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => navigate('/admin/blog/new')}
          sx={{ borderRadius: '8px', px: 3, py: 1.2, fontWeight: 800 }}
        >
          New Article
        </Button>
      </Box>

      {/* ─── Metric cards ─── */}
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} sx={{ mb: 4, flexShrink: 0 }}>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Total Posts"
            value={totalCount}
            Icon={ArticleIcon}
            change="Total blog entries"
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
            Icon={EditOutlineIcon}
            change="Hidden posts"
            changeColor="#FFD700"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, lg: 3 }}>
          <AdminMetricStatCard
            label="Categories"
            value={categoriesCount}
            Icon={FileText}
            change="Topics covered"
            changeColor="#8B5CF6"
          />
        </Grid>
      </Grid>

      <AdminDataTable
        title="Journal & News"
        data={blogData.data}
        columns={columns}
        loading={blogData.loading}
      />

      <AdminBlogDetailDialog
        open={detailDialog.isOpen}
        onClose={detailDialog.handleCloseDialog}
        blog={selectedBlog}
        onEdit={(blog) => handleEdit(blog.id)}
        onUpdateStatus={async (id, status) => {
          const resp = await updateBlogStatus(id, status);
          if (resp.code === 'OK') {
            showSnackbar('Status updated successfully', 'success');
            refreshBlogs();
            return true;
          }
          showSnackbar(resp.message || 'Error updating status', 'error');
          return false;
        }}
      />
    </Box>
  );
};

export default AdminBlogPage;
