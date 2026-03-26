import React, { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGallery } from './hooks/useGallery';
import { Box, Typography, IconButton, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import GalleryProjectForm from './components/GalleryProjectForm';

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { getProjectById, saveProject, updateProject } = useGallery();

  const projectData = useMemo(() => {
    if (isEdit) {
      const p = getProjectById(id);
      if (p) return { ...p, status: p.visible ? 'Published' : 'Completed' };
    }
    return null;
  }, [id, isEdit, getProjectById]);

  const handleSubmit = async (data) => {
    try {
      const response = isEdit 
        ? await updateProject(id, data)
        : await saveProject(data);
      
      if (response.code === 'OK') {
        navigate('/admin/gallery');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', color: 'white', pb: 10 }}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <IconButton component={Link} to="/admin/gallery" sx={{ color: 'white', p: 0 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {isEdit ? 'Edit Gallery Project' : 'Create Gallery Project'}
              </Typography>
            </Box>
            <Typography sx={{ color: '#888', fontSize: 14 }}>
              {isEdit ? 'Update the information for your project' : 'Complete the information for the new project'}
            </Typography>
          </Box>
        </Box>

        <GalleryProjectForm 
          initialData={projectData || {}} 
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/gallery')}
        />
      </Container>
    </Box>
  );
}
