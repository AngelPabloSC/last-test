import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, Container, Grid, TextField, InputAdornment, CircularProgress, Pagination } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import BlogCard from '@/components/cards/BlogCard';
import SEO from '@/components/ui/SEO';

export default function BlogPage() {
  const { getFechData } = useFetchDataPromise();
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        params.append('status', 'Visible'); 
        if (searchTerm) params.append('search', searchTerm);

        const response = await getFechData({
          endPoint: `blogs?${params.toString()}`,
          method: 'GET'
        });

        if (response?.code === API_CODES.OK) {
          setBlogs(response.data?.data || []);
          setTotal(response.data?.total || 0);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchBlogs, searchTerm ? 500 : 0);
    return () => clearTimeout(timer);
  }, [page, searchTerm, getFechData]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  }, []);


  const featuredPost = useMemo(() => blogs[0], [blogs]);
  const remainingPosts = useMemo(() => blogs.slice(1), [blogs]);

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', pb: 10 }}>
      <SEO 
        title="Roofing & Siding Blog | Nova Solutions Restoration | Albany, NY"
        description="Read the latest articles, maintenance tips, and home improvement guides from Nova Solutions Restoration. Expert advice on roofing, siding, and gutters in Albany."
        keywords="roofing blog Albany, siding maintenance tips, gutter installation guide Capital Region, Nova Solutions Restoration news"
      />

      <Box sx={{ 
        pt: { xs: 12, md: 20 }, 
        pb: { xs: 8, md: 10 }, 
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 100%)'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ 
            color: 'white', 
            fontWeight: 800, 
            fontSize: { xs: 42, md: 72 }, 
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '-1px'
          }}>
            Our Blog
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: { xs: 16, md: 20 }, maxWidth: 600, mx: 'auto', mb: 6 }}>
            Articles, tutorials and updates from the Nova team
          </Typography>

          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  bgcolor: '#0A0A0A',
                  borderRadius: '12px',
                  border: '1px solid #1F1F1F',
                  height: 56,
                  '& fieldset': { border: 'none' },
                  '&:hover': { border: '1px solid #333' },
                  '&.Mui-focused': { border: '1px solid #D4AF37' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255,255,255,0.3)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 } }}>
        {loading && page === 1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {blogs.length > 0 ? (
              <>
                {page === 1 && featuredPost && (
                  <BlogCard post={featuredPost} featured={true} />
                )}
                <Grid container spacing={4} sx={{ mt: 2 }}>
                  {(page === 1 ? remainingPosts : blogs).map((post) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={post.id}>
                      <BlogCard post={post} />
                    </Grid>
                  ))}
                </Grid>

            
                {Math.ceil(total / limit) > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <Pagination 
                      count={Math.ceil(total / limit)} 
                      page={page} 
                      onChange={(e, v) => {
                        setPage(v);
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
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }
                        }
                      }}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 15 }}>
                <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>
                  No articles matched your search.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
