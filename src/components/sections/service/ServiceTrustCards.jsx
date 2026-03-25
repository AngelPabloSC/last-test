import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShieldIcon from '@mui/icons-material/Shield';

const TRUST_CARDS = [
  {
    Icon: PeopleIcon,
    title: 'Locally Owned',
    desc: 'Our team is carefully screened, expertly trained local professionals who understand the specific requirements of Capital Region roofing systems.',
  },
  {
    Icon: VerifiedIcon,
    title: 'Industry Certified',
    desc: "As a GAF Master Elite Roofing & Owens Corning Preferred Vendor — certified by the industry's most reputable manufacturers.",
  },
  {
    Icon: ThumbUpIcon,
    title: 'Customer Driven',
    desc: 'Our #1 priority is to provide a world-class experience that leaves all our customers completely renewed! Check out our reviews.',
  },
  {
    Icon: ShieldIcon,
    title: 'Satisfaction Guaranteed',
    desc: "We've got your back with unlimited lifetime transferable warranty from industry leading brands. Ask us about your home improvement warranty!",
  },
];

export default function ServiceTrustCards() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  return (
    <Box
      component="section"
      sx={{ width: '100%', bgcolor: '#111111', px: { xs: 3, md: '8%' }, py: { xs: 7, md: 10 }, display: 'flex', flexDirection: 'column', gap: 6 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: 5 }}>WHY CHOOSE US</Typography>
        <Typography
          component="h2"
          sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, textAlign: 'center', letterSpacing: '-0.8px' }}
        >
          Built on Trust, Backed by Proof
        </Typography>
        <Box sx={{ width: 56, height: 3, borderRadius: 2, bgcolor: gold }} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2.5 }}>
        {TRUST_CARDS.map(({ Icon, title, desc }) => (
          <Box
            key={title}
            sx={{ display: 'flex', overflow: 'hidden', borderRadius: '16px', bgcolor: '#161616', border: '1px solid #1F1F1F' }}
          >
            <Box sx={{ width: 3, bgcolor: gold, flexShrink: 0 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 3, pl: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon sx={{ fontSize: 22, color: gold }} />
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{title}</Typography>
              </Box>
              <Typography sx={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{desc}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
