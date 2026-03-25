// ─── LoginBrandingPanel.jsx ───────────────────────────────────────────────────
// Responsabilidad única: panel izquierdo de la página de login.
// Muestra branding, features y estadísticas. Solo presentacional, sin lógica.

import { Box, Typography, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1770650882353-8dbf9b85a4cf?w=1080&q=80';

const FEATURES = [
  'Manage service requests and quotes',
  'Customer review moderation',
  'Email and communications',
];

const STATS = [
  { value: '24',   label: 'Active requests' },
  { value: '156',  label: 'Total reviews'   },
  { value: '4.8★', label: 'Average rating'  },
];

export default function LoginBrandingPanel() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '560px',
        flexShrink: 0,
        overflow: 'hidden',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${BG_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #000000F0 0%, #000000AA 100%)',
        }}
      />

      {/* Ambient gold glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-96px',
          left: '-96px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.09)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          px: '40px',
        }}
      >
        {/* Logo row */}
        <Box sx={{ mt: '60px', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '8px',
              bgcolor: 'primary.main',
            }}
          >
            <Typography sx={{ fontSize: '22px', fontWeight: 800, color: 'primary.contrastText', lineHeight: 1 }}>
              N
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
            Nova Admin
          </Typography>
          <Box
            sx={{
              borderRadius: '4px',
              bgcolor: alpha(theme.palette.primary.main, 0.25),
              px: '8px',
              py: '2px',
            }}
          >
            <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'primary.main', lineHeight: 1.4 }}>
              v2.4
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mt: '18px', borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Headline */}
        <Box sx={{ mt: '104px' }}>
          <Typography
            sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'primary.main' }}
          >
            Admin Panel
          </Typography>
          <Typography
            variant="h1"
            sx={{ mt: 1.5, fontSize: '36px !important', fontWeight: 700, lineHeight: 1.2, color: '#FFFFFF' }}
          >
            Manage your business<br />from one place
          </Typography>
          <Box sx={{ mt: 1.5, width: 48, height: 3, borderRadius: 9999, bgcolor: 'primary.main' }} />
          <Typography sx={{ mt: 2, maxWidth: '420px', fontSize: '0.875rem', lineHeight: 1.7, color: '#AAAAAA' }}>
            Access requests, reviews, emails, and Nova Solutions settings in real time.
          </Typography>
        </Box>

        {/* Features */}
        <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {FEATURES.map((feat) => (
            <Box key={feat} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '13px', color: '#FFFFFF' }}>{feat}</Typography>
            </Box>
          ))}
        </Box>

        {/* Stats */}
        <Box sx={{ mt: 8, display: 'flex', gap: '60px' }}>
          {STATS.map((s) => (
            <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography sx={{ fontSize: '28px', fontWeight: 700, color: 'primary.main', lineHeight: 1 }}>
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#888888' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Typography sx={{ mt: 'auto', mb: 5, textAlign: 'center', fontSize: '11px', color: '#555555' }}>
          Powered by Nova Solutions · © 2026
        </Typography>
      </Box>
    </Box>
  );
}
