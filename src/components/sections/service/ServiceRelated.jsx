import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoofingIcon from '@mui/icons-material/Roofing';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function RelatedIcon({ title, color }) {
  const t = title.toLowerCase();
  const sx = { fontSize: 28, color };
  if (t.includes('siding')) return <HouseSidingIcon sx={sx} />;
  if (t.includes('gutter') || t.includes('leaf')) return <WaterDropIcon sx={sx} />;
  if (t.includes('repair') || t.includes('damage') || t.includes('leak') || t.includes('inspection') || t.includes('storm') || t.includes('hail'))
    return <HomeRepairServiceIcon sx={sx} />;
  return <RoofingIcon sx={sx} />;
}

export default function ServiceRelated({ related = [], category = 'SERVICES' }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  return (
    <Box
      component="section"
      sx={{ width: '100%', bgcolor: '#0D0D0D', px: { xs: 3, md: '8%' }, py: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: 5 }}>
          {category.toUpperCase()}
        </Typography>
        <Typography
          component="h2"
          sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.2rem' }, textAlign: 'center', letterSpacing: '-0.5px' }}
        >
          Related Services
        </Typography>
        <Box sx={{ width: 56, height: 3, borderRadius: 2, bgcolor: gold }} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', lg: `repeat(${related.length}, 1fr)` },
          gap: 2,
        }}
      >
        {related.map(({ title, path, desc }) => (
          <Box
            key={title}
            component={RouterLink}
            to={path}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              p: 3,
              bgcolor: '#161616',
              border: `1px solid ${gold}22`,
              borderRadius: '16px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background-color 0.2s',
              '&:hover': { borderColor: `${gold}55`, bgcolor: '#1A1A1A' },
            }}
          >
            <RelatedIcon title={title} color={gold} />
            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>{title}</Typography>
            <Typography sx={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{desc}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
              <Typography sx={{ color: gold, fontSize: 13, fontWeight: 600 }}>Learn more</Typography>
              <ChevronRightIcon sx={{ fontSize: 14, color: gold }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
