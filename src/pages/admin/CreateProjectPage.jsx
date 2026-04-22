import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useGallery } from './hooks/useGallery';
import GalleryProjectForm from './gallery/components/GalleryProjectForm';
import { useSnackbar } from '@/context/SnackbarContext';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const isEdit = Boolean(id);
  const { showSnackbar } = useSnackbar();
  const { getProjectById, saveProject, updateProject, updateProjectStatus, uploadProjectImages } = useGallery();

  const [project, setProject] = useState(state?.project || null);
  const [loading, setLoading] = useState(isEdit && !state?.project);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && !state?.project) {
      const fetchProject = async () => {
        const data = await getProjectById(id);
        if (data) {
          setProject(data);
        } else {
          showSnackbar('Project not found', 'error');
          navigate('/admin/gallery');
        }
        setLoading(false);
      };
      fetchProject();
    }
  }, [id, isEdit, state?.project, getProjectById, showSnackbar, navigate]);

  // useCallback: stable refs passed as props to GalleryProjectForm avoid child re-renders
  const handleSubmit = useCallback(async (formData) => {
    setSubmitting(true);
    try {
      const { images, ...payload } = formData;
      
      let resp;
      if (isEdit) {
        resp = await updateProject(id, payload);
      } else {
        resp = await saveProject(payload);
      }

      if (resp.code !== 'OK') {
        showSnackbar(resp.message || 'Error saving project data', 'error');
        setSubmitting(false);
        return;
      }

      const projectId = isEdit ? id : (resp.data?.data?.id || resp.data?.id);

      const newImages = images.filter((img) => img.isNew && img.file);
      if (newImages.length > 0) {
        const uploadFormData = new FormData();
        newImages.forEach((img) => uploadFormData.append('images', img.file));
        const uploadResp = await uploadProjectImages(projectId, uploadFormData);
        if (uploadResp.code !== 'OK') {
          showSnackbar('Project saved but images failed to upload', 'warning');
        }
      }

      showSnackbar(isEdit ? 'Project updated successfully' : 'Project created successfully', 'success');
      navigate('/admin/gallery');
    } catch (err) {
      showSnackbar('Connection error during save', 'error');
    } finally {
      setSubmitting(false);
    }
  }, [isEdit, id, updateProject, saveProject, uploadProjectImages, showSnackbar, navigate]);

  const handleStatusChange = useCallback(async (newStatus) => {
    if (!isEdit) return true;
    const resp = await updateProjectStatus(id, newStatus);
    if (resp.code === 'OK') {
      showSnackbar('Status updated successfully', 'success');
      return true;
    } else {
      showSnackbar(resp.message || 'Error updating status', 'error');
      return false;
    }
  }, [isEdit, id, updateProjectStatus, showSnackbar]);

  if (loading) {
    return (
      <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Loading project details...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ChevronLeft size={20} />} 
          onClick={() => navigate('/admin/gallery')}
          sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}
        >
          Back to Gallery
        </Button>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>
          {isEdit ? 'Edit Project' : 'Add New Project'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          {isEdit ? 'Update existing project information and gallery.' : 'Configure a new project for your portfolio showcase.'}
        </Typography>
      </Box>

      <GalleryProjectForm
        initialData={project || {}}
        onSubmit={handleSubmit}
        onStatusChange={handleStatusChange}
        isSubmitting={submitting}
      />
    </Box>
  );
};

export default CreateProjectPage;
