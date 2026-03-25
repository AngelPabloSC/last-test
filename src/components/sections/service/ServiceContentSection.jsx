import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const BG_ALT = '#0D0D0D';
const BG_MAIN = '#111111';

export default function ServiceContentSection({ heading, body, image, imagePos = 1, bullets, index = 0 }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const bgColor = index % 2 === 0 ? BG_MAIN : BG_ALT;
  const imageRight = imagePos === 1;

  const textBlock = (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box sx={{ width: 48, height: 3, borderRadius: 2, bgcolor: gold }} />
      <Typography
        component="h2"
        sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.2, letterSpacing: '-0.5px' }}
      >
        {heading}
      </Typography>
      {body && (
        <Typography sx={{ color: '#777777', fontSize: 15, lineHeight: 1.8 }}>{body}</Typography>
      )}
      {bullets && bullets.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
          {bullets.map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box sx={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: `${gold}15`, borderRadius: '8px', mt: 0.1 }}>
                <CheckIcon sx={{ fontSize: 16, color: gold }} />
              </Box>
              <Typography sx={{ color: '#BBBBBB', fontSize: 15, lineHeight: 1.6 }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );

  const imageBlock = (
    <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: 540 }, borderRadius: '20px', overflow: 'hidden', flexShrink: 0 }}>
      <Box
        component="img"
        src={image}
        alt={heading}
        sx={{ width: '100%', height: { xs: 260, md: 420 }, objectFit: 'cover', display: 'block' }}
      />
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{ width: '100%', bgcolor: bgColor, px: { xs: 3, md: '8%' }, py: { xs: 7, md: 10 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 5, md: 8 } }}
    >
      {imageRight ? textBlock : imageBlock}
      {imageRight ? imageBlock : textBlock}
    </Box>
  );
}
