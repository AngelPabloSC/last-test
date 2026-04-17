// ─── ActiveSessionRow.jsx ─────────────────────────────────────────────────────
// Single row showing one session with device info and a close button.

import React from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  DesktopWindowsOutlined as MonitorIcon,
  SmartphoneOutlined as SmartphoneIcon,
  DevicesOtherOutlined as OtherDeviceIcon,
} from '@mui/icons-material';

// ── Device Icon ────────────────────────────────────────────────────────────────
function DeviceIcon({ type, color, bg }) {
  let Icon = MonitorIcon;
  if (type === 'smartphone') Icon = SmartphoneIcon;
  else if (type === 'monitor') Icon = MonitorIcon;
  else Icon = OtherDeviceIcon;

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        bgcolor: bg,
      }}
    >
      <Icon sx={{ fontSize: 18, color }} />
    </Box>
  );
}

export default function ActiveSessionRow({ session, onClose, closingId }) {
  const isClosing = closingId === session.id;
  const isInactive = !session.isActive;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        px: 3,
        py: 2,
        borderBottom: '1px solid #1A1A1A',
        opacity: isInactive ? 0.6 : 1,
        transition: 'opacity 0.2s ease',
        '&:last-child': { borderBottom: 0 },
      }}
    >
      <DeviceIcon
        type={session.icon ?? 'monitor'}
        color={session.iconColor ?? '#FFD700'}
        bg={session.iconBg ?? '#FFD70018'}
      />

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
            {session.device} — {session.browser}
          </Typography>
          
          {/* Current badge */}
          {session.isCurrent && (
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.1,
                borderRadius: '4px',
                bgcolor: '#4ADE8020',
                color: '#4ADE80',
                fontSize: 9,
                fontWeight: 800,
                textTransform: 'uppercase',
                border: '1px solid #4ADE8030',
              }}
            >
              Your session
            </Box>
          )}
        </Box>

        <Typography sx={{ color: '#6B7280', fontSize: 11.5 }}>
          {session.ip} · {session.location}
        </Typography>

        {/* State indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
          <Box
            component="span"
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              flexShrink: 0,
              bgcolor: session.isActive ? '#4ADE80' : '#4B5563',
            }}
          />
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: session.isActive ? 600 : 400,
              color: session.isActive ? '#4ADE80' : '#9CA3AF',
            }}
          >
            {session.stateText}
          </Typography>
        </Box>
      </Box>

      {/* Close button — only for Active and Non-Current sessions */}
      {session.isActive && !session.isCurrent && (
        <Button
          onClick={() => onClose(session.id)}
          disabled={!!closingId}
          size="small"
          sx={{
            flexShrink: 0,
            height: 30,
            px: 1.5,
            fontSize: 11,
            fontWeight: 700,
            color: '#FF4444',
            bgcolor: '#FF444415',
            border: '1px solid #FF444440',
            textTransform: 'none',
            borderRadius: '6px',
            minWidth: 60,
            '&:hover': { bgcolor: '#FF444425' },
            '&:disabled': { opacity: 0.5 },
          }}
          startIcon={
            isClosing
              ? <CircularProgress size={10} sx={{ color: '#FF4444' }} />
              : undefined
          }
        >
          {isClosing ? '...' : 'Close'}
        </Button>
      )}
    </Box>
  );
}
