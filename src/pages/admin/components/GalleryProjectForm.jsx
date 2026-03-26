import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import { 
  Save, Delete, AddPhotoAlternate, Info, 
  SquareFoot, CalendarMonth, LocationOn, Person,
  Star, StarBorder
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { validationRules } from '@/utils/validationRules';
import { useSnackbar } from '@/context/SnackbarContext';

const CATEGORIES = ['Roofing', 'Siding', 'Gutters', 'Residential', 'Commercial', 'Industrial', 'Interior Design'];

export default function GalleryProjectForm({ initialData = {}, onSubmit, isSubmitting }) {
  const { control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    defaultValues: {
      name: initialData.name || '',
      category: initialData.category || 'Residential',
      status: initialData.status === 'Published' ? 'Published' : 'Draft',
      detailedDesc: initialData.detailedDesc || '',
      location: initialData.location || '',
      year: initialData.year || new Date().getFullYear().toString(),
      client: initialData.client || '',
      totalArea: initialData.totalArea || '',
      images: initialData.images || [],
      coverImageIndex: initialData.coverImageIndex || 0,
      ...initialData
    }
  });

  const formValues = watch();
  const fileInputRef = useRef(null);
  const { showSnackbar } = useSnackbar();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

  const handlePublishClick = async (e) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      if (!formValues.images || formValues.images.length === 0) {
        showSnackbar('At least one image is required for publication.', 'error');
        return;
      }
      setIsPublishDialogOpen(true);
    }
  };

  const confirmPublish = () => {
    setValue('status', 'Published');
    setIsPublishDialogOpen(false);
    handleSubmit(onSubmit)();
  };

  const processFiles = (files) => {
    const currentImages = formValues.images || [];
    const remainingSlots = 12 - currentImages.length;
    
    if (remainingSlots <= 0) return;

    let hasHeavyFile = false;
    const validFiles = Array.from(files)
      .slice(0, remainingSlots)
      .filter(file => {
        const isImage = ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
        const isUnderLimit = file.size <= 2 * 1024 * 1024; // 2MB
        if (!isUnderLimit) hasHeavyFile = true;
        return isImage && isUnderLimit;
      });

    if (hasHeavyFile) {
      showSnackbar('One or more files exceed the 2MB limit and were not uploaded.', 'error');
    }

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const currentImages = watch('images') || [];
        if (currentImages.length < 12) {
          setValue('images', [...currentImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Grid container spacing={4}>
        {/* ── LEFT COLUMN: MAIN INFO ────────────────────── */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info sx={{ color: 'primary.main' }} /> Basic Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={12}>
                 <Controller
                  name="name"
                  control={control}
                  rules={{ 
                    required: validationRules.required,
                    maxLength: validationRules.maxLength.projectName
                  }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        fullWidth
                        label="Project Name"
                        placeholder="e.g. Hillside Villa"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="filled"
                        inputProps={{ maxLength: validationRules.maxLength.projectName.value }}
                        sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: errors.name ? 'error.main' : 'rgba(255,255,255,0.3)' }}>
                        {field.value?.length || 0} / {validationRules.maxLength.projectName.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: validationRules.required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Project Category"
                      variant="filled"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                    >
                      {CATEGORIES.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="detailedDesc"
                  control={control}
                  rules={{ 
                    required: validationRules.required,
                    maxLength: validationRules.maxLength.projectDescription
                  }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        fullWidth
                        label="Detailed Description"
                        placeholder="The full story of the project, architecture, materials..."
                        multiline
                        rows={6}
                        error={!!errors.detailedDesc}
                        helperText={errors.detailedDesc?.message}
                        variant="filled"
                        inputProps={{ maxLength: validationRules.maxLength.projectDescription.value }}
                        sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: errors.detailedDesc ? 'error.main' : 'rgba(255,255,255,0.3)' }}>
                        {field.value?.length || 0} / {validationRules.maxLength.projectDescription.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* ── PROJECT SPECIFICATIONS ─────────────────────────────────── */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>Project Specifications</Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                 <Controller
                  name="location"
                  control={control}
                  rules={{ 
                    required: validationRules.required,
                    maxLength: validationRules.maxLength.projectLocation
                  }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        fullWidth
                        label="Location"
                        placeholder="e.g. Malibu, CA"
                        InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn sx={{ color: 'primary.main' }} /></InputAdornment> }}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                        variant="filled"
                        inputProps={{ maxLength: validationRules.maxLength.projectLocation.value }}
                        sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: errors.location ? 'error.main' : 'rgba(255,255,255,0.3)' }}>
                        {field.value?.length || 0} / {validationRules.maxLength.projectLocation.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="year"
                  control={control}
                  rules={{ required: validationRules.required, pattern: validationRules.onlyNumbers }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Completion Year"
                      placeholder="e.g. 2024"
                      InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: 'primary.main' }} /></InputAdornment> }}
                      error={!!errors.year}
                      helperText={errors.year?.message}
                      variant="filled"
                      sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="client"
                  control={control}
                  rules={{ 
                    required: validationRules.required,
                    maxLength: validationRules.maxLength.projectClient
                  }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        fullWidth
                        label="Client / Owner"
                        placeholder="e.g. Martinez Family"
                        InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'primary.main' }} /></InputAdornment> }}
                        error={!!errors.client}
                        helperText={errors.client?.message}
                        variant="filled"
                        inputProps={{ maxLength: validationRules.maxLength.projectClient.value }}
                        sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: errors.client ? 'error.main' : 'rgba(255,255,255,0.3)' }}>
                        {field.value?.length || 0} / {validationRules.maxLength.projectClient.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="totalArea"
                  control={control}
                  rules={{ 
                    required: validationRules.required,
                    maxLength: validationRules.maxLength.projectArea
                  }}
                  render={({ field }) => (
                    <Box>
                      <TextField
                        {...field}
                        fullWidth
                        label="Total Area"
                        placeholder="e.g. 8,500 sqft"
                        InputProps={{ startAdornment: <InputAdornment position="start"><SquareFoot sx={{ color: 'primary.main' }} /></InputAdornment> }}
                        error={!!errors.totalArea}
                        helperText={errors.totalArea?.message}
                        variant="filled"
                        inputProps={{ maxLength: validationRules.maxLength.projectArea.value }}
                        sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                      />
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: errors.totalArea ? 'error.main' : 'rgba(255,255,255,0.3)' }}>
                        {field.value?.length || 0} / {validationRules.maxLength.projectArea.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* ── PROJECT GALLERY ───────────────────────────────────────── */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mt: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>Project Gallery</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  {formValues.images?.length || 0} / 12
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
                A visual journey through every phase and angle of the {formValues.name || 'Project'} construction.
              </Typography>
              {formValues.images?.length === 0 && (
                <Typography variant="caption" sx={{ color: 'error.main', mt: 1, display: 'block', fontWeight: 700 }}>
                   * Error: At least one image is required for publication.
                </Typography>
              )}
            </Box>
            
            <Box 
              onClick={() => fileInputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              sx={{ 
                p: 6, 
                border: '1px solid #1F1F1F', 
                bgcolor: '#141414', 
                borderRadius: '12px', 
                textAlign: 'center',
                cursor: 'pointer',
                mb: 3,
                transition: '0.2s',
                '&:hover': { bgcolor: '#1A1A1A', borderColor: 'primary.main' }
              }}
            >
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => processFiles(e.target.files)}
              />
              <Box sx={{ 
                width: 48, height: 48, bgcolor: 'rgba(212, 175, 55, 0.1)', 
                borderRadius: '12px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', mx: 'auto', mb: 2 
              }}>
                <AddPhotoAlternate sx={{ color: 'primary.main' }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>Drag images or click to upload</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                Up to 12 images · Max 2MB per file
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {(formValues.images || []).map((img, idx) => (
                <Grid size={4} key={idx}>
                  <Box sx={{ 
                    width: '100%', 
                    pt: '75%', 
                    position: 'relative', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    bgcolor: '#141414',
                    border: '1px solid #1F1F1F'
                  }}>
                    <Box component="img" src={img} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {/* COVER BADGE */}
                    {idx === formValues.coverImageIndex && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        bgcolor: 'primary.main', 
                        color: 'black', 
                        px: 1, 
                        py: 0.5, 
                        fontSize: '9px', 
                        fontWeight: 900,
                        zIndex: 2,
                        borderRadius: '0 0 4px 0'
                      }}>
                        MAIN
                      </Box>
                    )}

                    <Box sx={{ position: 'absolute', top: 4, right: 4, display: 'flex', gap: 0.5, zIndex: 3 }}>
                      {/* SET AS COVER BUTTON */}
                      <Tooltip title={idx === formValues.coverImageIndex ? "Current Cover" : "Set as Cover"}>
                        <IconButton 
                          size="small" 
                          onClick={() => setValue('coverImageIndex', idx)}
                          sx={{ 
                            bgcolor: idx === formValues.coverImageIndex ? 'primary.main' : 'black', 
                            border: '1px solid',
                            borderColor: idx === formValues.coverImageIndex ? 'primary.main' : '#333',
                            '&:hover': { bgcolor: idx === formValues.coverImageIndex ? 'primary.main' : 'rgba(255,255,255,0.1)' } 
                          }}
                        >
                          {idx === formValues.coverImageIndex ? (
                            <Star sx={{ fontSize: 12, color: 'black' }} />
                          ) : (
                            <StarBorder sx={{ fontSize: 12, color: 'white' }} />
                          )}
                        </IconButton>
                      </Tooltip>

                      {/* DELETE BUTTON */}
                      <IconButton 
                        size="small" 
                        onClick={() => {
                          const newImages = [...formValues.images];
                          newImages.splice(idx, 1);
                          setValue('images', newImages);
                          
                          // Handle cover index on delete
                          if (formValues.coverImageIndex === idx) {
                            setValue('coverImageIndex', 0);
                          } else if (formValues.coverImageIndex > idx) {
                            setValue('coverImageIndex', formValues.coverImageIndex - 1);
                          }
                        }}
                        sx={{ 
                          bgcolor: 'black', 
                          border: '1px solid #333',
                          '&:hover': { bgcolor: '#F44336', borderColor: '#F44336' } 
                        }}
                      >
                        <Delete sx={{ fontSize: 12, color: 'white' }} />
                      </IconButton>
                    </Box>

                    {/* SELECTION OVERLAY */}
                    {idx === formValues.coverImageIndex && (
                      <Box sx={{ 
                        position: 'absolute', 
                        inset: 0, 
                        border: '2px solid', 
                        borderColor: 'primary.main', 
                        pointerEvents: 'none',
                        borderRadius: '8px'
                      }} />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* ── RIGHT COLUMN: MEDIA & PREVIEW ──────────────────────────── */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* PUBLICATION STATUS */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 800, 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'rgba(255,255,255,0.7)'
            }}>
              <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
              Publication Status
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 3, textAlign: 'center' }}>
                {formValues.status === 'Published' 
                  ? "This project is currently public on the website gallery." 
                  : "This project is currently a draft and won't be visible to the public."}
              </Typography>

              <Button 
                fullWidth 
                variant="contained" 
                onClick={handlePublishClick}
                disabled={isSubmitting}
                sx={{ 
                  borderRadius: '12px', 
                  py: 1.5, 
                  fontWeight: 800, 
                  fontSize: '0.95rem'
                }}
              >
                Publish Project
              </Button>
            </Box>
          </Paper>

          {/* CARD PREVIEW */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 800, 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'rgba(255,255,255,0.7)'
            }}>
              <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
              Card Preview
            </Typography>

            <Box sx={{ 
              width: '100%', 
              bgcolor: '#141414', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '1px solid #1F1F1F',
              mb: 3,
              position: 'relative'
            }}>
              {/* Card Image with Background Logic */}
              <Box sx={{ 
                width: '100%', 
                pt: '100%', 
                position: 'relative', 
                bgcolor: '#1A1A1A', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)',
                  zIndex: 1
                }
              }}>
                {formValues.images?.[formValues.coverImageIndex] ? (
                  <Box component="img" src={formValues.images[formValues.coverImageIndex]} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <AddPhotoAlternate sx={{ position: 'absolute', fontSize: 40, color: 'rgba(255,255,255,0.1)' }} />
                )}

                {/* Card Content Overlay */}
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  p: 3, 
                  zIndex: 2,
                  textAlign: 'left'
                }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 0.5, fontSize: '1.25rem' }}>
                    {formValues.name || 'Project Title'}
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'primary.main', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    display: 'block'
                  }}>
                    {formValues.category || 'CATEGORY'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              This is how the card will look in the site gallery.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      
      <Dialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        PaperProps={{
          sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '400px' }
        }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 700, pt: 3 }}>Publish Project?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            This will make the project visible immediately on the public site gallery. This is a final action.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setIsPublishDialogOpen(false)} 
            sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmPublish} 
            variant="contained" 
            sx={{ fontWeight: 800, px: 3 }}
          >
            Yes, Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
