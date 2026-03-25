import { useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Alert,
  CircularProgress,
  FormControlLabel,
  Rating,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDialog } from '@/hooks/useDialog';
import { validationRules } from '@/utils/validationRules';
import CustomSelect from '@/components/common/CustomSelect';
import CustomTextField from '@/components/common/CustomTextField';
import SendIcon from '@mui/icons-material/Send';
import ShieldIcon from '@mui/icons-material/Shield';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useReviewForm } from '@/hooks/useReviewForm';
import ReviewSuccessDialog from '@/components/ui/ReviewSuccessDialog';

const SERVICE_OPTIONS = [
  'Roofing',
  'Roof Repair',
  'Siding',
  'Gutters',
  'Gutter Installation',
  'Insulation',
  'Other',
];

const INPUT_SX = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '8px',
    transition: 'all 0.2s',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '2px' },
  },
  '& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)': {
    height: '52px',
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
    fontSize: '1rem',
    py: '14px',
    px: '14px',
    boxSizing: 'border-box',
    '&::placeholder': { color: '#888888', opacity: 1 },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px #1A1A1A inset !important',
      WebkitTextFillColor: '#ffffff !important',
      caretColor: '#ffffff !important',
      borderRadius: 'inherit',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'error.main',
    fontSize: '0.75rem',
    fontWeight: 500,
    mt: '4px',
  },
};

