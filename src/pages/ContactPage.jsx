import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ServiceExploreMore from '@/components/sections/service/ServiceExploreMore';
import ServiceTrustCards from '@/components/sections/service/ServiceTrustCards';
import ContactForm from '@/components/forms/ContactForm';


function ContactHero() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'auto', md: 680 },
        overflow: 'hidden',
        bgcolor: '#0D0D0D',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1602193069473-0c78775ec7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1440)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,13,13,0.94) 0%, rgba(13,13,13,0.67) 55%, rgba(13,13,13,0.75) 100%)',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { lg: 'center' },
          gap: { xs: 5, lg: 4 },
          px: { xs: 4, md: 8, lg: 15 },
          py: { xs: 8, md: 10 },
          minHeight: { md: 680 },
        }}
      >
        {/* Left */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
          {/* Badge */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,215,0,0.09)', border: '1px solid rgba(255,215,0,0.27)', borderRadius: 50, px: 2, py: 0.75, width: 'fit-content' }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: gold }} />
            <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4 }}>GET IN TOUCH</Typography>
          </Box>

          {/* Eyebrow */}
          <Typography sx={{ color: '#888', fontSize: 16, fontWeight: 600, letterSpacing: 2 }}>
            One Call Does It All
          </Typography>

          {/* Title */}
          <Box>
            <Typography
              component="h1"
              sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '3rem', md: '4.5rem' }, letterSpacing: '-3px', lineHeight: 0.95 }}
            >
              Contact Us
            </Typography>
            <Box sx={{ width: 56, height: 4, bgcolor: gold, borderRadius: 1, mt: 2 }} />
          </Box>

          {/* Bullets */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[
              'Nova Solutions — Family Owned & Operated',
              'Made in USA — Transferable Lifetime Warranty',
              'BBB Accredited · Trusted Since 2012',
            ].map((text) => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon sx={{ fontSize: 18, color: gold, flexShrink: 0 }} />
                <Typography sx={{ color: '#CCCCCC', fontSize: 15, fontWeight: 500 }}>{text}</Typography>
              </Box>
            ))}
          </Box>

          {/* CTA */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              href="tel:+15185985156"
              sx={{ bgcolor: gold, color: darkText, fontWeight: 800, fontSize: 15, px: 3.5, py: 1.75, borderRadius: '14px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}
            >
              Call Us Now
            </Button>
            <Typography sx={{ color: '#888', fontSize: 14 }}>+1 (518) 598-5156</Typography>
          </Box>
        </Box>

        {/* Right — contact form */}
        <Box
          sx={{ width: { xs: '100%', lg: 460 }, flexShrink: 0, bgcolor: 'rgba(22,22,22,0.93)', border: '1px solid rgba(255,215,0,0.20)', borderRadius: '20px', p: 4 }}
        >
          <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4, textAlign: 'center', mb: 2 }}>
            CONTACT YOUR LOCAL CONTRACTOR
          </Typography>
          <Box sx={{ width: '100%', height: 1, bgcolor: '#2A2A2A', mb: 2 }} />
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
}

const INFO_ITEMS = [
  {
    Icon: PhoneIcon,
    label: 'CALL US',
    value: '+1 (518) 598-5156',
    sub: 'Mon–Fri 8am–6pm · Sat 9am–3pm',
    href: 'tel:+15185985156',
  },
  {
    Icon: MailIcon,
    label: 'EMAIL US',
    value: 'Admin@nova-solutions.us',
    sub: 'We reply within 24 hours',
    href: 'mailto:Admin@nova-solutions.us',
  },
  {
    Icon: PlaceIcon,
    label: 'SERVICE AREA',
    value: 'Capital Region, NY',
    sub: 'Albany · Schenectady · Troy',
    href: null,
  },
];

function InfoBar() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        bgcolor: '#111111',
        borderBottom: '1px solid rgba(255,215,0,0.08)',
        px: { xs: 4, md: '8%' },
        py: { xs: 4, md: 5 },
        gap: 4,
      }}
    >
      {INFO_ITEMS.map(({ Icon, label, value, sub, href }, i) => (
        <Box
          key={label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderLeft: { md: i > 0 ? '1px solid #2A2A2A' : 'none' },
            pl: { md: i > 0 ? 4 : 0 },
          }}
        >
          {/* Icon container */}
          <Box
            sx={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.19)', borderRadius: '12px', flexShrink: 0 }}
          >
            <Icon sx={{ fontSize: 20, color: gold }} />
          </Box>

          {/* Text */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Typography sx={{ color: gold, fontSize: 10, fontWeight: 700, letterSpacing: 3 }}>{label}</Typography>
            {href ? (
              <Typography component="a" href={href} sx={{ color: 'white', fontSize: 16, fontWeight: 800, textDecoration: 'none', '&:hover': { color: gold } }}>
                {value}
              </Typography>
            ) : (
              <Typography sx={{ color: 'white', fontSize: 16, fontWeight: 800 }}>{value}</Typography>
            )}
            <Typography sx={{ color: '#555', fontSize: 12 }}>{sub}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | Nova Solutions – Capital Region';
  }, []);


  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#0D0D0D' }}>
      <ContactHero />
      <InfoBar />
      <ServiceExploreMore />
      <ServiceTrustCards />
    </Box>
  );
}
