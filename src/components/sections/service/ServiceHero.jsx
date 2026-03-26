import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HardhatIcon from '@mui/icons-material/Construction';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactForm from '@/components/forms/ContactForm';

export default function ServiceHero({ hero }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  const { image, breadcrumb = [], badgeText = '', headline = '' } = hero;
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const paths = ['/', ...segments.map((_, i) => '/' + segments.slice(0, i + 1).join('/'))];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'auto', md: 680 },
        overflow: 'hidden',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #0D0D0DEE 0%, #0D0D0D88 60%, #0D0D0DAA 100%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'flex-start', lg: 'center' },
          gap: { xs: 5, lg: 4 },
          px: { xs: 3, md: 8, lg: 15 },
          py: { xs: 6, md: 10 },
          minHeight: { md: 680 },
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.8 }}>
            {breadcrumb.map((crumb, i) => {
              const isLast = i === breadcrumb.length - 1;
              const crumbPath = paths[i] ?? '/';
              return (
                <Box key={`${crumb}-${i}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  {i > 0 && <ChevronRightIcon sx={{ fontSize: 14, color: '#444' }} />}
                  {isLast ? (
                    <Typography sx={{ fontSize: 13, color: gold, fontWeight: 600 }}>{crumb}</Typography>
                  ) : (
                    <Typography
                      component={RouterLink}
                      to={crumbPath}
                      sx={{ fontSize: 13, color: '#888', fontWeight: 400, textDecoration: 'none', '&:hover': { color: '#ccc', textDecoration: 'underline' }, transition: 'color 0.2s' }}
                    >
                      {crumb}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: `${gold}18`, border: `1px solid ${gold}44`, borderRadius: 50, px: 2, py: 0.75, width: 'fit-content' }}
          >
            <HardhatIcon sx={{ fontSize: 14, color: gold }} />
            <Typography sx={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{badgeText}</Typography>
          </Box>

          <Typography
            component="h1"
            sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2rem', md: '3rem', lg: '3.6rem' }, lineHeight: 1.05, letterSpacing: '-1.5px' }}
          >
            {headline}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[
              'Nova Solutions — Family Owned & Operated',
              'Transferable Lifetime Warranty',
              'Made in USA · GAF Master Elite Certified',
              'BBB Accredited · Trusted Since 2012',
            ].map((item) => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: gold, flexShrink: 0 }} />
                <Typography sx={{ color: '#CCCCCC', fontSize: 15, fontWeight: 500 }}>{item}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              href="tel:+15185985156"
              sx={{ bgcolor: gold, color: darkText, fontWeight: 800, fontSize: 15, px: 3.5, py: 1.75, borderRadius: '14px', textTransform: 'none', '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              Schedule Free Inspection
            </Button>
            <Typography sx={{ color: '#888', fontSize: 14 }}>or call (518) 598-5156</Typography>
          </Box>
        </Box>

     
      </Box>
    </Box>
  );
}
