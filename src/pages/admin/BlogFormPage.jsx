import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from './hooks/useBlog';
import BlogForm from './blog/components/BlogForm';
import { useSnackbar } from '@/context/SnackbarContext';

const BlogFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { showSnackbar } = useSnackbar();
  const { getBlogById, saveBlog, updateBlog, updateBlogStatus } = useBlog();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        const data = await getBlogById(id);
        if (data) {
          setPost(data);
        } else {
          showSnackbar('Blog post not found', 'error');
          navigate('/admin/blog');
        }
        setLoading(false);
      };
      fetchPost();
    }
  }, [id, isEdit, getBlogById, showSnackbar, navigate]);

  const handleSubmit = useCallback(async (formData) => {
    setSubmitting(true);
    try {
      const { 
        imageFile, 
        photo, 
        author,
        id: _id, 
        createdAt, 
        updatedAt, 
        ...payload 
      } = formData;
      
      const submitData = { ...payload };

      if (imageFile) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
        });
        submitData.file = base64;
      }

      let resp;
      if (isEdit) {
        resp = await updateBlog(id, submitData);
      } else {
        resp = await saveBlog(submitData);
      }

      if (resp.code === 'OK') {
        showSnackbar(isEdit ? 'Article updated successfully' : 'Article published successfully', 'success');
        navigate('/admin/blog');
      } else {
        showSnackbar(resp.message || 'Error saving article', 'error');
      }
    } catch (err) {
      showSnackbar('Error processing article data', 'error');
    } finally {
      setSubmitting(false);
    }
  }, [isEdit, id, updateBlog, saveBlog, showSnackbar, navigate]);

  const handleStatusChange = useCallback(async (newStatus) => {
    if (!isEdit) return true;
    const resp = await updateBlogStatus(id, newStatus);
    if (resp.code === 'OK') {
      showSnackbar('Visibility updated successfully', 'success');
      return true;
    } else {
      showSnackbar(resp.message || 'Error updating visibility', 'error');
      return false;
    }
  }, [isEdit, id, updateBlogStatus, showSnackbar]);

  if (loading) {
    return (
      <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Loading article details...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ChevronLeft size={20} />} 
          onClick={() => navigate('/admin/blog')}
          sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}
        >
          Back to Articles
        </Button>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff', mb: 1 }}>
          {isEdit ? 'Edit Article' : 'Write New Article'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          {isEdit ? 'Refine your content and update metrics.' : 'Share your knowledge and company updates with the world.'}
        </Typography>
      </Box>

      <BlogForm
        initialData={post || {}}
        onSubmit={handleSubmit}
        onStatusChange={handleStatusChange}
        isSubmitting={submitting}
      />
    </Box>
  );
};

export default BlogFormPage;
