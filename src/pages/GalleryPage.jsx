import React, { useState } from 'react';
import { Box, Typography, Button, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/common/ProjectCard';

// Data from the model src/test/GalleryPage.jsx
const FILTER_TABS = [
  'All Projects', 'Residential', 'Commercial', 'Industrial', 'Interior Design',
];

const PROJECTS = [
  { id: 1, name: 'Skyline Tower Complex', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', shortDesc: 'A state-of-the-art office complex featuring sustainable glass architecture.' },
  { id: 2, name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80', shortDesc: 'Luxury apartments with breathtaking views of the city skyline and river.' },
  { id: 3, name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', shortDesc: 'Modern logistics hub designed for maximum efficiency and connectivity.' },
  { id: 4, name: 'Heritage Loft Conversion', category: 'Interior Design', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', shortDesc: 'Creative transformation of a historical warehouse into modern living spaces.' },
  { id: 5, name: 'Harbor Bridge Plaza', category: 'Commercial', img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80', shortDesc: 'Premier retail and dining destination at the heart of the harbor front.' },
  { id: 6, name: 'Green Meadows Estate', category: 'Residential', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', shortDesc: 'Sustainable family homes integrated with nature and community spaces.' },
];

export default function GalleryPage() {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProjects = PROJECTS.filter(p => 
    activeFilter === 'All Projects' || p.category === activeFilter
  );

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <Box sx={{ bgcolor: '#000000', color: 'text.primary', minHeight: '100vh', pb: 10 }}>
      
      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', width: '100%', height: { xs: 400, md: 550 }, overflow: 'hidden' }}>
        <Box 
          component="img"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1440&q=80"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.65)' }} />
        
        <Box sx={{ position: 'absolute', left: { xs: 20, md: 100 }, bottom: { xs: 60, md: 100 }, maxWidth: 800 }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 600, fontSize: 13, mb: 1.5 }}>
            Home › Gallery
          </Typography>
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 700, fontSize: { xs: 48, md: 72 }, mb: 1, fontFamily: "'Inter', sans-serif" }}>
            Our Portfolio
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mb: 3 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: 14, md: 16 }, maxWidth: 500, lineHeight: 1.6 }}>
            Explore our award-winning projects in residential, commercial and industrial construction across the region.
          </Typography>
        </Box>
      </Box>

      {/* ── FILTER TABS ────────────────────────────────────────────────── */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 1.5, 
          py: 8, 
          bgcolor: '#000000', 
          overflowX: 'auto',
          px: 2,
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <Box
              key={tab}
              component="button"
              onClick={() => { setActiveFilter(tab); setVisibleCount(12); }}
              sx={{
                borderRadius: '4px',
                textTransform: 'none',
                fontWeight: 600,
                px: 3.5,
                py: 1,
                fontSize: 12,
                whiteSpace: 'nowrap',
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'common.black' : 'text.disabled',
                border: isActive ? 'none' : '1px solid #333',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: isActive ? 'primary.main' : '#1A1A1A' }
              }}
            >
              {tab}
            </Box>
          );
        })}
      </Box>

      {/* ── DYNAMIC GRID SEQUENCE ─────────────────────────────────────── */}
      <Box sx={{ px: { xs: 2, md: 10 }, maxWidth: 1600, mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Block 1: Large Left | 2 Small Right (Stacked) */}
          {displayedProjects[0] && (
            <Grid size={{ xs: 12, md: 8 }}>
               <ProjectCard {...displayedProjects[0]} height={{ xs: 350, md: 624 }} />
            </Grid>
          )}
          {(displayedProjects[1] || displayedProjects[2]) && (
            <Grid size={{ xs: 12, md: 4 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                  {displayedProjects[1] && <ProjectCard {...displayedProjects[1]} height={{ xs: 300, md: 300 }} />}
                  {displayedProjects[2] && <ProjectCard {...displayedProjects[2]} height={{ xs: 300, md: 300 }} />}
               </Box>
            </Grid>
          )}

          {/* Block 2 (Alternating): 2 Small Left (Stacked) | Large Right */}
          {(displayedProjects[3] || displayedProjects[4]) && (
            <Grid size={{ xs: 12, md: 4 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                  {displayedProjects[3] && <ProjectCard {...displayedProjects[3]} height={{ xs: 300, md: 300 }} />}
                  {displayedProjects[4] && <ProjectCard {...displayedProjects[4]} height={{ xs: 300, md: 300 }} />}
               </Box>
            </Grid>
          )}
          {displayedProjects[5] && (
            <Grid size={{ xs: 12, md: 8 }}>
               <ProjectCard {...displayedProjects[5]} height={{ xs: 350, md: 624 }} />
            </Grid>
          )}

          {/* Row: 2 Mediums (6/6) */}
          {displayedProjects[6] && displayedProjects[7] && (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                 <ProjectCard {...displayedProjects[6]} height={{ xs: 300, md: 450 }} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                 <ProjectCard {...displayedProjects[7]} height={{ xs: 300, md: 450 }} />
              </Grid>
            </>
          )}

          {/* Row: 3 Smalls (4/4/4) */}
          {displayedProjects.slice(8, 11).map((p) => (
             <Grid size={{ xs: 12, sm: 4 }} key={p.id}>
                <ProjectCard {...p} height={{ xs: 300, md: 350 }} />
             </Grid>
          ))}

          {/* Remaining */}
          {displayedProjects.slice(11).map((p) => (
             <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <ProjectCard {...p} height={{ xs: 300, md: 350 }} />
             </Grid>
          ))}
        </Grid>
      </Box>

      {/* ── LOAD MORE ───────────────────────────────────────────────── */}
      {visibleCount < filteredProjects.length && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, gap: 3 }}>
          <Box sx={{ width: 300, height: 4, bgcolor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <Box 
              sx={{ 
                width: `${(visibleCount / filteredProjects.length) * 100}%`, 
                height: '100%', 
                bgcolor: 'primary.main',
                transition: 'width 0.5s ease'
              }} 
            />
          </Box>
          <Button
            onClick={() => setVisibleCount(prev => prev + 4)}
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: 14,
              px: 6,
              py: 1.5,
              borderRadius: 0,
              '&:hover': { bgcolor: 'primary.main', color: 'common.black' }
            }}
          >
            Load More Projects
          </Button>
        </Box>
      )}

      {/* ── CTA SECTION ───────────────────────────────────────────────── */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: 480, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          mt: 8
        }}
      >
        <Box 
          component="img"
          src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1440&q=80"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.85)', zIndex: -1 }} />
        
        <Box sx={{ px: 3 }}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: 32, md: 48 }, mb: 2 }}>
            Ready to Build Your Vision?
          </Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: 'primary.main', mx: 'auto', mb: 3 }} />
          <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 600, mx: 'auto', mb: 5 }}>
            Join hundreds of satisfied clients who trusted Nova Solutions with their dream projects.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button 
              component={Link}
              to="/About/Contact-us"
              variant="contained" 
              sx={{ px: 6, py: 2, fontWeight: 700, borderRadius: 0 }}
            >
              Start Your Project
            </Button>
            <Button 
              component={Link}
              to="/Reviews"
              variant="outlined" 
              sx={{ px: 6, py: 2, fontWeight: 700, borderRadius: 0, color: 'white', borderColor: 'white' }}
            >
              View Our Reviews
            </Button>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
