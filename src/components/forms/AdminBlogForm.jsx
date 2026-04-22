import React, { useRef } from 'react';
import { 
  Box, Grid, TextField, MenuItem, Button, Typography, 
  Paper, IconButton, Tooltip, InputAdornment,
  ToggleButton, ToggleButtonGroup, useTheme, CircularProgress
} from '@mui/material';
import Save             from '@mui/icons-material/Save';
import ArrowBack        from '@mui/icons-material/ArrowBack';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import Info             from '@mui/icons-material/Info';
import Person           from '@mui/icons-material/Person';
import Category         from '@mui/icons-material/Category';
import Delete           from '@mui/icons-material/Delete';
import Visibility       from '@mui/icons-material/Visibility';
import VisibilityOff    from '@mui/icons-material/VisibilityOff';
import { Controller } from 'react-hook-form';

import { EditorContent } from '@tiptap/react';

import { validationRules } from '@/utils/validationRules';
import { useBlogForm } from '@/pages/admin/hooks/useBlogForm';
import { useTiptapEditor } from '@/pages/admin/hooks/useTiptapEditor';
import { Icon } from '@iconify/react';
import { LinkDialog } from '@/components/dialogs/AdminBlogEditorDialogs';
import AdminActionDialog, { StatusToggleDialog } from '@/components/dialogs/AdminActionDialog';


const EditorToolbar = ({ editor, isActive, toggleLinkPopover, onImageClick }) => {
  if (!editor) return null;

  const tools = [
    { icon: 'mdi:format-bold',       action: () => editor.chain().focus().toggleBold().run(),      active: isActive('bold') },
    { icon: 'mdi:format-italic',     action: () => editor.chain().focus().toggleItalic().run(),    active: isActive('italic') },
    { icon: 'mdi:format-underline',  action: () => editor.chain().focus().toggleUnderline().run(), active: isActive('underline') },
    { icon: 'mdi:format-header-1',   action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: isActive('heading', { level: 1 }) },
    { icon: 'mdi:format-header-2',   action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: isActive('heading', { level: 2 }) },
    { icon: 'mdi:format-list-bulleted', action: () => editor.chain().focus().toggleBulletList().run(), active: isActive('bulletList') },
    { icon: 'mdi:format-list-numbered', action: () => editor.chain().focus().toggleOrderedList().run(), active: isActive('orderedList') },
    { icon: 'mdi:format-quote-close', action: () => editor.chain().focus().toggleBlockquote().run(), active: isActive('blockquote') },
    { icon: 'mdi:link-variant',      action: toggleLinkPopover,                                   active: isActive('link') },
    { icon: 'mdi:image-plus',        action: onImageClick,                                        active: false },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, p: 1, borderBottom: '1px solid #1F1F1F', bgcolor: '#0F0F0F' }}>
      {tools.map((tool, i) => (
        <IconButton
          key={i}
          size="small"
          onClick={tool.action}
          sx={{ 
            color: tool.active ? 'primary.main' : 'rgba(255,255,255,0.4)',
            bgcolor: tool.active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
            borderRadius: '4px',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
          }}
        >
          <Icon icon={tool.icon} fontSize={18} />
        </IconButton>
      ))}
      <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#1F1F1F' }} />
      <IconButton 
        size="small" 
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: 'white' } }}
      >
        <Icon icon="mdi:minus" fontSize={18} />
      </IconButton>
    </Box>
  );
};

const Divider = ({ orientation, flexItem, sx }) => (
    <Box sx={{ 
        width: orientation === 'vertical' ? '1px' : '100%', 
        height: orientation === 'vertical' ? 'auto' : '1px', 
        bgcolor: '#1F1F1F', 
        ...sx 
    }} />
);

