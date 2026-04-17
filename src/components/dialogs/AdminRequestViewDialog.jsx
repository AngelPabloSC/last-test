import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, 
  Divider, Avatar, Skeleton, useTheme, Tooltip, RadioGroup, 
  FormControlLabel, Radio, TextField, Button, CircularProgress 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  'New':         '#FFD700',
  'In Progress': '#60A5FA',
  'Completed':   '#4ADE80',
  'Canceled':    '#F87171',
};

export default function AdminRequestViewDialog({ open, onClose, data, getHistory, onUpdateStatus }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  // Status editing state
  const [newStatus, setNewStatus] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (open && data?.id) {
      if (getHistory) loadHistory();
      setNewStatus(data.status || 'New');
      setUpdateMessage('');
    }
  }, [open, data?.id]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    const res = await getHistory(data.id);
    setHistory(res);
    setLoadingHistory(false);
  };

  const handleApplyStatus = async () => {
    if (!onUpdateStatus) return;
    setIsUpdating(true);
    const success = await onUpdateStatus(data.id, newStatus, updateMessage);
    if (success) {
      setUpdateMessage('');
      if (getHistory) loadHistory();
    }
    setIsUpdating(false);
  };

  if (!data) return null;

  const hasStatusChanged = newStatus !== data.status || updateMessage.length > 0;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f0f0f',
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.05)'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
          Request Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.disabled' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pb: 4, borderColor: 'rgba(255,255,255,0.05)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          
          {/* Header Info */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <InfoRow label="Client Name" value={data.names || data.name} />
            <InfoRow label="Date Received" value={data.createdAt ? new Date(data.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'} />
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <InfoRow 
              label="Email Address" 
              value={data.email} 
              onAction={() => {
                navigate('/admin/emails', { state: { replyTo: data.email, replyName: data.names || data.name } });
                onClose();
              }}
            />
            <InfoRow label="Phone Number" value={data.phone} isPhone />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <InfoRow label="Location" value={data.address ? `${data.address}${data.city ? `, ${data.city}` : ''}` : (data.city || 'Not provided')} />
            <InfoRow label="Current Status" value={data.status} isStatus />
          </Box>
          
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
          
          {/* Project Description */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.disabled, mb: 1.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Project Description
            </Typography>
            <Typography sx={{ 
              fontSize: 13, 
              p: 2, 
              bgcolor: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: 1.5, 
              minHeight: 60, 
              color: 'text.primary', 
              lineHeight: 1.6,
              wordBreak: 'break-word'
            }}>
              {data.projectDescription || data.project || 'No description provided.'}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* Status Editing Section */}
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.01)', p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.03)' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', mb: 2, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Update Status
            </Typography>
            
            <RadioGroup 
              row 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{ mb: 2.5, gap: { xs: 1, sm: 2 } }}
            >
              {Object.keys(STATUS_COLORS).map(s => (
                <FormControlLabel 
                  key={s}
                  value={s} 
                  control={<Radio size="small" sx={{ color: 'rgba(255,255,255,0.2)', '&.Mui-checked': { color: STATUS_COLORS[s] } }} />} 
                  label={<Typography sx={{ fontSize: 12, fontWeight: 600 }}>{s}</Typography>} 
                />
              ))}
            </RadioGroup>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={1}
                placeholder="Include a short internal note..."
                value={updateMessage}
                onChange={(e) => setUpdateMessage(e.target.value.substring(0, 70))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 12,
                    bgcolor: 'rgba(0,0,0,0.2)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }
                  }
                }}
              />
              <Button
                variant="contained"
                disableElevation
                disabled={!hasStatusChanged || isUpdating}
                onClick={handleApplyStatus}
                startIcon={isUpdating ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                sx={{ 
                  height: 40, 
                  px: 3, 
                  fontSize: 12, 
                  fontWeight: 700,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* History Section */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.disabled, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Activity History
            </Typography>
            
            {loadingHistory ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[1, 2].map(i => <Skeleton key={i} variant="rounded" height={50} sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} />)}
              </Box>
            ) : history.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {history.map((h, i) => (
                  <HistoryItem key={i} item={h} />
                ))}
              </Box>
            ) : (
              <Typography sx={{ fontSize: 12, color: 'text.disabled', textAlign: 'center', py: 2, bgcolor: 'rgba(255,255,255,0.01)', borderRadius: 1.5 }}>
                No status updates recorded yet.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function HistoryItem({ item }) {
  const theme = useTheme();
  const adminName = item.admin?.person?.names || item.admin?.username || 'Admin';
  const profilePic = item.admin?.person?.profilePicture;
  
  return (
    <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)' }}>
      <Avatar src={profilePic} sx={{ width: 28, height: 28, fontSize: 12 }}>{adminName.charAt(0)}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {adminName}
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <StatusTinyBadge label={item.oldStatus} />
          <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>→</Typography>
          <StatusTinyBadge label={item.newStatus} />
        </Box>

        {item.message && (
          <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1, pl: 1, borderLeft: '2px solid rgba(255,215,0,0.3)' }}>
            "{item.message}"
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function StatusTinyBadge({ label }) {
  const color = STATUS_COLORS[label] || '#666';
  return (
    <Typography component="span" sx={{ fontSize: 9, fontWeight: 800, px: 1, py: 0.25, borderRadius: 4, bgcolor: `${color}15`, color: color, textTransform: 'uppercase' }}>
      {label}
    </Typography>
  );
}

function InfoRow({ label, value, isStatus, isPhone, onAction }) {
  const theme = useTheme();
  
  const renderValue = () => {
    if (isStatus) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: STATUS_COLORS[value] || '#666' }} />
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: STATUS_COLORS[value] || '#fff' }}>
            {value}
          </Typography>
        </Box>
      );
    }
    
    if (isPhone && value) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            component="a" 
            href={`tel:${value}`}
            sx={{ 
              fontSize: 13, 
              fontWeight: 600, 
              color: 'primary.main', 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {value}
          </Typography>
          <PhoneIcon sx={{ fontSize: 14, color: 'primary.main', opacity: 0.5 }} />
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
          {value || '-'}
        </Typography>
        {onAction && (
          <Tooltip title="Compose Email" arrow>
            <IconButton 
              size="small" 
              onClick={onAction}
              sx={{ 
                p: 0.5, 
                color: 'primary.main', 
                bgcolor: 'rgba(255,215,0,0.05)',
                '&:hover': { bgcolor: 'rgba(255,215,0,0.1)' }
              }}
            >
              <EmailIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, flex: 1, minWidth: 140 }}>
      <Typography sx={{ fontSize: 10, fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </Typography>
      {renderValue()}
    </Box>
  );
}
