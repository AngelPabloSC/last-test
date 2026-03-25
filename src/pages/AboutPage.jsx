import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import TimerIcon from '@mui/icons-material/Timer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ServiceExploreMore from '@/components/sections/service/ServiceExploreMore';
import ContactForm from '@/components/forms/ContactForm';


function AboutHero() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 480, md: 620 },
        overflow: 'hidden',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1675698162291-a70f6416c24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1440)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, #0D0D0DEE 0%, #0D0D0D99 50%, #0D0D0DBB 100%)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 3,
          px: { xs: 4, md: 15 },
          py: { xs: 8, md: 0 },
          height: { md: 620 },
          maxWidth: 820,
        }}
      >
        {/* Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: `${gold}18`, border: '1px solid ${gold}44', borderRadius: 50, px: 2, py: 0.75, width: 'fit-content' }}>
          <ShieldOutlinedIcon sx={{ fontSize: 14, color: gold }} />
          <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4 }}>ABOUT NOVA SOLUTIONS</Typography>
        </Box>

        <Typography component="h1" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 1.05, letterSpacing: '-2px' }}>
          Comprehensive Home<br />Exterior Solutions
        </Typography>

        <Typography sx={{ color: '#888', fontSize: 17, lineHeight: 1.7, maxWidth: 640 }}>
          Nova Solutions specializes in roofing, siding, and gutters, providing reliable service
          and long-lasting solutions for homeowners across Capital Region.
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            href="tel:+15185985156"
            sx={{ bgcolor: gold, color: darkText, fontWeight: 800, fontSize: 15, px: 3.5, py: 1.75, borderRadius: '14px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}
          >
            Get Free Estimate
          </Button>
          <Typography sx={{ color: '#888', fontSize: 14 }}>or call (518) 598-5156</Typography>
        </Box>
      </Box>
    </Box>
  );
}

const STATS = [
  { number: '12+', label: 'Licensed Projects' },
  { number: '100+', label: 'Projects Completed' },
  { number: '70', label: 'Happy Clients' },
  { number: '5+', label: 'Years in Business' },
];

function StatsBar() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
        bgcolor: '#111111',
        borderTop: '1px solid ${gold}15',
        borderBottom: '1px solid ${gold}15',
      }}
    >
      {STATS.map((stat, i) => (
        <Box
          key={stat.label}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            py: { xs: 4, md: 6 },
            borderLeft: i > 0 ? '1px solid #2A2A2A' : 'none',
          }}
        >
          <Typography sx={{ color: gold, fontWeight: 900, fontSize: { xs: '2.4rem', md: '3rem' }, lineHeight: 1, letterSpacing: '-2px' }}>
            {stat.number}
          </Typography>
          <Typography sx={{ color: '#555', fontSize: 13, fontWeight: 500 }}>{stat.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

const CERTS = [
  { Icon: EmojiEventsIcon, title: 'GAF Master Elite', sub: 'Top 3% of contractors' },
  { Icon: VerifiedIcon, title: 'Owens Corning', sub: 'Preferred contractor' },
  { Icon: StarIcon, title: 'BBB Accredited', sub: 'A+ rated business' },
];

function AboutSection() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        gap: { xs: 6, lg: 10 },
        bgcolor: '#0D0D0D',
        px: { xs: 4, md: '8%' },
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Left */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: `${gold}15`, border: '1px solid ${gold}40', borderRadius: 50, px: 2, py: 0.75, width: 'fit-content' }}>
          <ShieldOutlinedIcon sx={{ fontSize: 14, color: gold }} />
          <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4 }}>OUR STORY</Typography>
        </Box>

        <Typography component="h2" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
          About Nova Solutions
        </Typography>

        <Box sx={{ width: 56, height: 4, bgcolor: gold, borderRadius: 1 }} />

        <Typography sx={{ color: '#777', fontSize: 15, lineHeight: 1.8 }}>
          Nova Solutions is a roofing, siding and exterior solutions firm. We&apos;ve been helping
          homeowners with roof repairs, roof replacements, siding installation, roof gutter systems,
          and siding replacements. Our projects are completed with craftsmanship quality that
          you&apos;d expect from industry specialists.
        </Typography>
        <Typography sx={{ color: '#777', fontSize: 15, lineHeight: 1.8 }}>
          We&apos;ve been serving the Capital Region for over 5+ years. Nova Solutions is locally
          based in the Capital Region providing area residents with trusted, professional general
          contracting service and installation.
        </Typography>

        {/* Cert badges */}
        <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', pt: 2 }}>
          {CERTS.map(({ Icon, title, sub }) => (
            <Box
              key={title}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2.5, bgcolor: '#161616', border: '1px solid ${gold}30', borderRadius: '12px', minWidth: 140 }}
            >
              <Icon sx={{ fontSize: 28, color: gold }} />
              <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 700 }}>{title}</Typography>
              <Typography sx={{ color: '#777', fontSize: 11 }}>{sub}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right image */}
      <Box sx={{ position: 'relative', width: { xs: '100%', lg: 520 }, height: { xs: 300, lg: 520 }, borderRadius: '20px', overflow: 'hidden', flexShrink: 0 }}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1761689502577-0013be84f1bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="Nova Solutions team"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #11111166 100%)' }} />
        {/* Years badge */}
        <Box sx={{ position: 'absolute', top: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 0.5, bgcolor: gold, borderRadius: '14px', px: 2.5, py: 1.75 }}>
          <Typography sx={{ color: darkText, fontWeight: 900, fontSize: '1.75rem', lineHeight: 1, letterSpacing: '-1px' }}>5+</Typography>
          <Typography sx={{ color: darkText, fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>Years of<br />Experience</Typography>
        </Box>
      </Box>
    </Box>
  );
}

