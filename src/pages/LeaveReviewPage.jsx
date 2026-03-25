import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReviewForm from '@/components/forms/ReviewForm';

const BENEFITS = [
  {
    icon: PeopleIcon,
    title: 'Ayuda a otros propietarios',
    desc: 'Permite que familias tomen decisiones informadas.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Mejora nuestros servicios',
    desc: 'Tu feedback nos guía para ofrecer mejor calidad.',
  },
  {
    icon: EmojiEventsIcon,
    title: 'Reconoce el trabajo excepcional',
    desc: 'Tu reseña motiva a nuestro equipo a seguir dando lo mejor.',
  },
];

function LeftInfoPanel() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  return (
    <Box sx={{ bgcolor: '#111111', border: '1px solid #1F1F1F', borderRadius: '16px', p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
      {/* Tag */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 2, height: 16, borderRadius: 1, bgcolor: gold }} />
        <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
          Tu Experiencia
        </Typography>
      </Box>

      {/* Heading */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography component="h2" sx={{ color: 'white', fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 800, lineHeight: 1.1 }}>
          ¿Por qué tu reseña importa?
        </Typography>
        <Typography sx={{ color: '#9CA3AF', fontSize: 15, lineHeight: 1.6 }}>
          Tu opinión ayuda a otros propietarios a elegir con confianza y nos permite seguir mejorando.
        </Typography>
      </Box>

      {/* Benefits */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <Box key={title} sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: `${gold}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon sx={{ color: gold, fontSize: 22 }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ color: 'white', fontSize: 15, fontWeight: 600 }}>{title}</Typography>
              <Typography sx={{ color: '#9CA3AF', fontSize: 14, lineHeight: 1.5 }}>{desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', bgcolor: '#1F1F1F', w: '100%' }} />

      {/* Testimonial */}
      <Box sx={{ bgcolor: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '12px', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} sx={{ fontSize: 16, color: gold }} />
          ))}
        </Box>
        <Typography sx={{ color: '#D1D5DB', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>
          "Nova Solutions renovó mi techo en tiempo récord. El equipo fue profesional y el resultado superó mis expectativas."
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 1 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: `${gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: gold, fontSize: 14, fontWeight: 800 }}>M</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 700 }}>María García</Typography>
            <Typography sx={{ color: '#6B7280', fontSize: 12 }}>Cliente verificada · Roofing</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Hero() {
  const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 320,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1440&q=80"
        alt="Construction background"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #060606CC, #111111F0)' }} />

      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320, textAlign: 'center', px: 4 }}>
        <Typography sx={{ color: theme.palette.primary.main, fontSize: 12, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', mb: 2 }}>
          Share Your Experience
        </Typography>
        <Typography component="h1" sx={{ color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900, lineHeight: 1.1, mb: 2 }}>
          Leave Us a Review
        </Typography>
        <Typography sx={{ color: '#9CA3AF', fontSize: 16, maxWidth: 600, lineHeight: 1.6 }}>
          Your feedback helps us improve and helps other homeowners make informed decisions.
        </Typography>
        <Box sx={{ mt: 4, width: 60, height: 4, borderRadius: 2, bgcolor: theme.palette.primary.main }} />
      </Box>
    </Box>
  );
}

export default function LeaveReviewPage() {
  useEffect(() => {
    document.title = 'Leave a Review | Nova Solutions';
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#111111', pb: 10 }}>
      <Hero />
      <Box component="section" sx={{ width: '100%', px: { xs: 4, md: 8, lg: 15 }, py: 8 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '480px 1fr' }, gap: { xs: 6, lg: 8 } }}>
          <LeftInfoPanel />
          <ReviewForm />
        </Box>
      </Box>
    </Box>
  );
}
