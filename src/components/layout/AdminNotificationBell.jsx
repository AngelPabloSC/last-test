import React, { useState } from 'react';
import { 
  Box, IconButton, Badge, Tooltip, useTheme, Menu, MenuItem, 
  Typography, Divider, Button, Tabs, Tab 
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { useNotifications } from '@/context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function AdminNotificationBell() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { 
    newCount, 
    pendingReviewsCount, 
    totalNotifications,
    newRequests, 
    pendingReviews,
    openRequestDetail,
    openReviewDetail
  } = useNotifications();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleViewAll = () => {
    handleClose();
    if (activeTab === 0) {
      navigate('/admin/requests', { state: { filter: 'new' } });
    } else {
      navigate('/admin/reviews', { state: { filter: 'pending' } });
    }
  };

  const handleSelectRequest = (req) => {
    handleClose();
    openRequestDetail(req);
  };

  const handleSelectReview = (rev) => {
    handleClose();
    openReviewDetail(rev);
  };

  return (
    <>
      <Tooltip title={totalNotifications > 0 ? `You have ${totalNotifications} total notifications` : 'No new notifications'} arrow>
        <IconButton
          onClick={handleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '8px',
            border: `1px solid ${theme.palette.divider}`,
            background: 'none',
            cursor: 'pointer',
            color: theme.palette.text.secondary,
            transition: 'all 0.15s',
            '&:hover': { 
              color: theme.palette.text.primary,
              bgcolor: 'rgba(255,255,255,0.05)'
            },
          }}
        >
          <Badge 
            badgeContent={totalNotifications} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: 10,
                height: 18,
                minWidth: 18,
                bgcolor: '#EF4444',
                border: '2px solid #000',
                fontWeight: 700
              }
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 340,
            maxHeight: 520,
            bgcolor: '#141414',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            '& .MuiList-root': { p: 0 }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#fff', mb: 1 }}>
            Alert Center
          </Typography>
          <Tabs 
            value={activeTab} 
            onChange={(_, val) => setActiveTab(val)}
            variant="fullWidth"
            sx={{ 
              minHeight: 36,
              mb: 1,
              '& .MuiTabs-indicator': { bgcolor: 'primary.main' }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Requests {newCount > 0 && <Badge badgeContent={newCount} color="error" sx={{ ml: 1, '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14 } }} />}
                </Box>
              } 
              sx={{ textTransform: 'none', fontSize: 13, fontWeight: 700, minHeight: 36 }} 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Reviews {pendingReviewsCount > 0 && <Badge badgeContent={pendingReviewsCount} color="error" sx={{ ml: 1, '& .MuiBadge-badge': { fontSize: 9, minWidth: 14, height: 14 } }} />}
                </Box>
              } 
              sx={{ textTransform: 'none', fontSize: 13, fontWeight: 700, minHeight: 36 }} 
            />
          </Tabs>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        
        <Box sx={{ maxHeight: 320, overflowY: 'auto' }}>
          {activeTab === 0 ? (
            /* SERVICE REQUESTS LIST */
            newRequests.length > 0 ? (
              newRequests.map((req) => (
                <MenuItem 
                  key={req.id} 
                  onClick={() => handleSelectRequest(req)}
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'primary.main' }}>
                      {req.names || req.name || 'New Client'}
                    </Typography>
                    <ChevronRightIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                    {req.registrationDate ? format(new Date(req.registrationDate), 'MMM d, h:mm a') : 'Recently'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {req.projectDescription || 'New service inquiry'}
                  </Typography>
                </MenuItem>
              ))
            ) : (
              <EmptyState message="No new requests" />
            )
          ) : (
            /* CUSTOMER REVIEWS LIST */
            pendingReviews.length > 0 ? (
              pendingReviews.map((rev) => (
                <MenuItem 
                  key={rev.id} 
                  onClick={() => handleSelectReview(rev)}
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'primary.main' }}>
                      {rev.client || rev.fullName || 'Unnamed Client'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#FFD700' }}>{rev.rating}</Typography>
                      <StarIcon sx={{ fontSize: 14, color: '#FFD700' }} />
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                    {rev.createdAt ? format(new Date(rev.createdAt), 'MMM d, h:mm a') : 'Recently'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{rev.review}"
                  </Typography>
                </MenuItem>
              ))
            ) : (
              <EmptyState message="No pending reviews" />
            )
          )}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ p: 1 }}>
          <Button 
            fullWidth 
            onClick={handleViewAll}
            sx={{ 
              textTransform: 'none', 
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 13,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }
            }}
          >
            {activeTab === 0 ? 'See all requests' : 'Moderate all reviews'}
          </Button>
        </Box>
      </Menu>
    </>
  );
}

function EmptyState({ message }) {
  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <Typography sx={{ color: 'text.disabled', fontSize: 13 }}>
        {message}
      </Typography>
    </Box>
  );
}