function QuoteSection() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        bgcolor: '#111111',
        px: { xs: 4, md: '15%' },
        py: { xs: 6, md: 10 },
      }}
    >
      <FormatQuoteIcon sx={{ fontSize: 48, color: '${gold}33' }} />
      <Typography
        component="h2"
        sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.4rem' }, textAlign: 'center', lineHeight: 1.2, letterSpacing: '-1px' }}
      >
        Protecting Your Home, One Roof at a Time.
      </Typography>
      <Typography sx={{ color: gold, fontSize: 14, fontWeight: 600 }}>
        — Nova Solutions, Capital Region
      </Typography>
    </Box>
  );
}

const INFO_CARDS = [
  {
    Icon: PlaceIcon,
    title: 'Our Location',
    content: 'Capital Region, New York\nAlbany · Schenectady · Troy\nand surrounding areas',
  },
  {
    Icon: PhoneIcon,
    title: 'Call Us',
    phone: '(518) 598-5156',
    sub: 'Mon–Fri 8am–6pm · Sat 9am–3pm',
  },
  {
    Icon: TimerIcon,
    title: 'Response Time',
    content: 'Same-day estimates available.\nEmergency repairs within 24hrs.',
  },
];

function MapSection() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        bgcolor: '#111111',
        px: { xs: 4, md: '8%' },
        py: { xs: 8, md: 10 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ color: gold, fontSize: 12, fontWeight: 700, letterSpacing: 5 }}>WHERE TO FIND US</Typography>
        <Typography component="h2" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.2rem' }, textAlign: 'center', letterSpacing: '-0.8px' }}>
          Serving the Capital Region
        </Typography>
        <Box sx={{ width: 56, height: 4, bgcolor: gold, borderRadius: 1 }} />
        <Typography sx={{ color: '#666', fontSize: 15, lineHeight: 1.7, textAlign: 'center', maxWidth: 640 }}>
          Based in the Capital Region, NY — we serve Albany, Schenectady, Troy, and surrounding areas.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, height: { md: 420 } }}>
        {/* Map embed */}
        <Box sx={{ flex: 1, borderRadius: '20px', overflow: 'hidden', border: '1px solid ${gold}22', minHeight: { xs: 240, md: 'auto' } }}>
          <Box
            component="iframe"
            title="Nova Solutions Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186371.53098856898!2d-74.06456168390283!3d42.65261218555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89de0a34cc4ffbe7%3A0xaucune!2sAlbany%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000"
            sx={{ width: '100%', height: '100%', border: 0, display: 'block', minHeight: { xs: 240, md: 'auto' } }}
            allowFullScreen
            loading="lazy"
          />
        </Box>

        {/* Info cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: { md: 320 }, flexShrink: 0 }}>
          {INFO_CARDS.map(({ Icon, title, content, phone, sub }) => (
            <Box
              key={title}
              sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, p: 3, bgcolor: '#161616', border: '1px solid ${gold}22', borderRadius: '16px' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Icon sx={{ fontSize: 22, color: gold }} />
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{title}</Typography>
              </Box>
              {phone ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ color: gold, fontSize: 16, fontWeight: 700 }}>{phone}</Typography>
                  <Typography sx={{ color: '#666', fontSize: 12 }}>{sub}</Typography>
                </Box>
              ) : (
                <Typography sx={{ color: '#666', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {content}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function ContactSection() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: { lg: 'center' },
        gap: { xs: 6, lg: 10 },
        bgcolor: '#0D0D0D',
        px: { xs: 4, md: '8%' },
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Left */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: `${gold}15`, border: '1px solid ${gold}40', borderRadius: 50, px: 2, py: 0.75, width: 'fit-content' }}>
          <PhoneIcon sx={{ fontSize: 14, color: gold }} />
          <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4 }}>GET IN TOUCH</Typography>
        </Box>

        <Typography component="h2" sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
          Let&apos;s Start Your Next Project
        </Typography>

        <Box sx={{ width: 56, height: 4, bgcolor: gold, borderRadius: 1 }} />

        <Typography sx={{ color: '#777', fontSize: 15, lineHeight: 1.8 }}>
          At Nova Solutions, we&apos;re excited to help. Whether you&apos;re interested in a new roof,
          new siding, or gutter installation, we&apos;d be happy to help answer any questions you may have.
        </Typography>

        <Typography sx={{ color: gold, fontSize: 14, fontWeight: 600 }}>
          Inspired by your vision, driven by results.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            href="tel:+15185985156"
            sx={{ bgcolor: gold, color: darkText, fontWeight: 800, fontSize: 15, px: 3.5, py: 1.75, borderRadius: '14px', textTransform: 'none', '&:hover': { bgcolor: '#E6C200' } }}
          >
            Get Free Estimate
          </Button>
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            href="tel:+15185985156"
            sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, fontSize: 15, px: 3.5, py: 1.75, borderRadius: '14px', textTransform: 'none', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.25)' } }}
          >
            (518) 598-5156
          </Button>
        </Box>
      </Box>

      {/* Form */}
      <Box
        sx={{ width: { xs: '100%', lg: 420 }, flexShrink: 0, bgcolor: '#161616EE', border: '1px solid ${gold}33', borderRadius: '20px', p: 4 }}
      >
        <Typography sx={{ color: gold, fontSize: 11, fontWeight: 800, letterSpacing: 4, textAlign: 'center', mb: 2 }}>
          CONTACT YOUR LOCAL CONTRACTOR
        </Typography>
        <Box sx={{ width: '100%', height: 1, bgcolor: '#2A2A2A', mb: 2 }} />
        <ContactForm />
      </Box>
    </Box>
  );
}

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Nova Solutions | Capital Region Roofing & Siding';
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#0D0D0D' }}>
      <AboutHero />
      <StatsBar />
      <AboutSection />
      <QuoteSection />
      <ServiceExploreMore />
      <MapSection />
      <ContactSection />
    </Box>
  );
}
