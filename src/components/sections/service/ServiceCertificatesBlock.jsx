import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const CERTS = [
  { Icon: EmojiEventsIcon, title: 'GAF Master Elite', sub: 'Top 3% of contractors' },
  { Icon: VerifiedIcon, title: 'Owens Corning', sub: 'Preferred contractor' },
  { Icon: StarIcon, title: 'BBB Accredited', sub: 'A+ rated business' },
];

export default function ServiceCertificatesBlock() {
  const theme = useTheme();
  // using theme.palette.primary.main with fallback in case it varies
  const gold = theme.palette?.primary?.main || '#F2B90F';

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3.5, flexShrink: 0, width: '100%', maxWidth: { xs: '100%', md: 400 }, mx: 'auto' }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, textAlign: 'center', mb: 1, letterSpacing: '-0.5px' }}>
        Certificates
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {CERTS.map(({ Icon, title, sub }, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
              bgcolor: '#161616',
              p: 2.5,
              borderRadius: 3,
              border: '1px solid #222',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                borderColor: gold,
                boxShadow: `0 8px 24px ${gold}15`
              }
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                bgcolor: `${gold}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${gold}30`
              }}
            >
              <Icon sx={{ color: gold, fontSize: 28 }} />
            </Box>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', mb: 0.3 }}>
                {title}
              </Typography>
              <Typography sx={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.4 }}>
                {sub}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
