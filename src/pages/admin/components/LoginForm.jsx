// ─── LoginForm.jsx ────────────────────────────────────────────────────────────
// Single responsibility: right panel of the login page.
// Renders the authentication form and manages its visual state.

import {
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import EmailOutlinedIcon        from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon         from '@mui/icons-material/LockOutlined';
import VisibilityIcon           from '@mui/icons-material/Visibility';
import VisibilityOffIcon        from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon         from '@mui/icons-material/ArrowForward';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import { validationRules } from '@/utils/validationRules';
import CustomTextField    from '@/components/common/CustomTextField';

// ── Shared input styles ────────────────────────────────────────────────────────
const INPUT_SX = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#1A1A1A',
    borderRadius: '8px',
    transition: 'border-color 0.2s',
    '& fieldset':             { borderColor: '#2A2A2A' },
    '&:hover fieldset':       { borderColor: '#444444' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
    '&.Mui-error fieldset':   { borderColor: 'error.main'   },
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    '&::placeholder': { color: '#555555', opacity: 1 },
  },
  '& .MuiFormHelperText-root': {
    color: 'error.main',
    fontSize: '0.75rem',
    mt: '4px',
  },
};

// ── Field label ────────────────────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <Typography
      component="label"
      sx={{
        display: 'block',
        mb: 1,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: '#AAAAAA',
      }}
    >
      {children}
    </Typography>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function LoginForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  showPassword,
  onTogglePassword,
  errorMsg,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#111111',
        px: { xs: 3, sm: 10 },
        py: '60px',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ width: '100%', maxWidth: '400px' }}
      >
        {/* Form header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'primary.main' }}
          >
            Nova Admin
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, fontSize: '32px !important', fontWeight: 800, color: '#FFFFFF' }}>
            Sign in
          </Typography>
          <Typography sx={{ mt: 1, fontSize: '0.875rem', lineHeight: 1.6, color: '#888888' }}>
            Access your Nova Solutions admin panel.
          </Typography>
        </Box>

        {/* Auth error alert */}
        {errorMsg && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              bgcolor: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#FCA5A5',
              borderRadius: '8px',
              fontSize: '0.875rem',
              '& .MuiAlert-icon': { color: '#EF4444' },
            }}
          >
            {errorMsg}
          </Alert>
        )}

        {/* Email */}
        <Box sx={{ mb: 2.5 }}>
          <FieldLabel>Email Address</FieldLabel>
          <CustomTextField
            name="email"
            register={register}
            rules={{ 
              required: validationRules.required, 
              pattern: validationRules.email,
              maxLength: validationRules.maxLength.email 
            }}
            error={errors.email}
            type="email"
            placeholder="admin@novasolutions.com"
            fullWidth
            size="small"
            sx={INPUT_SX}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 16, color: errors.email ? 'error.main' : '#555555' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ mb: 2.5 }}>
          <FieldLabel>Password</FieldLabel>
          <CustomTextField
            name="password"
            register={register}
            rules={{ 
              required: validationRules.required,
              maxLength: validationRules.maxLength.password 
            }}
            error={errors.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            fullWidth
            size="small"
            sx={INPUT_SX}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 16, color: errors.password ? 'error.main' : '#555555' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onTogglePassword}
                    edge="end"
                    size="small"
                    sx={{ color: '#555555', '&:hover': { color: '#FFFFFF' } }}
                  >
                    {showPassword
                      ? <VisibilityIcon sx={{ fontSize: 16 }} />
                      : <VisibilityOffIcon sx={{ fontSize: 16 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Options row */}
        <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{ color: '#444444', p: '2px', mr: 0.5, '&.Mui-checked': { color: 'primary.main' } }}
              />
            }
            label={<Typography sx={{ fontSize: '13px', color: '#AAAAAA' }}>Remember me</Typography>}
            sx={{ m: 0 }}
          />
          <Link href="/forgot-password" underline="hover" sx={{ fontSize: '13px', fontWeight: 600, color: 'primary.main' }}>
            Forgot password?
          </Link>
        </Box>

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          endIcon={isSubmitting ? null : <ArrowForwardIcon sx={{ fontSize: 18 }} />}
          sx={{
            height: '52px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '15px',
            fontWeight: 800,
            textTransform: 'none',
            borderRadius: '8px',
            letterSpacing: '0.02em',
            '&:hover':  { bgcolor: 'primary.dark' },
            '&:active': { transform: 'scale(0.99)' },
            '&.Mui-disabled': {
              bgcolor: alpha(theme.palette.primary.main, 0.38),
              color:   alpha(theme.palette.primary.contrastText, 0.5),
            },
          }}
        >
          {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
        </Button>

        {/* Divider */}
        <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ flex: 1, height: '1px', bgcolor: '#2A2A2A' }} />
          <Typography sx={{ fontSize: '11px', color: '#444444' }}>secure access</Typography>
          <Box sx={{ flex: 1, height: '1px', bgcolor: '#2A2A2A' }} />
        </Box>

        {/* Security badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            borderRadius: '8px',
            border: '1px solid #2A2A2A',
            bgcolor: '#1A1A1A',
            px: 2,
            py: 0.75,
          }}
        >
          <VerifiedUserOutlinedIcon sx={{ fontSize: 14, color: '#34A853', flexShrink: 0 }} />
          <Typography sx={{ fontSize: '11px', color: '#666666' }}>
            Protected Access · SSL Encrypted · Admins Only
          </Typography>
        </Box>
      </Box>

      {/* Version footer */}
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography sx={{ fontSize: '11px', color: '#333333' }}>Nova Admin v2.4</Typography>
        <Typography sx={{ fontSize: '11px', color: '#333333' }}>·</Typography>
        <Typography sx={{ fontSize: '11px', color: '#333333' }}>© 2026 Nova Solutions</Typography>
      </Box>
    </Box>
  );
}