export default function ReviewForm() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
    watch,
    status,
    resetStatus,
    dialogSuccess,
  } = useReviewForm();

  const confirmDialog = useDialog();

  // Interceptar el envío del formulario para abrir confirmación primero
  const handlePreSubmit = (data) => {
    confirmDialog.handleOpenDialog(data);
  };

  // Ejecutar el envío final
  const handleConfirmSubmit = () => {
    onSubmit(confirmDialog.dialogContent);
    confirmDialog.handleCloseDialog();
  };

  const ratingValue = watch('rating', 0);

  return (
    <>
      <ReviewSuccessDialog open={dialogSuccess} onClose={resetStatus} />

      {/* Diálogo de Confirmación */}
      <Dialog
        open={confirmDialog.isOpen}
        onClose={confirmDialog.handleCloseDialog}
        slotProps={{ paper: { sx: { bgcolor: '#1A1A1A', borderRadius: '12px' } } }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 700 }}>Confirm your Review</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#9CA3AF' }}>
            Are you sure you want to submit this review? Once submitted, it will be sent for moderation before appearing on the website.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={confirmDialog.handleCloseDialog} sx={{ color: '#9CA3AF', textTransform: 'none' }}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} variant="contained" sx={{ bgcolor: 'primary.main', color: 'black', textTransform: 'none', fontWeight: 600 }}>Yes, Submit</Button>
        </DialogActions>
      </Dialog>

      <Box
        component="form"
        onSubmit={handleSubmit(handlePreSubmit)}
        noValidate
        sx={{
          bgcolor: '#111111',
          border: '1px solid #1F1F1F',
          borderRadius: '12px',
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {status === 'error' && (
          <Alert severity="error" sx={{ py: 0.5, fontSize: '0.85rem' }}>
            {errorMsg}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
                Full Name <span style={{ color: '#FF4444' }}>*</span>
              </Typography>
              <CustomTextField
                name="fullName"
                register={register}
                rules={{
                  required: validationRules.required,
                  pattern: validationRules.fullName,
                  maxLength: validationRules.maxLength.fullName,
                }}
                error={errors.fullName}
                placeholder="John Doe"
                size="medium"
                fullWidth
                sx={INPUT_SX}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
                Email Address <span style={{ color: '#FF4444' }}>*</span>
              </Typography>
              <CustomTextField
                name="email"
                register={register}
                rules={{
                  required: validationRules.required,
                  pattern: validationRules.email,
                  maxLength: validationRules.maxLength.email,
                }}
                error={errors.email}
                type="email"
                placeholder="john@example.com"
                size="medium"
                fullWidth
                sx={INPUT_SX}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
                City / Location <span style={{ color: '#FF4444' }}>*</span>
              </Typography>
              <CustomTextField
                name="location"
                register={register}
                rules={{
                  required: validationRules.required,
                  pattern: validationRules.cityState,
                  maxLength: validationRules.maxLength.city,
                }}
                error={errors.location}
                placeholder="e.g. Albany, NY"
                size="medium"
                fullWidth
                sx={INPUT_SX}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
                Service Type <span style={{ color: '#FF4444' }}>*</span>
              </Typography>
              <CustomSelect
                name="service"
                register={register}
                rules={{ required: validationRules.required }}
                error={errors.service}
                options={SERVICE_OPTIONS}
                placeholder="Select a service..."
                size="medium"
                sx={INPUT_SX}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
            Your Rating <span style={{ color: '#FF4444' }}>*</span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '60px' }}>
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => {
                setValue('rating', newValue, { shouldValidate: true });
              }}
              sx={{ 
                color: '#FFD700',
                fontSize: '2.5rem',
                '& .MuiRating-iconEmpty': {
                  color: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            />
            <input 
              type="hidden" 
              {...register('rating', { required: 'Please select a rating' })} 
            />
          </Box>
          {errors.rating && (
             <Typography sx={{ color: 'error.main', fontSize: '0.75rem', mt: '-4px' }}>
               {errors.rating.message}
             </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}>
            Your Review <span style={{ color: '#FF4444' }}>*</span>
          </Typography>
          <CustomTextField
            name="review"
            register={register}
            rules={{
              required: validationRules.required,
              minLength: { value: 20, message: 'Please write at least 20 characters.' },
              maxLength: validationRules.maxLength.text,
            }}
            error={errors.review}
            placeholder="Tell us about your experience with Nova Solutions..."
            multiline
            rows={5}
            fullWidth
            sx={{ ...INPUT_SX, '& .MuiInputBase-root': { padding: '0 !important' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  color: '#444',
                  '&.Mui-checked': { color: 'primary.main' },
                }}
                {...register('consent', {
                  required: 'You must agree to the conditions.',
                })}
              />
            }
            label={
              <Typography sx={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.5 }}>
                I agree to Nova Solutions' terms and conditions and understand that my review may be published on the website.
              </Typography>
            }
            sx={{ alignItems: 'flex-start', m: 0, '& .MuiCheckbox-root': { pt: 0, pl: 0 } }}
          />
          {errors.consent && (
            <Typography sx={{ color: 'error.main', fontSize: '0.75rem', pl: 3.5 }}>
              {errors.consent.message}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button
            type="button"
            onClick={() => resetStatus()}
            sx={{
              color: '#9CA3AF',
              border: '1px solid #2A2A2A',
              px: 3,
              py: 1,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { border: '1px solid #666', color: 'white' },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || status === 'loading'}
            startIcon={isSubmitting || status === 'loading' ? null : <SendIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: 'primary.main',
              color: 'black',
              fontWeight: 700,
              px: 3,
              py: 1.2,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { bgcolor: '#E6C200' },
              '&.Mui-disabled': { bgcolor: 'rgba(255,215,0,0.3)', color: 'rgba(0,0,0,0.4)' },
            }}
          >
            {isSubmitting || status === 'loading' ? <CircularProgress size={20} color="inherit" /> : 'Submit Review'}
          </Button>
        </Box>
      </Box>

    
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, mt: 3, bgcolor: '#0A0A0A', border: '1px solid #1F1F1F', borderRadius: '12px' }}>
        <ShieldIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.2 }} />
        <Typography sx={{ color: '#6B7280', fontSize: 13, lineHeight: 1.6 }}>
          All reviews are moderated before being published. We guarantee authenticity and do not alter submitted content.
        </Typography>
      </Box>
    </>
  );
}
