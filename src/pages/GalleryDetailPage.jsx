import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button, Divider, useTheme, Chip, CircularProgress } from '@mui/material';
import { 
  ArrowBack, SquareFoot, CalendarMonth, LocationOn, Person
} from '@mui/icons-material';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import PublicProjectCard from '@/components/cards/PublicProjectCard';
import SEO from '@/components/ui/SEO';

export default function GalleryDetailPage() {
  const { id } = useParams();
  const theme = useTheme();
  const { getFechData } = useFetchDataPromise();

  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all projects and find the specific one locally
  useEffect(() => {
    const fetchProjectAndRelated = async () => {
      setIsLoading(true);
      try {
        // Since there is no /id endpoint, we fetch the list and find it
        const listResponse = await getFechData({ endPoint: `projects?limit=100&status=Visible`, method: 'GET' });
        
        if (listResponse?.code === API_CODES.OK) {
          const allProjects = listResponse.data?.data || [];
          const currentProject = allProjects.find(p => String(p.id) === String(id));
          
          if (currentProject) {
            setProject(currentProject);
            
            // Find related projects from the same response
            const filteredRelated = allProjects
              .filter(p => String(p.id) !== String(id) && p.serviceTypeId === currentProject.serviceTypeId)
              .slice(0, 3);
            
            setRelated(filteredRelated);
          } else {
            setProject(null);
          }
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error('Error fetching projects list:', err);
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
       fetchProjectAndRelated();
       // scroll to top on params id change
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, getFechData]);

  const details = useMemo(() => {
    if (!project) return null;
    
    const sortedImages = project.images ? [...project.images].sort((a, b) => a.order - b.order) : [];
    const coverImage = sortedImages[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1440&q=80';

    return {
      name: project.title || 'Untitled Project',
      category: project.serviceType?.name || 'General',
      coverImage: coverImage,
      description: project.about || 'No description provided.',
      shortDesc: '',
      metadata: [
        { label: 'Year', value: project.year || 'N/A', icon: <CalendarMonth fontSize="small" /> },
        { label: 'Client', value: project.client || 'N/A', icon: <Person fontSize="small" /> },
        { label: 'Location', value: project.location || 'N/A', icon: <LocationOn fontSize="small" /> },
        { label: 'Total Area', value: project.area ? `${project.area} sqft` : 'N/A', icon: <SquareFoot fontSize="small" /> },
      ],
      gallery: sortedImages.map(img => img.url)
    };
  }, [project]);

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: '#000000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!project || !details) {
    return (
      <Box sx={{ bgcolor: '#000000', color: 'white', minHeight: '100vh', pt: 15, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 3 }}>Project Not Found</Typography>
        <Button component={Link} to="/Gallery" variant="contained" startIcon={<ArrowBack />}>
          Back to Gallery
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#000000', color: 'white', minHeight: '100vh', pb: 10 }}>
      <SEO 
        title={`${details.name} | Nova Solutions Restoration Project Case Study`}
        description={`Detailed view of our project: ${details.name}. A ${details.category} project by Nova Solutions Restoration in the Capital Region.`}
        keywords={`${details.name}, roofing project, siding project, ${details.category}, Nova Solutions Restoration gallery`}
      />
      {/* ── CINEMATIC HERO ────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: 500, md: 700 }, width: '100%', overflow: 'hidden' }}>
        <Box 
          component="img"
          src={details.coverImage}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.45)' }} />
        
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 60%)' }} />

        <Container sx={{ position: 'absolute', bottom: { xs: 40, md: 100 }, left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> › <Link to="/Gallery" style={{ color: 'inherit', textDecoration: 'none' }}>Gallery</Link> ›
            </Typography>
            <Typography sx={{ color: 'primary.main', fontSize: 13, fontWeight: 600 }}>
              {details.name}
            </Typography>
          </Box>
          <Chip 
            label={details.category} 
            sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 800, borderRadius: 0, height: 28, mb: 2 }} 
          />
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: 48, md: 80 }, mb: 2, fontFamily: "'Inter', sans-serif" }}>
            {details.name}
          </Typography>

          {details.shortDesc && (
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: 16, md: 20 }, maxWidth: 700, mb: 4, lineHeight: 1.4, fontWeight: 500 }}>
              {details.shortDesc}
            </Typography>
          )}

          <Grid container spacing={4}>
            {details.metadata.map((meta, idx) => (
              <Grid key={idx}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>
                  {meta.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{meta.icon}</Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{meta.value}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── ABOUT PROJECT ─────────────────────────────────────────────── */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: 28, md: 36 } }}>
          About This Project
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.8, whiteSpace: 'pre-line', maxWidth: 1000 }}>
          {details.description}
        </Typography>
      </Container>

      {/* ── PROJECT GALLERY ───────────────────────────────────────────── */}
      {details.gallery.length > 0 && (
        <Container sx={{ py: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: 28, md: 36 } }}>
            Project Gallery
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 6, fontSize: 15 }}>
            A visual journey through every phase and angle of the {details.name} construction.
          </Typography>
          <Grid container spacing={2}>
            {details.gallery.map((imgUrl, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Box 
                  sx={{ 
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    height: 300, 
                    cursor: 'pointer',
                    '&:hover img': { transform: 'scale(1.08)' }
                  }}
                >
                  <Box 
                    component="img"
                    src={imgUrl}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* ── RELATED PROJECTS ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <Container sx={{ py: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: 28, md: 36 } }}>
              Related Projects
            </Typography>
            <Button 
              component={Link} 
              to="/Gallery" 
              sx={{ color: 'primary.main', fontWeight: 700, p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
            >
              VIEW ALL PROJECTS ›
            </Button>
          </Box>
          <Grid container spacing={3}>
            {related.map((p) => {
              const relCover = p.images?.find(img => img.order === 1)?.url || p.images?.[0]?.url || 'https://images.unsplash.com/photo-1577493322601-3ae1f35c7505?w=800&q=80';
              const cardProps = {
                id: p.id,
                name: p.title || 'Untitled Project',
                category: p.serviceType?.name || 'General',
                img: relCover,
                shortDesc: p.about || ''
              };

              return (
                <Grid size={{ xs: 12, md: 4 }} key={p.id}>
                  <PublicProjectCard {...cardProps} height={{ xs: 300, md: 350 }} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <Box sx={{ py: 12, textAlign: 'center', borderTop: '1px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 900, letterSpacing: 4 }}>READY TO BUILD?</Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: 40, md: 64 }, my: 2 }}>Start Your Own Project</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 600, mx: 'auto', mb: 6 }}>
          Let Nova Solutions bring your architectural vision to life. Our team of experts is ready to turn your dream into a landmark.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button component={Link} to="/About/Contact-us" variant="contained" sx={{ px: 6, py: 2, fontWeight: 800, borderRadius: 0 }}>
            GET A FREE QUOTE
          </Button>
          <Button component={Link} to="/Gallery" variant="outlined" sx={{ px: 6, py: 2, fontWeight: 800, borderRadius: 0, borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
            VIEW ALL PROJECTS
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
