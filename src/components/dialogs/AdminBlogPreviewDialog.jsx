import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  useTheme,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import format from 'date-fns/format';

export default function AdminBlogPreviewDialog({ open, onClose, blog, loading }) {
  const theme = useTheme();

  if (!blog && !loading) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0A0A0A',
          backgroundImage: 'none',
          borderRadius: '16px',
          border: '1px solid #1F1F1F',
          color: 'white',
          overflow: 'hidden'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ 
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            bgcolor: 'rgba(0,0,0,0.5)', color: 'white', 
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } 
          }}
        >
          <CloseIcon />
        </IconButton>

        {loading ? (
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {/* Hero Section */}
            <Box sx={{ position: 'relative', height: 350, overflow: 'hidden' }}>
              <Box
                component="img"
                src={blog.photo || 'https://via.placeholder.com/800x400?text=Nova+Blog'}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box sx={{ 
                position: 'absolute', inset: 0, 
                background: 'linear-gradient(to top, #0A0A0A 5%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' 
              }} />
              
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip 
                    label={blog.category || 'General'} 
                    size="small"
                    sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 900, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label={blog.status} 
                    size="small"
                    variant="outlined"
                    sx={{ 
                      color: blog.status === 'Visible' ? '#4ADE80' : '#FFD700', 
                      borderColor: blog.status === 'Visible' ? '#4ADE80' : '#FFD700',
                      fontWeight: 800, borderRadius: '4px', bgcolor: 'rgba(0,0,0,0.5)'
                    }} 
                  />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.1, mb: 1 }}>
                  {blog.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 2, color: 'rgba(255,255,255,0.6)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography fontSize={13} fontWeight={600}>{blog.author || 'Admin'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography fontSize={13} fontWeight={600}>
                      {blog.updatedAt ? format(new Date(blog.updatedAt), 'MMM dd, yyyy') : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <DialogContent sx={{ p: 4, bgcolor: '#0A0A0A' }}>
              <Grid container spacing={4}>
                {/* Main Content */}
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: 16, 
                    lineHeight: 1.8,
                    '& h1, & h2, & h3': { color: 'white', mt: 4, mb: 2 },
                    '& p': { mb: 3 },
                    '& ul, & ol': { pl: 3, mb: 3 },
                    '& blockquote': { 
                      borderLeft: '4px solid #D4AF37', pl: 3, py: 1, 
                      bgcolor: 'rgba(212, 175, 55, 0.05)', borderRadius: '0 8px 8px 0',
                      fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', mb: 3
                    },
                    '& hr': { border: 'none', borderTop: '1px solid #1F1F1F', my: 4 },
                    '& a': { color: 'primary.main', textDecoration: 'underline' },
                    '& img': { maxWidth: '100%', borderRadius: '12px', my: 2 }
                  }}>
                    {blog.description ? (
                      <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                    ) : (
                      <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
                        No content provided for this article.
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Box>
    </Dialog>
  );
}
