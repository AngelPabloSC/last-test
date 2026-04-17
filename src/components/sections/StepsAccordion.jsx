import { useState } from 'react';
import { Box, Typography, Collapse, Stack, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { stepsData } from '@/data/stepsData';


function StepNumber({ num, active, theme }) {
  return (
    <Box
      sx={{
        minWidth: 36,
        height: 36,
        borderRadius: '50%',
        bgcolor: active ? theme.palette.primary.main : 'transparent',
        border: `2px solid ${active ? theme.palette.primary.main : theme.palette.text.disabled + '55'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.25s ease',
      }}
    >
      <Typography
        sx={{
          color: active ? theme.palette.primary.contrastText : theme.palette.text.disabled,
          fontSize: 13,
          fontWeight: 800,
          lineHeight: 1,
          transition: 'color 0.25s ease',
        }}
      >
        {num}
      </Typography>
    </Box>
  );
}

// Línea de progreso vertical entre steps
function ProgressConnector({ done, theme }) {
  return (
    <Box
      sx={{
        width: 2,
        height: 12,
        mx: 'auto',
        ml: '17px',          // alineado con el centro del número (36px/2 - 1)
        bgcolor: done ? theme.palette.primary.main : theme.palette.text.disabled + '33',
        transition: 'background-color 0.4s ease',
        borderRadius: 1,
      }}
    />
  );
}

function StepCard({ step, index, isOpen, isCompleted, onToggle, theme, isLast }) {
  const [hovered, setHovered] = useState(false);

  const activeBorder = theme.palette.primary.main;
  const hoverBorder = `${theme.palette.primary.main}66`;
  const idleBorder = `${theme.palette.text.disabled}33`;

  const borderColor = isOpen ? activeBorder : hovered ? hoverBorder : idleBorder;
  const cardBg = isOpen
    ? `${theme.palette.primary.main}12`
    : hovered
    ? `rgba(255,255,255,0.06)`
    : `rgba(255,255,255,0.03)`;

  return (
    <>
      <Box
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        aria-expanded={isOpen}
        aria-label={`Step ${index + 1}: ${step.title}`}
        sx={{
          bgcolor: cardBg,
          borderRadius: '14px',
          border: `1.5px solid ${borderColor}`,
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isOpen
            ? `0 0 0 3px ${theme.palette.primary.main}18`
            : hovered
            ? '0 4px 16px rgba(0,0,0,0.18)'
            : 'none',
          outline: 'none',
          userSelect: 'none',
        }}
      >
        {/* ── Header (always visible) ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 3,
            py: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <StepNumber num={index + 1} active={isOpen || isCompleted} theme={theme} />
            <Typography
              sx={{
                color: isOpen ? theme.palette.text.primary : theme.palette.text.disabled,
                fontSize: { xs: 14, md: 15 },
                fontWeight: isOpen ? 700 : 600,
                transition: 'color 0.2s ease, font-weight 0.2s ease',
              }}
            >
              {step.title}
            </Typography>
          </Box>

          {/* Chevron — rotates 180° when open */}
          <Box
            sx={{
              color: isOpen ? theme.palette.primary.main : theme.palette.text.disabled,
              display: 'flex',
              transition: 'color 0.2s ease, transform 0.3s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>

        {/* ── Collapsible body ── */}
        <Collapse in={isOpen} timeout={300}>
          <Box sx={{ px: 3, pb: '18px', pl: '62px', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {step.items.map((text, j) => (
              <Box key={j} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <CheckCircleIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 15, mt: '3px', flexShrink: 0 }}
                />
                <Typography
                  sx={{ color: theme.palette.text.secondary, fontSize: 13.5, lineHeight: 1.65 }}
                >
                  {text}
                </Typography>
              </Box>
            ))}

            {/* BBB badge — only on step 1 */}
            {index === 0 && (
              <Tooltip title="We are accredited by the Better Business Bureau" placement="right" arrow>
                <Box
                  sx={{
                    mt: 0.5,
                    bgcolor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '20px',
                    px: '12px',
                    py: '5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    width: 'fit-content',
                    cursor: 'help',
                  }}
                >
                  <VerifiedIcon sx={{ color: '#2e7d32', fontSize: 14 }} />
                  <Typography sx={{ color: 'text.primary', fontSize: 11.5, fontWeight: 600 }}>
                    BBB Accredited
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Collapse>
      </Box>

      {!isLast && <ProgressConnector done={isCompleted || isOpen} theme={theme} />}
    </>
  );
}

export default function StepsAccordion() {
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.dark,
        px: { xs: 3, md: '100px' },
        py: { xs: 6, md: '70px' },
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 5, md: '60px' },
          alignItems: 'stretch',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* ── Columna izquierda: acordeón ── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>

          {/* Eyebrow + título */}
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            OUR PROCESS
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: theme.palette.text.primary, fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}
          >
            Steps to a Restored Home
          </Typography>
          <Typography sx={{ color: theme.palette.text.disabled, fontSize: 15, lineHeight: 1.65, mb: 1 }}>
            We make the restoration process simple, transparent, and stress-free —
            here's exactly what to expect.
          </Typography>

          {/* Hint de interacción — discoverability (Don Norman) */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: theme.palette.text.disabled,
              opacity: 0.7,
              mb: 1,
            }}
          >
            <TouchAppIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 12, fontStyle: 'italic' }}>
              Tap each step to learn more
            </Typography>
          </Box>

          {/* Steps */}
          <Box>
            {stepsData.steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                isOpen={openIndex === i}
                isCompleted={i < openIndex}
                isLast={i === stepsData.steps.length - 1}
                onToggle={() => handleToggle(i)}
                theme={theme}
              />
            ))}
          </Box>
        </Box>

        {/* ── Columna derecha: imagen centrada ── */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',   // centra la imagen verticalmente dentro de la columna
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 520,
              height: 480,
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.background.paper}`,
              position: 'relative',
              boxShadow: `0 12px 48px ${theme.palette.background.default}CC`,
            }}
          >
            <Box
              component="img"
              src={stepsData.imageUrl}
              alt="Restored home roof by Nova Solutions"  
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${theme.palette.background.default}CC 0%, transparent 20%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Badge flotante — 100% Satisfaction */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: `${theme.palette.background.default}BB`,
                backdropFilter: 'blur(12px)',
                borderRadius: '40px',
                px: '20px',
                py: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.primary.main}33`,
                whiteSpace: 'nowrap',
              }}
            >
              <CheckCircleIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography sx={{ color: theme.palette.text.primary, fontSize: 13, fontWeight: 600 }}>
                100% Satisfaction Guaranteed
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
