import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ReviewStarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 18, 
  color = '#D4AF37', 
  emptyColor = 'rgba(212, 175, 55, 0.2)' 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starIndex = i + 1;
        if (starIndex <= fullStars) {
          return <StarIcon key={i} sx={{ fontSize: size, color }} />;
        } else if (starIndex === fullStars + 1 && hasHalfStar) {
          return <StarHalfIcon key={i} sx={{ fontSize: size, color }} />;
        } else {
          return <StarBorderIcon key={i} sx={{ fontSize: size, color: emptyColor }} />;
        }
      })}
    </Box>
  );
}

export default ReviewStarRating;
