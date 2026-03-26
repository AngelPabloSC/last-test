import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Grid, Container, Button, Divider, useTheme, Chip } from '@mui/material';
import { 
  ArrowBack, SquareFoot, CalendarMonth, LocationOn, Person
} from '@mui/icons-material';

// Mock detailed data for projects
const PROJECT_DETAILS = {
  1: {
    description: "The Hillside Villa represents a pinnacle achievement in modern residential construction. Nestled into the breathtaking Malibu coastline, this 8,500 square-foot masterpiece was designed to harmonize with its natural surroundings while delivering uncompromising luxury at every turn.\n\nOur team of 42 skilled professionals worked meticulously over 18 months to realize the Martinez family vision. Every detail — from the hand-selected California limestone facade to the custom steel-and-glass cantilever overlooking the Pacific — was executed with precision engineering and artisanal craftsmanship.\n\nSmart home integration, passive solar design, and a geothermal climate system ensure this home operates as intelligently as it looks. The Hillside Villa has since been featured in Architectural Digest and received the 2024 CODA Award for residential excellence.",
    metadata: [
      { label: 'Year', value: '2024', icon: <CalendarMonth fontSize="small" /> },
      { label: 'Client', value: 'Martinez Family', icon: <Person fontSize="small" /> },
      { label: 'Location', value: 'Malibu, CA', icon: <LocationOn fontSize="small" /> },
      { label: 'Total Area', value: '8,500 sqft', icon: <SquareFoot fontSize="small" /> },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154542-6308460113c2?w=800&q=80',
    ]
  }
};

// Main projects list for "Related Projects" and basic info
const PROJECTS = [
  { id: 1, name: 'Hillside Villa', category: 'RESIDENTIAL', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1440&q=80' },
  { id: 7, name: 'Azure Business Hub', category: 'COMMERCIAL', img: 'https://images.unsplash.com/photo-1577493322601-3ae1f35c7505?w=800&q=80' },
  { id: 8, name: 'Lakeside Heights', category: 'RESIDENTIAL', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 9, name: 'Terminal X Logistics', category: 'INDUSTRIAL', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' },
];

export default function GalleryDetailPage() {
  const { id } = useParams();
  const theme = useTheme();

  const project = useMemo(() => PROJECTS.find(p => p.id === parseInt(id)) || PROJECTS[0], [id]);
  
  // En una app real, vendría del backend. Aquí lo adaptamos al objeto unificado.
  const details = useMemo(() => {
    const d = PROJECT_DETAILS[project.id] || PROJECT_DETAILS[1];
    
    return {
      description: project.detailedDesc || d.description,
      metadata: [
        { label: 'Year', value: project.year || '2024', icon: <CalendarMonth fontSize="small" /> },
        { label: 'Client', value: project.client || 'N/A', icon: <Person fontSize="small" /> },
        { label: 'Location', value: project.location || 'N/A', icon: <LocationOn fontSize="small" /> },
        { label: 'Total Area', value: project.totalArea || 'N/A', icon: <SquareFoot fontSize="small" /> },
      ],
      gallery: project.images || d.gallery
    };
  }, [project]);

  const related = useMemo(() => PROJECTS.filter(p => p.id !== project.id).slice(0, 3), [project.id]);

  return (
    <Box sx={{ bgcolor: '#000000', color: 'white', minHeight: '100vh', pb: 10 }}>
      {/* ── CINEMATIC HERO ────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: 500, md: 700 }, width: '100%', overflow: 'hidden' }}>
        <Box 
          component="img"
          src={project.img}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.45)' }} />
        
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, transparent 60%)' }} />

        <Container sx={{ position: 'absolute', bottom: { xs: 40, md: 100 }, left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600 }}>
              Home › Gallery ›
            </Typography>
            <Typography sx={{ color: 'primary.main', fontSize: 13, fontWeight: 600 }}>
              {project.name}
            </Typography>
          </Box>
          <Chip 
            label={project.category} 
            sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 800, borderRadius: 0, height: 28, mb: 2 }} 
          />
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: 48, md: 80 }, mb: 2, fontFamily: "'Inter', sans-serif" }}>
            {project.name}
          </Typography>

          {project.shortDesc && (
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: 16, md: 20 }, maxWidth: 700, mb: 4, lineHeight: 1.4, fontWeight: 500 }}>
              {project.shortDesc}
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
      <Container sx={{ py: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: 28, md: 36 } }}>
          Project Gallery
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', mb: 6, fontSize: 15 }}>
          A visual journey through every phase and angle of the {project.name} construction.
        </Typography>
        <Grid container spacing={2}>
          {details.gallery.map((img, idx) => (
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
                  src={img}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── RELATED PROJECTS ──────────────────────────────────────────── */}
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
          {related.map((p) => (
            <Grid size={{ xs: 12, md: 4 }} key={p.id}>
              <Box 
                component={Link}
                to={`/Gallery/${p.id}`}
                sx={{ 
                  display: 'block', 
                  textDecoration: 'none',
                  '&:hover .rel-img': { transform: 'scale(1.05)' },
                  '&:hover .rel-info': { bgcolor: 'primary.main', color: 'black' }
                }}
              >
                <Box sx={{ height: 280, overflow: 'hidden', position: 'relative' }}>
                  <Box 
                    className="rel-img"
                    component="img" 
                    src={p.img} 
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                </Box>
                <Box className="rel-info" sx={{ p: 3, bgcolor: '#111', transition: 'all 0.3s ease' }}>
                   <Typography sx={{ color: 'primary.main', fontWeight: 800, fontSize: 10, letterSpacing: 2, mb: 1 }}>{p.category}</Typography>
                   <Typography sx={{ fontWeight: 700, fontSize: 18, color: 'inherit' }}>{p.name}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

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