export default function AdminBlogForm({ initialData = {}, onSubmit, onStatusChange, isSubmitting }) {
  const theme = useTheme();
  const {
    isEdit,
    control,
    handleSubmit,
    errors,
    formValues,
    fileInputRef,
    isPublishDialogOpen,
    setIsPublishDialogOpen,
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    isUpdatingStatus,
    pendingStatus,
    handleUserStatusToggle,
    confirmStatusChange,
    handleSaveClick,
    confirmSubmit,
    handleImageChange,
    removeImage,
    setValue
  } = useBlogForm({ initialData, onSubmit, onStatusChange });

  const { 
    editor, isActive, toggleLinkPopover,
    linkOpen, linkUrl, setLinkUrl, confirmLink, cancelLink, removeLink,
    addImage
  } = useTiptapEditor((html) => {
    setValue('content', html);
  });

  const contentImageInputRef = useRef(null);

  const handleContentImageClick = () => {
    contentImageInputRef.current?.click();
  };

  const handleContentImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 1MB as requested previously
    if (file.size > 1 * 1024 * 1024) {
      alert("Image is too large. Maximum size is 1MB for article content images.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      addImage(base64);
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };


  // Initialize editor content if editing
  React.useEffect(() => {
    if (editor && initialData.content && !editor.getHTML().includes(initialData.content.substring(0, 10))) {
      editor.commands.setContent(initialData.content);
    }
  }, [editor, initialData.content]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Grid container spacing={4}>
        {/* LEFT COLUMN: EDITOR & CONTENT */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info sx={{ color: 'primary.main' }} /> Article Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid size={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: validationRules.required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Article Title"
                      placeholder="e.g. 5 Tips for a Durable Roof"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      variant="filled"
                      sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  name="author"
                  control={control}
                  rules={{ required: validationRules.required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Author Name"
                      placeholder="e.g. John Doe"
                      InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'primary.main' }} /></InputAdornment> }}
                      error={!!errors.author}
                      helperText={errors.author?.message}
                      variant="filled"
                      sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                    />
                  )}
                />
              </Grid>

              {/* Rich Text Editor */}
              <Grid size={12}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1, display: 'block', fontWeight: 700 }}>
                  ARTICLE CONTENT
                </Typography>
                <Box sx={{ 
                  border: '1px solid #1F1F1F', 
                  borderRadius: '8px', 
                  overflow: 'hidden',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: '#050505'
                }}>
                  <EditorToolbar 
                    editor={editor} 
                    isActive={isActive} 
                    toggleLinkPopover={toggleLinkPopover} 
                    onImageClick={handleContentImageClick}
                  />
                  <Box sx={{ 
                    p: 2, 
                    flex: 1, 
                    '& .ProseMirror': { 
                      outline: 'none', 
                      color: '#ccc',
                      minHeight: 350,
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.6,
                      '& p': { mb: 2 },
                      '& h1, & h2, & h3': { color: 'white', mb: 2, mt: 3 },
                      '& ul, & ol': { pl: 3, mb: 2 },
                      '& blockquote': { borderLeft: '3px solid #D4AF37', pl: 2, color: '#888', fontStyle: 'italic', mb: 2 },
                      '& hr': { border: 'none', borderTop: '1px solid #1F1F1F', my: 3 },
                      '& a': { color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }
                    } 
                  }}>
                  <EditorContent editor={editor} />
                </Box>
              </Box>

              <input 
                type="file" 
                ref={contentImageInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleContentImageChange}
              />

              {errors.content && (
                <Typography variant="caption" sx={{ color: 'error.main', mt: 1 }}>{errors.content.message}</Typography>
              )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: OPTIONS & PREVIEW */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* PUBLICATION STATUS */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5,
              textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)'
            }}>
              <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
              Publication Status
            </Typography>

            <ToggleButtonGroup
              value={pendingStatus || formValues.status}
              exclusive
              onChange={handleUserStatusToggle}
              disabled={isUpdatingStatus}
              sx={{ 
                width: '100%', mb: 2, bgcolor: '#141414', p: 0.5, borderRadius: '12px', border: '1px solid #1F1F1F',
                '& .MuiToggleButton-root': { 
                  flex: 1, border: 'none', borderRadius: '8px !important', 
                  color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'none', py: 1.5,
                  display: 'flex', gap: 1, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                },
                '& .MuiToggleButton-root.Mui-selected': {
                  bgcolor: (pendingStatus || formValues.status) === 'Visible' ? 'rgba(74, 222, 128, 0.15) !important' : 'rgba(212, 175, 55, 0.15) !important',
                  color: (pendingStatus || formValues.status) === 'Visible' ? '#4ADE80 !important' : 'primary.main !important',
                  border: `1px solid ${(pendingStatus || formValues.status) === 'Visible' ? '#4ADE80' : '#D4AF37'}50 !important`,
                  boxShadow: `0 0 15px ${(pendingStatus || formValues.status) === 'Visible' ? '#4ADE80' : '#D4AF37'}20`
                }
              }}
            >
              <ToggleButton value="Hidden">
                <VisibilityOff sx={{ fontSize: 18 }} />
                {isUpdatingStatus && pendingStatus === 'Hidden' ? <CircularProgress size={16} color="inherit" /> : 'Borrador'}
              </ToggleButton>
              <ToggleButton value="Visible">
                <Visibility sx={{ fontSize: 18 }} />
                {isUpdatingStatus && pendingStatus === 'Visible' ? <CircularProgress size={16} color="inherit" /> : 'Publicado'}
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 3, textAlign: 'center', fontSize: '0.85rem' }}>
              {(pendingStatus || formValues.status) === 'Visible' 
                ? "This article is currently public on the website blog." 
                : "This article is currently a draft and won't be visible to the public."}
            </Typography>

            <Button 
              fullWidth variant="contained" onClick={handleSaveClick} disabled={isSubmitting}
              sx={{ borderRadius: '12px', py: 1.5, fontWeight: 800, fontSize: '0.90rem' }}
            >
              {isEdit ? 'Update Article Data' : 'Save Article Configuration'}
            </Button>
          </Paper>

          {/* FEATURED IMAGE */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 3 }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5,
              textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)'
            }}>
              <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
              Featured Image
            </Typography>

            <Box 
              onClick={() => fileInputRef.current?.click()}
              sx={{ 
                width: '100%', pt: '60%', position: 'relative', borderRadius: '8px', 
                overflow: 'hidden', bgcolor: '#141414', border: '2px dashed #1F1F1F',
                cursor: 'pointer', transition: '0.2s',
                '&:hover': { borderColor: 'primary.main', bgcolor: '#1A1A1A' }
              }}
            >
              <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
              {formValues.photo ? (
                <Box component="img" src={formValues.photo} sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <AddPhotoAlternate sx={{ fontSize: 32, color: 'rgba(255,255,255,0.1)' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>Click to upload</Typography>
                </Box>
              )}
            </Box>
            {formValues.photo && (
              <Button size="small" color="error" startIcon={<Delete />} onClick={removeImage} sx={{ mt: 1, textTransform: 'none', fontWeight: 700 }}>
                Remove image
              </Button>
            )}
          </Paper>

          {/* EXCERPT / SHORT DESCRIPTION */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F' }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5,
              textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.7)'
            }}>
              <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
              Excerpt / Summary
            </Typography>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Summarize your article for the cards..."
                  variant="filled"
                  sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                />
              )}
            />
          </Paper>
        </Grid>
      </Grid>

      <StatusToggleDialog 
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        onConfirm={confirmStatusChange}
        pendingStatus={pendingStatus}
        context="blog"
      />

      <ActionConfirmDialog 
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        onConfirm={confirmSubmit}
        isEdit={isEdit}
        context="blog"
      />

      <LinkDialog 
        open={linkOpen}
        onClose={cancelLink}
        onConfirm={confirmLink}
        onRemove={removeLink}
        url={linkUrl}
        setUrl={setLinkUrl}
      />
    </Box>
  );
}
