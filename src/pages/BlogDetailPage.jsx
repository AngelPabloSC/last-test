import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress, IconButton, Divider } from '@mui/material';
import { ArrowBack, Person, CalendarMonth } from '@mui/icons-material';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import SEO from '@/components/ui/SEO';

export default function BlogDetailPage() {
  const { id } = useParams();
  const { getFechData } = useFetchDataPromise();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getFechData({
          endPoint: `blogs/${id}`,
          method: 'GET'
        });

        if (response?.code === API_CODES.OK) {
          setPost(response.data || null);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
      window.scrollTo(0, 0);
    }
  }, [id, getFechData]);

  if (loading) {
    return (
      <Box sx={{ bgcolor: '#000000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ bgcolor: '#000000', color: 'white', minHeight: '100vh', pt: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>Article not found</Typography>
        <IconButton component={Link} to="/blog" sx={{ color: 'primary.main' }}>
          <ArrowBack /> Back to Blog
        </IconButton>
      </Box>
    );
  }

  const displayDate = post.date || new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box sx={{ bgcolor: '#000000', color: 'white', minHeight: '100vh', pb: 15 }}>
      <SEO 
        title={`${post.title} | Nova Solutions Restoration Blog`}
        description={post.description || `Read about ${post.title} on the Nova Solutions Restoration blog. Expert tips and updates on home restoration.`}
        keywords={`${post.title}, roofing blog, siding tips, construction news, Nova Solutions Restoration`}
      />
      {/* ── HERO SECTION ───────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: 400, md: 600 }, width: '100%', mb: 8 }}>
        <Box 
          component="img"
          src={post.photo || 'https://via.placeholder.com/1920x1080?text=Nova+Solutions'}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 60%)' }} />

        <Container sx={{ position: 'absolute', bottom: { xs: 40, md: 80 }, left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <IconButton component={Link} to="/blog" sx={{ color: 'white', p: 0, mr: 1 }}>
              <ArrowBack />
            </IconButton>
            <Typography sx={{ color: 'primary.main', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
              Blog › Article
            </Typography>
          </Box>
<Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: 36, md: 72 }, mb: 3, lineHeight: 1.1 }}>
            {post.title}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 } }}>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                  By {post.author || 'Nova Team'}
                </Typography>
             </Box>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonth sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                  {displayDate}
                </Typography>
             </Box>
          </Box>
        </Container>
      </Box>

      {/* ── CONTENT BODY ───────────────────────────────────────────────── */}
      <Container maxWidth="md">
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'primary.main', 
            mb: 6, 
            fontStyle: 'italic', 
            fontWeight: 500, 
            lineHeight: 1.6,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: 3
          }}
        >
          {post.description}
        </Typography>

        <Box 
          sx={{ 
            color: 'rgba(255,255,255,0.85)', 
            fontSize: { xs: 17, md: 19 }, 
            lineHeight: 1.9,
            '& p': { mb: 3 },
            '& h2': { color: 'white', mt: 6, mb: 3, fontWeight: 800, fontSize: { xs: 28, md: 36 } },
            '& h3': { color: 'white', mt: 5, mb: 2, fontWeight: 700, fontSize: { xs: 22, md: 28 } },
            '& img': { 
              maxWidth: '100%', 
              height: 'auto', 
              borderRadius: '8px', 
              my: 4,
              display: 'block',
              mx: 'auto'
            },
            '& blockquote': {
              borderLeft: '4px solid #D4AF37',
              pl: 3,
              fontStyle: 'italic',
              my: 5,
              color: 'rgba(255,255,255,0.6)'
            },
            '& ul, & ol': { pl: 3, mb: 4 },
            '& li': { mb: 1.5 }
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Divider sx={{ my: 10, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* AUTHOR BIO / FOOTER */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 4, bgcolor: '#0A0A0A', borderRadius: '16px', border: '1px solid #1F1F1F' }}>
           <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: 'black' }}>
              {post.author?.[0] || 'N'}
           </Box>
           <Box>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 18, mb: 0.5 }}>{post.author || 'Nova Team'}</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                Experts in construction and design solutions for residential and commercial projects.
              </Typography>
           </Box>
        </Box>
      </Container>
    </Box>
  );
}
