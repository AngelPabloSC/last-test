import {
  Box,
  Typography,
  Checkbox,
  Button,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { useContactForm } from '@/hooks/useContactForm';
import SuccessDialog from '@/components/ui/SuccessDialog';
import ErrorDialog   from '@/components/ui/ErrorDialog';
import CustomTextField from '@/components/common/CustomTextField';
import { validationRules } from '@/utils/validationRules';

// ─── Shared input styles ──────────────────────────────────────────────────────
const INPUT_SX = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'white',
    borderRadius: '4px',
    '& fieldset': { border: 'none' },
  },
  '& .MuiInputBase-input': {
    color: '#222',
    fontSize: '0.9rem',
    py: '10px',
    px: '12px',
    '&::placeholder': { color: '#888', opacity: 1 },
  },
  '& .MuiFormHelperText-root': {
    color: 'error.light',
    fontSize: '0.75rem',
    fontWeight: 500,
    mt: '3px',
  },
};

// ─── View ─────────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    status,
    errorMsg,
    resetStatus,
    dialogSuccess,
    dialogError,
  } = useContactForm();

  return (
    <>
      <SuccessDialog open={dialogSuccess} onClose={resetStatus} />
      <ErrorDialog   open={dialogError}   onClose={resetStatus} onRetry={handleSubmit(onSubmit)} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, width: '100%' }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'right', mb: 0.5 }}>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '1.5rem', md: '1.8rem' },
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            RENOVATIONS
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontWeight: 400,
              fontSize: '0.95rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            WITH US
          </Typography>
        </Box>

        {/* API-level error */}
        {status === 'error' && (
          <Alert severity="error" sx={{ py: 0.5, fontSize: '0.85rem' }}>
            {errorMsg}
          </Alert>
        )}

        {/* Full Name */}
        <CustomTextField
          name="fullName"
          register={register}
          rules={{
            required: validationRules.required,
            pattern:  validationRules.fullName,
            maxLength: validationRules.maxLength.fullName,
          }}
          error={errors.fullName}
          placeholder="Full Name"
          size="small"
          fullWidth
          sx={INPUT_SX}
        />

        {/* Email */}
        <CustomTextField
          name="email"
          register={register}
          rules={{
            required: validationRules.required,
            pattern:  validationRules.email,
            maxLength: validationRules.maxLength.email,
          }}
          error={errors.email}
          type="email"
          placeholder="Email"
          size="small"
          fullWidth
          sx={INPUT_SX}
        />

        {/* Phone */}
        <CustomTextField
          name="phone"
          register={register}
          rules={{
            required: validationRules.required,
            pattern:  validationRules.phone,
            maxLength: validationRules.maxLength.phone,
          }}
          error={errors.phone}
          type="tel"
          placeholder="Phone Number"
          size="small"
          fullWidth
          sx={INPUT_SX}
        />

        {/* Address + City */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomTextField
            name="address"
            register={register}
            rules={{
              required: validationRules.required,
              maxLength: validationRules.maxLength.address,
            }}
            error={errors.address}
            placeholder="Address"
            size="small"
            fullWidth
            sx={INPUT_SX}
          />
          <CustomTextField
            name="city"
            register={register}
            rules={{
              required: validationRules.required,
              pattern:  validationRules.onlyLetters,
              maxLength: validationRules.maxLength.city,
            }}
            error={errors.city}
            placeholder="City"
            size="small"
            fullWidth
            sx={INPUT_SX}
          />
        </Box>

        {/* Project */}
        <CustomTextField
          name="project"
          register={register}
          rules={{
            required:  validationRules.required,
            minLength: { value: 10, message: 'Please describe your project in at least 10 characters.' },
            maxLength: validationRules.maxLength.text,
          }}
          error={errors.project}
          placeholder="Tell us about your project..."
          multiline
          rows={3}
          fullWidth
          sx={INPUT_SX}
        />

        {/* Terms */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Checkbox
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              p: '2px',
              flexShrink: 0,
              '&.Mui-checked': { color: 'primary.main' },
            }}
            {...register('acceptTerms', {
              required: 'You must accept the Terms and Conditions.',
            })}
          />
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', lineHeight: 1 }}>
            I accept the{' '}
            <Link href="/privacy-policy" target="_blank" sx={{ color: 'primary.main' }}>
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {errors.acceptTerms && (
          <Typography sx={{ color: 'error.light', fontSize: '0.75rem', mt: '-4px' }}>
            {errors.acceptTerms.message}
          </Typography>
        )}

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || status === 'loading'}
          fullWidth
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 700,
            fontSize: '1rem',
            py: 1.3,
            borderRadius: '4px',
            textTransform: 'none',
            letterSpacing: '0.02em',
            '&:hover': { bgcolor: 'primary.dark' },
            '&.Mui-disabled': { bgcolor: 'rgba(255,215,0,0.3)', color: 'rgba(0,0,0,0.4)' },
          }}
        >
          {isSubmitting || status === 'loading'
            ? <CircularProgress size={20} color="inherit" />
            : 'Get Free Inspections'
          }
        </Button>
      </Box>
    </>
  );
}
