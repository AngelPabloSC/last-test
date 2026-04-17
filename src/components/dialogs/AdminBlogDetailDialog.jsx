import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogActions, IconButton, Typography, Box,
  Divider, Chip, Button, Avatar, RadioGroup, FormControlLabel, Radio,
  CircularProgress, Grid, useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export default function AdminBlogDetailDialog({ open, onClose, blog, onEdit, onUpdateStatus }) {
  const [newStatus, setNewStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (open && blog) {
      setNewStatus(blog.status || 'Hidden');
    }
  }, [open, blog]);

  if (!blog) return null;

  const handleApplyStatus = async () => {
    if (!onUpdateStatus) return;
    setIsUpdating(true);
    await onUpdateStatus(blog.id, newStatus);
    setIsUpdating(false);
  };

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'N/A';

  const handleViewBlog = () => {
    window.open(`/blog/${blog.id}`, '_blank', 'noopener,noreferrer');
  };

  const hasStatusChanged = newStatus !== blog.status;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          bgcolor: '#0A0A0A',
          backgroundImage: 'none',
          borderRadius: { xs: 0, sm: '16px' },
          border: '1px solid #1F1F1F',
          color: 'white',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          m: { xs: 0, sm: 2 },
          height: { xs: '100%', sm: 'calc(100% - 64px)' },
          maxHeight: { xs: '100%', sm: '800px' }
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        
        {/* Header Image / Hero Section */}
        <Box sx={{ position: 'relative', height: { xs: 160, sm: 220, md: 280 }, flexShrink: 0, overflow: 'hidden' }}>
          {blog.photo ? (
            <Box
              component="img"
              src={blog.photo}
              alt={blog.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', bgcolor: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArticleOutlinedIcon sx={{ color: 'rgba(255,255,255,0.05)', fontSize: 80 }} />
            </Box>
          )}
          
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              p: { xs: 2, sm: 3, md: 4 }, 
              background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' 
            }}
          >
            <Chip 
              label={blog.status === 'Visible' ? 'Published' : 'Draft'} 
              size="small"
              sx={{ 
                bgcolor: blog.status === 'Visible' ? '#4ADE80' : '#FFD700', 
                color: 'black', 
                fontWeight: 800, 
                borderRadius: '4px', 
                mb: { xs: 0.5, sm: 1 },
                fontSize: '8px',
                height: 18
              }} 
            />
            <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: 18, sm: 24, md: 30 }, lineHeight: 1.2 }}>
              {blog.title}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              bgcolor: 'rgba(0,0,0,0.5)', 
              color: 'white', 
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              backdropFilter: 'blur(4px)',
              zIndex: 10
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 }, overflowY: 'auto' }}>
          <Grid container spacing={{ xs: 2.5, md: 4 }}>
            
            {/* Left Content Column */}
            <Grid size={{ xs: 12, md: 7.5 }}>
              <Typography sx={{ color: 'primary.main', fontSize: 10, fontWeight: 900, mb: 1, letterSpacing: 1, textTransform: 'uppercase' }}>
                Article Description
              </Typography>
              <Typography 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: 13, 
                  lineHeight: 1.6, 
                  mb: 3,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  p: 2,
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {blog.description || 'No description provided.'}
              </Typography>

              <Typography sx={{ color: 'primary.main', fontSize: 10, fontWeight: 900, mb: 1, letterSpacing: 1, textTransform: 'uppercase' }}>
                Full Content
              </Typography>
              <Box 
                sx={{ 
                  color: 'rgba(255,255,255,0.5)', 
                  fontSize: 13, 
                  lineHeight: 1.8, 
                  bgcolor: 'rgba(255,255,255,0.01)',
                  p: 2,
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.03)',
                  '& h1, & h2, & h3': { color: '#fff', mb: 1, mt: 2 },
                  '& p': { mb: 1.5 },
                  '& strong': { color: '#fff' },
                  '& img': { maxWidth: '100%', height: 'auto', borderRadius: '8px', my: 2 },
                  '& a': { color: 'primary.main', textDecoration: 'none' }
                }}
                dangerouslySetInnerHTML={{ __html: blog.content || '<i>No content available.</i>' }}
              />
            </Grid>

            {/* Right Sidebar Column */}
            <Grid size={{ xs: 12, md: 4.5 }}>
              <Box sx={{ position: { md: 'sticky' }, top: 0 }}>
                {/* Publication Specs */}
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid #1F1F1F', borderRadius: '12px', p: 2, mb: 2 }}>
                  <Typography sx={{ color: '#666', fontSize: 9, fontWeight: 900, mb: 2, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Publishing Details
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'rgba(212,175,55,0.1)', color: 'primary.main', fontSize: 10, fontWeight: 800 }}>
                        {(blog.author || 'A').charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: '#555', fontSize: 8, fontWeight: 800, textTransform: 'uppercase' }}>AUTHOR</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: 11, color: '#fff' }}>{blog.author || 'Anonymous'}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 0.6, borderRadius: '5px', color: 'primary.main', display: 'flex' }}>
                        <CalendarMonthIcon sx={{ fontSize: 14 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#555', fontSize: 8, fontWeight: 800, textTransform: 'uppercase' }}>DATE</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: 11, color: '#fff' }}>{formattedDate}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Status Visibility Panel */}
                <Box sx={{ bgcolor: 'rgba(255,215,0,0.02)', border: '1px solid rgba(255,215,0,0.1)', borderRadius: '12px', p: 2 }}>
                  <Typography sx={{ color: 'primary.main', fontSize: 9, fontWeight: 900, mb: 1.5, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Visibility Status
                  </Typography>
                  
                  <RadioGroup 
                    value={newStatus} 
                    onChange={(e) => setNewStatus(e.target.value)}
                    sx={{ gap: 0.8, mb: 2 }}
                  >
                    {[
                      { val: 'Visible', label: 'Published', color: '#4ADE80', icon: <VisibilityIcon sx={{ fontSize: 12 }} /> },
                      { val: 'Hidden',  label: 'Draft / Hidden', color: '#FFD700', icon: <VisibilityOffIcon sx={{ fontSize: 12 }} /> },
                    ].map(s => (
                      <Box 
                        key={s.val}
                        onClick={() => setNewStatus(s.val)}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1, 
                          p: 1, 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          bgcolor: newStatus === s.val ? `${s.color}10` : 'transparent',
                          border: '1px solid',
                          borderColor: newStatus === s.val ? `${s.color}30` : 'rgba(255,255,255,0.03)',
                          transition: 'all 0.2s'
                        }}
                      >
                        <Radio 
                          value={s.val} 
                          size="small" 
                          sx={{ p: 0, color: 'rgba(255,255,255,0.1)', '&.Mui-checked': { color: s.color } }} 
                        />
                        <Box sx={{ color: newStatus === s.val ? s.color : '#888', display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          {s.icon}
                          <Typography sx={{ fontSize: 10, fontWeight: 700 }}>{s.label}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </RadioGroup>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!hasStatusChanged || isUpdating}
                    onClick={handleApplyStatus}
                    startIcon={isUpdating ? <CircularProgress size={12} color="inherit" /> : <SaveIcon sx={{ fontSize: 14 }} />}
                    sx={{ 
                      height: 34, 
                      fontSize: 11, 
                      fontWeight: 800,
                      textTransform: 'none',
                      borderRadius: '8px',
                      boxShadow: 'none'
                    }}
                  >
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        
        <DialogActions sx={{ p: 2, bgcolor: '#0D0D0D', display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
            onClick={handleViewBlog}
            sx={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'none',
              borderRadius: '8px',
              py: 1,
              bgcolor: 'rgba(255,255,255,0.08)',
              color: '#fff',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
              flexGrow: 1,
              order: { xs: 2, sm: 1 }
            }}
          >
            View on Website
          </Button>

          {onEdit && (
            <Button
              fullWidth
              variant="outlined"
              startIcon={<EditOutlinedIcon sx={{ fontSize: 14 }} />}
              onClick={() => { onClose(); onEdit(blog); }}
              sx={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'none',
                borderRadius: '8px',
                py: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(212,175,55,0.05)',
                  color: 'primary.main'
                },
                flexGrow: 1,
                order: { xs: 1, sm: 2 }
              }}
            >
              Open Full Editor
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
