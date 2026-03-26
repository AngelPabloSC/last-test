import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function GalleryDetailDialog({ open, onClose, project }) {
  const theme = useTheme();

  if (!project) return null;

  const metadata = [
    { label: 'Year', value: project.year || '2024', icon: <CalendarMonthIcon fontSize="small" /> },
    { label: 'Client', value: project.client || 'N/A', icon: <PersonIcon fontSize="small" /> },
    { label: 'Location', value: project.location || 'N/A', icon: <LocationOnIcon fontSize="small" /> },
    { label: 'Category', value: project.category, icon: <SquareFootIcon fontSize="small" /> },
  ];

  const techDetails = project.techDetails || {
    duration: 'N/A',
    teamSize: 'N/A',
    cost: 'N/A'
  };

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
          borderRadius: '12px',
          border: '1px solid #1F1F1F',
          color: 'white',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header Image / Hero */}
        <Box sx={{ position: 'relative', height: 300, overflow: 'hidden' }}>
          <Box
            component="img"
            src={project.img || (project.images && project.images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1440&q=80'}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }}>
            <Chip 
              label={project.category} 
              sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 800, borderRadius: '4px', height: 24, mb: 1 }} 
            />
            <Typography variant="h4" sx={{ fontWeight: 900 }}>{project.name || project.title}</Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography sx={{ color: 'primary.main', fontSize: 12, fontWeight: 900, mb: 1, letterSpacing: 1.5 }}>ABOUT THE PROJECT</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, mb: 4, whiteSpace: 'pre-line' }}>
                {project.detailedDesc || project.shortDesc || 'No description provided.'}
              </Typography>

              <Typography sx={{ color: 'primary.main', fontSize: 12, fontWeight: 900, mb: 2, letterSpacing: 1.5 }}>PROJECT GALLERY</Typography>
              <Grid container spacing={1.5}>
                {(project.images || [project.img]).map((img, idx) => (
                  <Grid size={{ xs: 4 }} key={idx}>
                    <Box 
                      component="img" 
                      src={img} 
                      sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '8px', border: '1px solid #1F1F1F' }} 
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Sidebar */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid #1F1F1F', borderRadius: '12px', p: 3, mb: 3 }}>
                <Typography sx={{ color: '#888', fontSize: 11, fontWeight: 900, mb: 3, letterSpacing: 1 }}>PROJECT SPECS</Typography>
                <Grid container spacing={2.5}>
                  {metadata.map((meta, idx) => (
                    <Grid size={{ xs: 6 }} key={idx}>
                      <Typography sx={{ color: '#555', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{meta.label}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Box sx={{ color: 'primary.main', display: 'flex' }}>{meta.icon}</Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{meta.value}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid #1F1F1F', borderRadius: '12px', p: 3 }}>
                <Typography sx={{ color: '#888', fontSize: 11, fontWeight: 900, mb: 3, letterSpacing: 1 }}>TECHNICAL DETAILS</Typography>
                
                <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(255,215,0,0.05)', p: 1, borderRadius: '8px' }}>
                    <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#555', fontSize: 10, fontWeight: 700 }}>DURATION</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{techDetails.duration}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(96,165,250,0.05)', p: 1, borderRadius: '8px' }}>
                    <GroupsIcon sx={{ color: '#60A5FA', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#555', fontSize: 10, fontWeight: 700 }}>TEAM SIZE</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{techDetails.teamSize}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ bgcolor: 'rgba(74,222,128,0.05)', p: 1, borderRadius: '8px' }}>
                    <AttachMoneyIcon sx={{ color: '#4ADE80', fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#555', fontSize: 10, fontWeight: 700 }}>ESTIMATED COST</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{techDetails.cost}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
