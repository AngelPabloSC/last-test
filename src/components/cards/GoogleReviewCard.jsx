import { Box, Typography } from '@mui/material';
import StarRow from '@/components/common/StarRow';

export default function GoogleReviewCard({ review }) {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '16px', borderLeft: `3px solid ${review.avatarColor}`, bgcolor: '#1A1A1A', p: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', bgcolor: review.avatarColor }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{review.initial}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{review.name}</Typography>
            <Typography sx={{ fontSize: 11, color: '#666' }}>{review.date}</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 900, color: '#4285F4' }}>G</Typography>
      </Box>
      <StarRow count={review.rating} size={14} color="#FBBC05" />
      <Typography sx={{ flex: 1, fontSize: 13, lineHeight: 1.7, color: '#BBBBBB' }}>{review.text}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #2A2A2A', pt: 2, mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 900, color: '#4285F4' }}>G</Typography>
          <Typography sx={{ fontSize: 11, color: '#666' }}>Posted on Google</Typography>
        </Box>
        <Typography sx={{ borderRadius: 999, bgcolor: '#34A85320', px: 1.25, py: 0.5, fontSize: 10, fontWeight: 600, color: '#34A853' }}>
          ✓ Verified
        </Typography>
      </Box>
    </Box>
  );
}
