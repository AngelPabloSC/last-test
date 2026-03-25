import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function StarRow({ count = 5, size = 16, color = '#FFD700' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon 
          key={i} 
          sx={{ 
            fontSize: size, 
            color: i < count ? color : 'transparent', 
            stroke: i >= count ? color : 'none', 
            strokeWidth: 1 
          }} 
        />
      ))}
    </Box>
  );
}
