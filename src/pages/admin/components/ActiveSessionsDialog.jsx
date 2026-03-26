import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Skeleton,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ShieldOutlined as ShieldIcon,
  LogoutOutlined as LogOutIcon,
  Close as CloseIcon,
  History as HistoryIcon,
  Devices as DevicesIcon,
  InfoOutlined as InfoIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';

import ActiveSessionRow from './ActiveSessionRow';
import SessionsSuccessState from './SessionsSuccessState';

const SessionSkeleton = () => (
  <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #1F1F1F' }}>
    <Skeleton variant="rounded" width={42} height={42} sx={{ bgcolor: '#1F1F1F', borderRadius: '12px' }} />
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
        <Skeleton variant="text" width={120} height={18} sx={{ bgcolor: '#1F1F1F' }} />
        <Skeleton variant="rounded" width={40} height={14} sx={{ bgcolor: '#1F1F1F', borderRadius: '4px' }} />
      </Box>
      <Skeleton variant="text" width={180} height={14} sx={{ bgcolor: '#1F1F1F' }} />
    </Box>
  </Box>
);

export default function ActiveSessionsDialog({
  open,
  onClose,
  activeSessions = [],
  recentSessions = [],
  sessionData = {}, // Nuevo objeto unificado
  loading,
  closingId,
  closingAll,
  closedAll,
  otherActiveSessions = [],
  onCloseSession,
  onCloseAll,
}) {
  const totalActive = activeSessions.length;
  const hasHistory = recentSessions.length > 0;
  const hasError = sessionData?.code === 'ERR';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#111111',
          border: '1px solid #2A2A2A',
          borderRadius: '24px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, transparent 100%)',
        },
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <DialogTitle
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2.5,
          borderBottom: '1px solid #1F1F1F',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              bgcolor: '#FFD70015',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShieldIcon sx={{ fontSize: 18, color: '#FFD700' }} />
          </Box>
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: 18, lineHeight: 1.2 }}>
              Sessions & Devices
            </Typography>
            {!loading && !hasError && (
              <Typography sx={{ color: '#6B7280', fontSize: 12.5, mt: 0.25 }}>
                {totalActive} {totalActive === 1 ? 'active session' : 'active sessions'} currently
              </Typography>
            )}
            {hasError && (
              <Typography sx={{ color: '#F87171', fontSize: 12.5, mt: 0.25 }}>
                Error loading sessions
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#6B7280', '&:hover': { color: 'white' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          bgcolor: '#0A0A0A',
        }}
      >
        {/* Loading state with Skeletons */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ px: 3, py: 2, bgcolor: '#111111', borderBottom: '1px solid #1F1F1F' }}>
              <Skeleton width={100} height={12} sx={{ bgcolor: '#1F1F1F' }} />
            </Box>
            {[1, 2, 3].map(i => <SessionSkeleton key={i} />)}
          </Box>
        )}

        {/* Error state */}
        {!loading && hasError && (
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
            <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(248, 113, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ErrorIcon sx={{ fontSize: 30, color: '#F87171' }} />
            </Box>
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 700, mb: 1 }}>Something went wrong</Typography>
              <Typography sx={{ color: '#6B7280', fontSize: 14, maxWidth: 280, mx: 'auto' }}>
                {sessionData.message || 'We could not retrieve your session information at this time.'}
              </Typography>
            </Box>
            <Button 
              onClick={() => window.location.reload()} 
              sx={{ color: '#FFD700', textTransform: 'none', fontWeight: 600, mt: 1 }}
            >
              Try again
            </Button>
          </Box>
        )}

        {/* Success state */}
        {!loading && !hasError && closedAll && (
          <SessionsSuccessState onClose={onClose} />
        )}

        {/* Sessions list */}
        {!loading && !hasError && !closedAll && (
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            
            {/* ── Active Sessions Section ── */}
            <Box sx={{ px: 3, py: 2, bgcolor: '#111111', borderBottom: '1px solid #1F1F1F' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DevicesIcon sx={{ fontSize: 14, color: '#4ADE80' }} />
                <Typography sx={{ color: '#4ADE80', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Active Sessions
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flexShrink: 0 }}>
              {activeSessions.length === 0 ? (
                <Box sx={{ py: 4, px: 3, textAlign: 'center' }}>
                  <Typography sx={{ color: '#6B7280', fontSize: 13 }}>No active sessions found.</Typography>
                </Box>
              ) : (
                activeSessions.map(session => (
                  <ActiveSessionRow
                    key={session.id}
                    session={session}
                    onClose={onCloseSession}
                    closingId={closingId}
                  />
                ))
              )}
            </Box>

            {/* ── Recent Activity Section ── */}
            {hasHistory && (
              <>
                <Box sx={{ px: 3, py: 2, bgcolor: '#111111', borderBottom: '1px solid #1F1F1F', borderTop: '4px solid #000' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HistoryIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
                    <Typography sx={{ color: '#9CA3AF', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Recent Login Activity
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  {recentSessions.map(session => (
                    <ActiveSessionRow
                      key={session.id}
                      session={session}
                      onClose={onCloseSession}
                      closingId={closingId}
                    />
                  ))}
                </Box>
              </>
            )}

            {/* Info note */}
            {!closedAll && totalActive > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.25,
                  px: 3,
                  py: 2.5,
                  borderTop: '1px solid #1F1F1F',
                  mt: 'auto',
                }}
              >
                <InfoIcon sx={{ fontSize: 15, color: '#6B7280', flexShrink: 0, mt: 0.2 }} />
                <Typography sx={{ color: '#6B7280', fontSize: 12, lineHeight: 1.6 }}>
                  Reviewing your sessions periodically helps keep your account secure. If you see a device you don't recognize, close it immediately.
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      {!loading && !closedAll && (
        <DialogActions
          sx={{
            px: 3,
            py: 2.5,
            borderTop: '1px solid #1F1F1F',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
            bgcolor: '#111111',
          }}
        >
          <Button
            onClick={onClose}
            disabled={!!closingId || closingAll}
            sx={{
              height: 40,
              px: 3,
              bgcolor: '#1F1F1F',
              border: '1px solid #2A2A2A',
              color: '#9CA3AF',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '10px',
              '&:hover': { bgcolor: '#2A2A2A', color: 'white' },
            }}
          >
            Close
          </Button>

          {activeSessions.length > 0 ? (
            <Button
              onClick={onCloseAll}
              disabled={!!closingId || closingAll}
              sx={{
                height: 40,
                px: 2.5,
                bgcolor: closingAll ? '#FF444420' : '#FF444415',
                border: closingAll ? '1px solid #FF444430' : '1px solid #FF444450',
                color: '#FF4444',
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': { bgcolor: '#FF444425' },
                '&:disabled': { opacity: 0.5 },
              }}
              startIcon={
                closingAll 
                  ? <CircularProgress size={12} sx={{ color: '#FF4444' }} /> 
                  : <LogOutIcon sx={{ fontSize: 15 }} />
              }
            >
              {closingAll ? 'Closing all...' : 'Close all sessions'}
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: '#6B7280', fontSize: 12.5, fontWeight: 500 }}>
                No active sessions
              </Typography>
            </Box>
          )}
        </DialogActions>
      )}

    </Dialog>
  );
}
