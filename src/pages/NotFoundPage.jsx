import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RAIN = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left:     `${(i * 4.7) % 100}%`,
  delay:    `${(i * 0.13) % 2}s`,
  duration: `${0.55 + (i * 0.07) % 0.9}s`,
  height:   `${10 + (i * 7) % 22}px`,
  opacity:  0.25 + (i * 0.03) % 0.45,
}));

const SHINGLES = [
  { x: 148, y: 58,  r: -18, w: 22, h: 9  },
  { x: 164, y: 78,  r:  12, w: 18, h: 8  },
  { x: 175, y: 96,  r:  -7, w: 16, h: 7  },
  { x: 185, y: 112, r:  22, w: 14, h: 6  },
];

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '82vh',
        background: 'linear-gradient(180deg, #080808 0%, #0f0f0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        px: 2,
        py: 8,
      }}
    >
      {/* ── Rain drops ─────────────────────────────────── */}
      {RAIN.map((drop) => (
        <Box
          key={drop.id}
          sx={{
            position: 'absolute',
            top: '-30px',
            left: drop.left,
            width: '1.5px',
            height: drop.height,
            background: 'linear-gradient(to bottom, transparent, #41D4ff)',
            borderRadius: '2px',
            opacity: drop.opacity,
            animation: `rain ${drop.duration} linear ${drop.delay} infinite`,
            '@keyframes rain': {
              '0%':   { transform: 'translateY(-30px)', opacity: 0 },
              '15%':  { opacity: drop.opacity },
              '85%':  { opacity: drop.opacity },
              '100%': { transform: 'translateY(105vh)', opacity: 0 },
            },
          }}
        />
      ))}

      {/* ── Broken roof SVG ────────────────────────────── */}
      <Box
        sx={{
          mb: 1,
          animation: 'float 4s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%':      { transform: 'translateY(-12px)' },
          },
        }}
      >
        <svg
          width="260"
          height="160"
          viewBox="0 0 260 160"
          fill="none"
          aria-label="Broken house illustration"
        >
          {/* House body */}
          <rect x="30" y="90" width="200" height="70" rx="2" fill="#161616" stroke="#2a2a2a" strokeWidth="1.5" />

          {/* Door */}
          <rect x="105" y="112" width="50" height="48" rx="3" fill="#0e0e0e" stroke="#333" strokeWidth="1.5" />
          <circle cx="148" cy="137" r="3" fill="#FFEC00" opacity="0.6" />

          {/* Windows */}
          <rect x="42"  y="100" width="38" height="28" rx="3" fill="#0e0e0e" stroke="#333" strokeWidth="1.5" />
          <line x1="61" y1="100" x2="61" y2="128" stroke="#333" strokeWidth="1" />
          <line x1="42" y1="114" x2="80" y2="114" stroke="#333" strokeWidth="1" />

          <rect x="180" y="100" width="38" height="28" rx="3" fill="#0e0e0e" stroke="#333" strokeWidth="1.5" />
          <line x1="199" y1="100" x2="199" y2="128" stroke="#333" strokeWidth="1" />
          <line x1="180" y1="114" x2="218" y2="114" stroke="#333" strokeWidth="1" />

          {/* Roof — left intact */}
          <polygon points="30,90 130,18 130,90" fill="#1c1c1c" stroke="#2e2e2e" strokeWidth="1.5" />

          {/* Roof — right with hole */}
          <polygon points="130,18 230,90 175,90" fill="#1c1c1c" stroke="#2e2e2e" strokeWidth="1.5" />

          {/* Broken/missing section — jagged edge in yellow */}
          <polyline
            points="152,54 163,46 170,58 180,42 192,60 200,48"
            stroke="#FFEC00"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glow on broken edge */}
          <polyline
            points="152,54 163,46 170,58 180,42 192,60 200,48"
            stroke="#FFEC00"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
          />

          {/* Ridge cap */}
          <line x1="30" y1="90" x2="130" y2="90" stroke="#252525" strokeWidth="2" />

          {/* Rain streaks on intact roof */}
          {[48, 68, 88, 106].map((x, i) => (
            <line
              key={i}
              x1={x} y1={55 + i * 4}
              x2={x + 2} y2={70 + i * 4}
              stroke="#41D4ff"
              strokeWidth="1.2"
              opacity="0.45"
            />
          ))}

          {/* Falling shingles */}
          {SHINGLES.map((s, i) => (
            <rect
              key={i}
              x={s.x} y={s.y}
              width={s.w} height={s.h}
              rx="1.5"
              fill="#232323"
              stroke="#3a3a3a"
              strokeWidth="1"
              transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}
            />
          ))}

          {/* Chimney */}
          <rect x="76" y="30" width="20" height="35" rx="1" fill="#181818" stroke="#2a2a2a" strokeWidth="1.5" />
          <rect x="72" y="28" width="28" height="6" rx="1" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1" />
        </svg>
      </Box>

      {/* ── 404 ────────────────────────────────────────── */}
      <Typography
        component="h1"
        sx={{
          fontFamily: "'Azonix', sans-serif",
          fontSize: 'clamp(5.5rem, 20vw, 12rem)',
          fontWeight: 'normal',
          color: '#FFEC00',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          textShadow: '0 0 80px rgba(255,236,0,0.25), 0 0 20px rgba(255,236,0,0.15)',
          mb: 2,
          animation: 'fadeUp 0.7s ease-out forwards',
          '@keyframes fadeUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to:   { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        404
      </Typography>

      {/* ── Tagline ─────────────────────────────────────── */}
      <Typography
        variant="h4"
        sx={{
          color: '#ffffff',
          fontWeight: 700,
          textAlign: 'center',
          mb: 1.5,
          animation: 'fadeUp 0.7s ease-out 0.1s both',
        }}
      >
        This page needs some repair
      </Typography>

      {/* ── Description ─────────────────────────────────── */}
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255,255,255,0.45)',
          textAlign: 'center',
          maxWidth: 420,
          mb: 5,
          animation: 'fadeUp 0.7s ease-out 0.2s both',
        }}
      >
        Looks like this page is missing or has been moved. Let us get you back on solid ground.
      </Typography>

      {/* ── CTA ─────────────────────────────────────────── */}
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        size="large"
        sx={{
          bgcolor: '#FFEC00',
          color: '#000000',
          fontWeight: 700,
          px: 5,
          py: 1.75,
          borderRadius: 1,
          fontSize: '1rem',
          letterSpacing: '0.02em',
          boxShadow: '0 0 30px rgba(255,236,0,0.2)',
          animation: 'fadeUp 0.7s ease-out 0.3s both',
          '&:hover': {
            bgcolor: '#E5D400',
            transform: 'translateY(-3px)',
            boxShadow: '0 0 40px rgba(255,236,0,0.35)',
          },
          transition: 'all 0.25s ease',
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
