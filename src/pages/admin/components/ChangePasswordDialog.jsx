import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  VisibilityOutlined as EyeIcon,
  VisibilityOffOutlined as EyeOffIcon,
} from '@mui/icons-material';

export default function ChangePasswordDialog({ 
  open, 
  onClose, 
  form, 
  showPass, 
  errors, 
  passwordData,
  submitting, 
  onChange, 
  onToggleVisibility, 
  onSubmit 
}) {
  const hasApiError = passwordData?.code === 'ERR';
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#111111',
          border: '1px solid #1F1F1F',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1, fontSize: 18, fontWeight: 800 }}>
        Change Password
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Typography sx={{ color: '#6B7280', fontSize: 13, mb: 3 }}>
          Create a secure password between 8 and 16 characters.
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {[
            { label: 'Current Password', name: 'current' },
            { label: 'New Password',     name: 'new' },
            { label: 'Confirm Password', name: 'confirm' },
          ].map((field) => (
            <Box key={field.name}>
              <Typography sx={{ color: '#6B7280', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', mb: 1 }}>
                {field.label}
              </Typography>
              <TextField
                fullWidth
                size="small"
                type={showPass[field.name] ? 'text' : 'password'}
                name={field.name}
                value={form[field.name]}
                onChange={onChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                placeholder="••••••••"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    bgcolor: '#0a0a0a',
                    fontSize: 13,
                    '& fieldset': { borderColor: '#2A2A2A' },
                    '&:hover fieldset': { borderColor: '#4B5563' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiFormHelperText-root': { fontSize: 10, mx: 0 }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 16, color: '#4B5563' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => onToggleVisibility(field.name)} sx={{ color: '#4B5563' }}>
                        {showPass[field.name] ? <EyeIcon sx={{ fontSize: 16 }} /> : <EyeOffIcon sx={{ fontSize: 16 }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          ))}
        </Box>

        {hasApiError && (
          <Box sx={{ mt: 3, p: 1.5, bgcolor: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)', borderRadius: '8px' }}>
            <Typography sx={{ color: '#F87171', fontSize: 12, textAlign: 'center' }}>
              {passwordData.message}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} disabled={submitting} sx={{ color: '#6B7280', textTransform: 'none', fontWeight: 600 }}>
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          variant="contained" 
          disabled={submitting}
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'black', 
            fontWeight: 800, 
            textTransform: 'none', 
            px: 3,
            '&:hover': { bgcolor: '#e6c200' } 
          }}
        >
          {submitting ? 'Updating...' : 'Update Password'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
