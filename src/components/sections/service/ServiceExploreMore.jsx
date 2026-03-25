import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const EXPLORE_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1764393188367-d5dc0a4f7265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    title: 'Roof Repair',
    desc: 'Roof repairs are often necessary to maintain the structural integrity of your home.',
    path: '/Roofing-Repair',
  },
  {
    img: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747070060/20240522_161015_ftpq6k.jpg',
    title: 'Siding',
    desc: 'Siding installation and repair services across Capital Region — vinyl, fiber cement, and more.',
    path: '/Siding',
  },
  {
    img: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747070702/Parts_of_a_gutter_filwvb.png',
    title: 'Gutters',
    desc: 'Say goodbye to clogged gutters — seamless installation with our Gutter Cap system.',
    path: '/Gutters',
  },
  {
    img: 'https://images.unsplash.com/photo-1763401929055-43fd29000be3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    title: 'Roofing',
    desc: 'Expert roof replacement and installation using GAF certified premium materials.',
    path: '/Roofing',
  },
];

export default function ServiceExploreMore() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  return (
    <Box
      component="section"
      sx={{ width: '100%', bgcolor: '#111111', px: { xs: 3, md: '8%' }, py: { xs: 6, md: 8 }, display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: 5 }}>
          EXPLORE MORE
        </Typography>
        <Typography
          component="h2"
          sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.2rem' }, textAlign: 'center', letterSpacing: '-0.5px' }}
        >
          Our Other Services
        </Typography>
      </Box>

      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}
      >
        {EXPLORE_CARDS.map(({ img, title, desc, path }) => (
          <Box
            key={title}
            component={RouterLink}
            to={path}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '20px',
              bgcolor: '#161616',
              border: '1px solid #1F1F1F',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
              '&:hover': { borderColor: `${gold}33`, transform: 'translateY(-3px)' },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={title}
              sx={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 17 }}>{title}</Typography>
              <Typography sx={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{desc}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <Typography sx={{ color: gold, fontSize: 13, fontWeight: 600 }}>Learn More</Typography>
                <ChevronRightIcon sx={{ fontSize: 14, color: gold }} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
