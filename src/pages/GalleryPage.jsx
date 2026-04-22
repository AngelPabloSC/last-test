import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Button, Grid, useTheme, CircularProgress, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import PublicProjectCard from '@/components/cards/PublicProjectCard';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import SEO from '@/components/ui/SEO';

export default function GalleryPage() {
  const theme = useTheme();
  const { getFechData } = useFetchDataPromise();

  const [serviceTypes, setServiceTypes] = useState([]);
  const [activeFilterId, setActiveFilterId] = useState('all');
  
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const res = await getFechData({ endPoint: 'service-types', method: 'GET' });
        if (res?.code === API_CODES.OK) {
          setServiceTypes(res.data || []);
        }
      } catch {
      }
    };
    fetchTabs();
  }, [getFechData]);

  const fetchProjectsData = useCallback(async (currentPage, filterId, reset = false) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 8);
      params.append('status', 'Visible');
      if (filterId !== 'all') params.append('serviceTypeId', filterId);
      
      const response = await getFechData({
        endPoint: `projects?${params.toString()}`,
        method: 'GET'
      });

      if (response?.code === API_CODES.OK) {
        const newProjects = response.data?.data || [];
        setProjects((prev) => reset ? newProjects : [...prev, ...newProjects]);
        setTotal(response.data?.total || 0);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [getFechData]);

  useEffect(() => {
    fetchProjectsData(1, activeFilterId, true);
  }, [activeFilterId, fetchProjectsData]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjectsData(nextPage, activeFilterId, false);
  }, [page, activeFilterId, fetchProjectsData]);

  const displayedProjects = useMemo(() => projects.map((p) => ({
    id: p.id,
    name: p.title || 'Untitled Project',
    category: p.serviceType?.name || 'General',
    img: p.images?.find((img) => img.order === 1)?.url || p.images?.[0]?.url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    shortDesc: p.about || ''
  })), [projects]);

  return (
    <Box sx={{ bgcolor: '#000000', color: 'text.primary', minHeight: '100vh', pb: 10 }}>
      <SEO 
        title="Project Gallery | Nova Solutions Restoration | Roofing & Siding Showcase"
        description="Explore our gallery of completed roofing, siding, and gutter projects across Albany and the Capital Region. See the quality craftsmanship of Nova Solutions Restoration."
        keywords="roofing gallery Albany, siding projects Capital Region, gutter installation photos NY, Nova Solutions Restoration work"
      />
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
        <Box
          component="button"
          onClick={() => { setActiveFilterId('all'); setPage(1); }}
          sx={{
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3.5,
            py: 1,
            fontSize: 12,
            whiteSpace: 'nowrap',
            bgcolor: activeFilterId === 'all' ? 'primary.main' : 'transparent',
            color: activeFilterId === 'all' ? 'common.black' : 'text.disabled',
            border: activeFilterId === 'all' ? 'none' : '1px solid #333',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: activeFilterId === 'all' ? 'primary.main' : '#1A1A1A' }
          }}
        >
          All Projects
        </Box>
        {serviceTypes.map((tab) => {
          const isActive = activeFilterId === tab.id;
          return (
            <Box
              key={tab.id}
              component="button"
              onClick={() => { setActiveFilterId(tab.id); setPage(1); }}
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
              {tab.name}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ px: { xs: 2, md: 10 }, maxWidth: 1600, mx: 'auto' }}>
        <Grid container spacing={3}>
          {displayedProjects[0] && (
            <Grid size={{ xs: 12, md: 8 }}>
               <PublicProjectCard {...displayedProjects[0]} height={{ xs: 350, md: 624 }} />
            </Grid>
          )}
          {(displayedProjects[1] || displayedProjects[2]) && (
            <Grid size={{ xs: 12, md: 4 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                  {displayedProjects[1] && <PublicProjectCard {...displayedProjects[1]} height={{ xs: 300, md: 300 }} />}
                  {displayedProjects[2] && <PublicProjectCard {...displayedProjects[2]} height={{ xs: 300, md: 300 }} />}
               </Box>
            </Grid>
          )}

          {(displayedProjects[3] || displayedProjects[4]) && (
            <Grid size={{ xs: 12, md: 4 }}>
               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                  {displayedProjects[3] && <PublicProjectCard {...displayedProjects[3]} height={{ xs: 300, md: 300 }} />}
                  {displayedProjects[4] && <PublicProjectCard {...displayedProjects[4]} height={{ xs: 300, md: 300 }} />}
               </Box>
            </Grid>
          )}
          {displayedProjects[5] && (
            <Grid size={{ xs: 12, md: 8 }}>
               <PublicProjectCard {...displayedProjects[5]} height={{ xs: 350, md: 624 }} />
            </Grid>
          )}

          {displayedProjects[6] && displayedProjects[7] && (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                 <PublicProjectCard {...displayedProjects[6]} height={{ xs: 300, md: 450 }} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                 <PublicProjectCard {...displayedProjects[7]} height={{ xs: 300, md: 450 }} />
              </Grid>
            </>
          )}

          {displayedProjects.slice(8, 11).map((p) => (
             <Grid size={{ xs: 12, sm: 4 }} key={p.id}>
                <PublicProjectCard {...p} height={{ xs: 300, md: 350 }} />
             </Grid>
          ))}

          {displayedProjects.slice(11).map((p) => (
             <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <PublicProjectCard {...p} height={{ xs: 300, md: 350 }} />
             </Grid>
          ))}
        </Grid>

        {displayedProjects.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found for this category.
            </Typography>
          </Box>
        )}
      </Box>

      {Math.ceil(total / 8) > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Pagination 
            count={Math.ceil(total / 8)} 
            page={page} 
            onChange={(event, value) => {
              setPage(value);
              fetchProjectsData(value, activeFilterId, true);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#888',
                borderColor: '#2A2A2A',
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'black',
                  '&:hover': { bgcolor: '#EAB308' }
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  color: 'white'
                }
              }
            }}
          />
        </Box>
      )}

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
