import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProjectCard({ id, name, category, img, className = '', height = '100%' }) {
  const theme = useTheme();
  
  return (
    <Box
      component={Link}
      to={id ? `/Gallery/${id}` : '#'}
      className={className}
      sx={{
        display: 'block',
        textDecoration: 'none',
        position: 'relative',
        height: height,
        width: '100%',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          '& .card-img': { transform: 'scale(1.05)' },
          '& .card-overlay': { bgcolor: 'rgba(0,0,0,0.5)' }
        },
      }}
    >
      {/* Background Image */}
      <Box
        className="card-img"
        component="img"
        src={img}
        alt={name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Modern Bottom Label Bar */}
      <Box
        className="card-overlay"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          p: { xs: 1.5, md: 2 },
          borderTop: '1px solid rgba(255,255,255,0.1)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: 14, md: 16 },
            mb: 0.2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {category}
        </Typography>
      </Box>

      {/* Subtle Interactive Border on Hover */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          border: '0px solid transparent',
          transition: 'border 0.2s ease',
          '&:hover': {
            border: `2px solid ${theme.palette.primary.main}`,
            zIndex: 2
          }
        }}
      />
    </Box>
  );
}
