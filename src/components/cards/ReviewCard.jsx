import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import StarRow from '@/components/common/StarRow';

export default function ReviewCard({ review }) {
  const isFeatured = review.featured;
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: '20px',
        p: { xs: 3, md: 4 },
        bgcolor: isFeatured ? '#1E1A0F' : '#1A1A1A',
        border: isFeatured ? `1px solid ${gold}` : 'none',
        borderLeft: !isFeatured ? `3px solid ${gold}` : undefined,
      }}
    >
      {isFeatured && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ borderRadius: 999, bgcolor: `${gold}20`, px: 1.5, py: 0.5, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: gold }}>
            ⭐ Featured Review
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontWeight: 700, color: 'white' }}>{review.name}</Typography>
          <Typography sx={{ fontSize: 12, color: '#666' }}>{review.location}</Typography>
        </Box>
        <Typography sx={{ borderRadius: 999, bgcolor: `${gold}15`, px: 1.25, py: 0.5, fontSize: 11, fontWeight: 600, color: gold }}>
          {review.service}
        </Typography>
      </Box>
      <StarRow count={review.rating} />
      <Typography sx={{ flex: 1, fontSize: 14, lineHeight: 1.7, color: '#AAAAAA' }}>
        {review.text}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #2A2A2A', pt: 2, mt: 1 }}>
        <Typography sx={{ fontSize: 12, color: '#555' }}>{review.date}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ThumbUpOutlinedIcon sx={{ fontSize: 14, color: gold }} />
          <Typography sx={{ fontSize: 12, color: '#888' }}>Helpful</Typography>
        </Box>
      </Box>
    </Box>
  );
}
