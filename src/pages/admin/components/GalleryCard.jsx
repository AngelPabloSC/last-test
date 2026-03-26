import React from 'react';
import { Box, Typography, IconButton, useTheme, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function GalleryCard({ item, onEdit, onDelete, onToggleVisibility }) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        aspectRatio: '16/10',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
          '& .gallery-actions': { opacity: 1 }
        }
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={item.img}
        alt={item.name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: item.visible ? 'none' : 'grayscale(100%) opacity(0.6)'
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 800,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '1.5px'
          }}
        >
          {item.category}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.2
          }}
        >
          {item.name}
        </Typography>
      </Box>

      {/* Top badges/actions */}
      <Box
        className="gallery-actions"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 1,
          opacity: 0,
          transition: 'opacity 0.2s'
        }}
      >
        <Tooltip title={item.visible ? "Hide from public" : "Show on public site"}>
          <IconButton
            size="small"
            onClick={() => onToggleVisibility?.(item)}
            sx={{
              bgcolor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              '&:hover': { bgcolor: 'primary.main' }
            }}
          >
            {item.visible ? <VisibilityOutlinedIcon fontSize="small" /> : <VisibilityOffOutlinedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Edit Details">
          <IconButton
            size="small"
            onClick={() => onEdit?.(item)}
            sx={{
              bgcolor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              '&:hover': { bgcolor: 'primary.main' }
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Image">
          <IconButton
            size="small"
            onClick={() => onDelete?.(item)}
            sx={{
              bgcolor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              color: 'error.main',
              '&:hover': { bgcolor: 'error.main', color: 'white' }
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {!item.visible && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: 'error.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase'
          }}
        >
          HIDDEN
        </Box>
      )}
    </Box>
  );
}
