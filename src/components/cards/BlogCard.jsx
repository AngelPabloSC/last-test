import { memo } from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForward from '@mui/icons-material/ArrowForward';

const BlogCard = memo(function BlogCard({ post, featured = false }) {
  const { id, title, description, photo, author, date, createdAt } = post;
  
  const displayDate = date || new Date(createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  if (featured) {
    return (
      <Card sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        mb: 6,
        gap: { xs: 2, md: 4 },
        '&:hover img': { transform: 'scale(1.02)' }
      }}>
        <Box sx={{ flex: { xs: 'none', md: '1.2' }, position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
          <Link to={`/blog/${id}`}>
            <CardMedia
              component="img"
              height="100%"
              image={photo || 'https://via.placeholder.com/800x450?text=Nova+Solutions'}
              alt={title}
              loading="lazy"
              sx={{
                minHeight: { xs: 250, md: 450 },
                transition: 'transform 0.4s ease',
                objectFit: 'cover'
              }}
            />
          </Link>
        </Box>
        
        <CardContent sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          p: { xs: 1, md: 2 }
        }}>
          <Typography sx={{ color: 'primary.main', fontWeight: 600, fontSize: 13, mb: 2, textTransform: 'uppercase' }}>
            Featured Article
          </Typography>
          <Typography 
            variant="h3" 
            component={Link}
            to={`/blog/${id}`}
            sx={{ 
              color: 'white', 
              fontWeight: 800, 
              fontSize: { xs: 28, md: 42 }, 
              mb: 2, 
              lineHeight: 1.2,
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, mb: 4, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
             <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black' }}>
                {author?.[0] || 'N'}
             </Box>
             <Box>
                <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 14 }}>{author || 'Nova Team'}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{displayDate}</Typography>
             </Box>
          </Box>

          <Typography 
            component={Link} 
            to={`/blog/${id}`}
            sx={{ 
              color: 'primary.main', 
              fontWeight: 700, 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              '&:hover': { gap: 1.5, transition: 'all 0.2s' }
            }}
          >
            Read more <ArrowForward sx={{ fontSize: 18 }} />
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      height: '100%',
      bgcolor: 'transparent',
      boxShadow: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      '&:hover img': { transform: 'scale(1.05)' }
    }}>
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', mb: 2.5 }}>
        <Link to={`/blog/${id}`}>
          <CardMedia
            component="img"
            height="240"
            image={photo || 'https://via.placeholder.com/400x250?text=Nova+Solutions'}
            alt={title}
            loading="lazy"
            sx={{ transition: 'transform 0.4s ease', objectFit: 'cover' }}
          />
        </Link>
      </Box>

      <CardContent sx={{ p: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          component={Link}
          to={`/blog/${id}`}
          sx={{ 
            color: 'white', 
            fontWeight: 700, 
            fontSize: 20, 
            mb: 1.5, 
            lineHeight: 1.4,
            textDecoration: 'none',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
           <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{author || 'Nova Team'}</Typography>
           <Box sx={{ width: 4, height: 4, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
           <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{displayDate}</Typography>
        </Box>

        <Typography 
          component={Link} 
          to={`/blog/${id}`}
          sx={{ 
            color: 'primary.main', 
            fontWeight: 700, 
            textDecoration: 'none', 
            mt: 'auto',
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: 14,
            '&:hover': { gap: 1.5, transition: 'all 0.2s' }
          }}
        >
          Read more <ArrowForward sx={{ fontSize: 16 }} />
        </Typography>
      </CardContent>
    </Card>
  );
});

export default BlogCard;
