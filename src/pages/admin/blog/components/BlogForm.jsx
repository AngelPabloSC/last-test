import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Popover,
  Divider
} from '@mui/material';
import Delete           from '@mui/icons-material/Delete';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import User            from '@mui/icons-material/Person';
import Bold            from '@mui/icons-material/FormatBold';
import Italic       from '@mui/icons-material/FormatItalic';
import UnderlineIcon from '@mui/icons-material/FormatUnderlined';
import StrikeIcon   from '@mui/icons-material/FormatStrikethrough';
import ListIcon     from '@mui/icons-material/FormatListBulleted';
import ListOrdered  from '@mui/icons-material/FormatListNumbered';
import QuoteIcon    from '@mui/icons-material/FormatQuote';
import CodeIcon     from '@mui/icons-material/Code';
import LinkIcon     from '@mui/icons-material/Link';
import Minus        from '@mui/icons-material/HorizontalRule';
import Save         from '@mui/icons-material/Save';
import TitleOutlined from '@mui/icons-material/TitleOutlined';
import { EditorContent } from '@tiptap/react';
import { Controller } from 'react-hook-form';
import { validationRules } from '@/utils/validationRules';
import { useBlogForm } from '../../hooks/useBlogForm';
import { useTiptapEditor } from '../../hooks/useTiptapEditor';
import { useSnackbar } from '@/context/SnackbarContext';

/* ── Toolbar button ──────────────────────────────────────────────────────── */
const ToolbarBtn = ({ onClick, active, icon: Icon, tooltip, disabled }) => (
  <Tooltip title={tooltip} arrow>
    <span>
      <IconButton
        size="small"
        disabled={disabled}
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        sx={{
          width: 32,
          height: 32,
          color: active ? 'primary.main' : 'rgba(255,255,255,0.4)',
          bgcolor: active ? 'rgba(212,175,55,0.08)' : 'transparent',
          borderRadius: '6px',
          transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid',
          borderColor: active ? 'rgba(212,175,55,0.2)' : 'transparent',
          '&:hover': { 
            bgcolor: 'rgba(255,255,255,0.05)', 
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.1)'
          },
          '&.Mui-disabled': { opacity: 0.1 }
        }}
      >
        <Icon sx={{ fontSize: 17 }} />
      </IconButton>
    </span>
  </Tooltip>
);

/* ── Heading label button ────────────────────────────────────────────────── */
const HeadingBtn = ({ level, onClick, active, tooltip }) => (
  <Tooltip title={tooltip} arrow>
    <Box
      component="button"
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      sx={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: active ? 'rgba(212,175,55,0.08)' : 'transparent',
        color: active ? 'primary.main' : 'rgba(255,255,255,0.4)',
        borderRadius: '6px',
        border: '1px solid',
        borderColor: active ? 'rgba(212,175,55,0.2)' : 'transparent',
        cursor: 'pointer',
        fontWeight: 800,
        fontFamily: "'Inter', sans-serif",
        fontSize: level === 1 ? '13px' : level === 2 ? '11px' : '10px',
        transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.05)',
          color: '#fff',
          borderColor: 'rgba(255,255,255,0.1)'
        }
      }}
    >
      H{level}
    </Box>
  </Tooltip>
);


/* ════════════════════════════════════════════════════════════════════════════
   BlogForm
   ════════════════════════════════════════════════════════════════════════════ */
export default function BlogForm({ initialData = {}, onSubmit, onStatusChange, isSubmitting }) {
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
    editor,
    isActive,
    linkOpen,
    linkUrl,
    setLinkUrl,
    toggleLinkPopover,
    confirmLink,
    cancelLink,
    onLinkInputBlur,
    addImage,
  } = useTiptapEditor((html) => setValue('content', html));

  const { showSnackbar } = useSnackbar();
  const editorFileInputRef = React.useRef(null);

  const handleEditorImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1MB limit for editor images
    if (file.size > 1 * 1024 * 1024) {
      showSnackbar('Editor images must be under 1MB.', 'error');
      return;
    }

    // Limit to one image in the content
    if (editor.getHTML().includes('<img')) {
      showSnackbar('Only one image is allowed in the article content.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      addImage(event.target.result);
      // Reset input
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (editor && initialData.content && !editor.getHTML().includes(initialData.content.substring(10, 30))) {
      editor.commands.setContent(initialData.content);
    }
  }, [editor, initialData.content]);

  return (
    <Box component="form" onSubmit={handleSaveClick}>
      <Grid container spacing={4}>

        {/* ══════════════════════════════════════════════════════════════════
            LEFT COLUMN — Title · Author · Editor
            ══════════════════════════════════════════════════════════════════ */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F' }}>

            {/* Section header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
              <Box sx={{ width: 4, height: 20, bgcolor: 'primary.main', borderRadius: '2px' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>Article Content</Typography>
            </Box>

            <Stack spacing={3}>
              {/* Title */}
              <Controller
                name="title"
                control={control}
                rules={{ required: validationRules.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Post Title"
                    placeholder="e.g. 5 Tips for a Durable Roof"
                    variant="filled"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleOutlined sx={{ color: 'primary.main', fontSize: 20 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                  />
                )}
              />

              {/* Author — right below title */}
              <Controller
                name="author"
                control={control}
                rules={{ required: validationRules.required }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Author"
                    placeholder="e.g. John Smith"
                    variant="filled"
                    error={!!errors.author}
                    helperText={errors.author?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User sx={{ color: 'primary.main', fontSize: 20 }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
                  />
                )}
              />

              {/* ── Rich-text editor ─────────────────────────────────────── */}
              <Box sx={{ border: '1px solid #1F1F1F', borderRadius: '12px', overflow: 'hidden' }}>

                {/* TOOLBAR */}
                <Box
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderBottom: '1px solid #1F1F1F',
                    bgcolor: '#111',
                  }}
                >
                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    gap={1.5}
                    sx={{ 
                      flexWrap: 'nowrap', 
                      overflowX: 'auto',
                      pb: { xs: 0.5, sm: 0 },
                      '&::-webkit-scrollbar': { height: 3 },
                      '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                      '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 10 }
                    }}
                  >
                    {/* Headings group */}
                    <Stack direction="row" spacing={0.25}>
                      <HeadingBtn
                        level={1}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={isActive('heading', { level: 1 })}
                        tooltip="Heading 1"
                      />
                      <HeadingBtn
                        level={2}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={isActive('heading', { level: 2 })}
                        tooltip="Heading 2"
                      />
                      <HeadingBtn
                        level={3}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={isActive('heading', { level: 3 })}
                        tooltip="Heading 3"
                      />
                    </Stack>

                    {/* Text format group */}
                    <Stack direction="row" spacing={0.25}>
                      <ToolbarBtn icon={Bold}         onClick={() => editor.chain().focus().toggleBold().run()}       active={isActive('bold')}      tooltip="Bold (Ctrl+B)" />
                      <ToolbarBtn icon={Italic}       onClick={() => editor.chain().focus().toggleItalic().run()}     active={isActive('italic')}    tooltip="Italic (Ctrl+I)" />
                      <ToolbarBtn icon={UnderlineIcon} onClick={() => editor.chain().focus().toggleUnderline().run()} active={isActive('underline')} tooltip="Underline (Ctrl+U)" />
                      <ToolbarBtn icon={StrikeIcon}   onClick={() => editor.chain().focus().toggleStrike().run()}     active={isActive('strike')}    tooltip="Strikethrough" />
                    </Stack>

                    {/* Lists group */}
                    <Stack direction="row" spacing={0.25}>
                      <ToolbarBtn icon={ListIcon}     onClick={() => editor.chain().focus().toggleBulletList().run()}  active={isActive('bulletList')}  tooltip="Bullet List" />
                      <ToolbarBtn icon={ListOrdered}  onClick={() => editor.chain().focus().toggleOrderedList().run()} active={isActive('orderedList')} tooltip="Numbered List" />
                    </Stack>

                    {/* Block group */}
                    <Stack direction="row" spacing={0.25}>
                      <ToolbarBtn icon={QuoteIcon}    onClick={() => editor.chain().focus().toggleBlockquote().run()} active={isActive('blockquote')} tooltip="Blockquote" />
                      <ToolbarBtn icon={CodeIcon}     onClick={() => editor.chain().focus().toggleCode().run()}       active={isActive('code')}       tooltip="Inline Code" />
                    </Stack>

                    {/* Utilities & Media */}
                    <Stack direction="row" spacing={0}>
                      <ToolbarBtn icon={LinkIcon}           onClick={toggleLinkPopover}                                     active={isActive('link')}       tooltip="Insert Link" />
                      <ToolbarBtn icon={AddPhotoAlternate} onClick={() => editorFileInputRef.current?.click()}            tooltip="Insert Image" />
                      <ToolbarBtn icon={Minus}              onClick={() => editor.chain().focus().setHorizontalRule().run()} tooltip="Horizontal Rule" />
                    </Stack>
                  </Stack>
                  <input
                    type="file"
                    hidden
                    ref={editorFileInputRef}
                    accept="image/*"
                    onChange={handleEditorImageChange}
                  />
                </Box>

                {/* EDITOR AREA */}
                <Box
                  sx={{
                    bgcolor: '#0A0A0A',
                    minHeight: 420,
                    '& .ProseMirror': {
                      p: 3,
                      outline: 'none',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      minHeight: 400,
                      cursor: 'text',
                      '& p.is-editor-empty:first-of-type::before': {
                        content: 'attr(data-placeholder)',
                        color: 'rgba(255,255,255,0.2)',
                        pointerEvents: 'none',
                        float: 'left',
                        height: 0,
                      },
                      '& p': { mb: 1.5 },
                      '& h1': { color: '#fff', mb: 1.5, mt: 2, fontWeight: 900, fontSize: '1.75rem' },
                      '& h2': { color: '#fff', mb: 1.5, mt: 2, fontWeight: 800, fontSize: '1.375rem' },
                      '& h3': { color: '#fff', mb: 1,   mt: 1.5, fontWeight: 700, fontSize: '1.125rem' },
                      '& ul, & ol': { pl: 3, mb: 1.5 },
                      '& li': { mb: 0.5 },
                      '& blockquote': {
                        borderLeft: '3px solid',
                        borderColor: 'primary.main',
                        pl: 2,
                        ml: 0,
                        color: 'rgba(255,255,255,0.6)',
                        fontStyle: 'italic',
                        my: 2,
                      },
                      '& code': {
                        bgcolor: 'rgba(255,255,255,0.06)',
                        color: '#D4AF37',
                        px: 0.75,
                        py: 0.25,
                        borderRadius: '4px',
                        fontSize: '0.875em',
                        fontFamily: 'monospace',
                      },
                      '& hr': {
                        border: 'none',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        my: 3,
                      },
                      '& a': { color: 'primary.main', textDecoration: 'underline' },
                    }
                  }}
                >
                  <EditorContent editor={editor} />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT COLUMN — Settings · Featured Image · Description
            ══════════════════════════════════════════════════════════════════ */}
        <Grid size={{ xs: 12, lg: 4 }}>

          {/* ── 1. SETTINGS (first) ──────────────────────────────────────── */}
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
              Settings
            </Typography>

            <Stack spacing={3}>
              {/* Visibility */}
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1, display: 'block', fontWeight: 700, letterSpacing: '0.8px' }}>
                  VISIBILITY
                </Typography>
                <ToggleButtonGroup
                  value={formValues.status}
                  exclusive
                  onChange={handleUserStatusToggle}
                  sx={{
                    width: '100%',
                    bgcolor: '#141414',
                    p: 0.5,
                    borderRadius: '10px',
                    border: '1px solid #1F1F1F',
                    '& .MuiToggleButton-root': {
                      flex: 1,
                      border: 'none',
                      borderRadius: '7px !important',
                      color: 'rgba(255,255,255,0.4)',
                      fontWeight: 800,
                      textTransform: 'none',
                      fontSize: '0.8125rem',
                      py: 1.25
                    },
                    '& .MuiToggleButton-root.Mui-selected': {
                      bgcolor: formValues.status === 'Visible' ? '#4ADE80 !important' : 'primary.main !important',
                      color: '#000 !important'
                    }
                  }}
                >
                  <ToggleButton value="Hidden">Draft</ToggleButton>
                  <ToggleButton value="Visible">Published</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', mt: 1, display: 'block', textAlign: 'center' }}>
                  {formValues.status === 'Visible'
                    ? 'Visible to everyone on the blog.'
                    : 'Only visible to admins.'}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

              {/* Save button */}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting ? null : <Save sx={{ fontSize: 18 }} />}
                sx={{ borderRadius: '10px', py: 1.5, fontWeight: 800, fontSize: '0.875rem' }}
              >
                {isSubmitting ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}
              </Button>
            </Stack>
          </Paper>

          {/* ── 2. FEATURED IMAGE & EXCERPT ─────────────────────────── */}
          <Paper sx={{ p: 4, bgcolor: '#0A0A0A', borderRadius: '12px', border: '1px solid #1F1F1F', mb: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" sx={{
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'rgba(255,255,255,0.7)'
              }}>
                <Box sx={{ width: 4, height: 18, bgcolor: 'primary.main', borderRadius: '2px' }} />
                Media & Summary
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 5, md: 5 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1.5, display: 'block', fontWeight: 700, letterSpacing: '0.8px' }}>
                  FEATURED IMAGE
                </Typography>
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    width: '100%',
                    pt: '75%', // 4:3 for more horizontal feel in side-by-side
                    position: 'relative',
                    borderRadius: '10px',
                    bgcolor: '#141414',
                    border: '1px dashed',
                    borderColor: formValues.photo ? 'primary.main' : '#2A2A2A',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: '#181818',
                      borderColor: 'primary.main',
                    }
                  }}
                >
                  {formValues.photo ? (
                    <Box
                      component="img"
                      src={formValues.photo}
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}>
                      <AddPhotoAlternate sx={{ color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '9px' }}>
                        UPLOAD
                      </Typography>
                    </Box>
                  )}

                  {formValues.photo && (
                    <IconButton
                      size="small"
                      onClick={(e) => { e.stopPropagation(); removeImage(); }}
                      sx={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        '&:hover': { bgcolor: '#F44336' }
                      }}
                    >
                      <Delete sx={{ fontSize: 12, color: 'white' }} />
                    </IconButton>
                  )}
                </Box>
                <input type="file" hidden ref={fileInputRef} accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
              </Grid>

              <Grid size={{ xs: 12, sm: 7, md: 7 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1.5, display: 'block', fontWeight: 700, letterSpacing: '0.8px' }}>
                  SHORT EXCERPT
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: validationRules.required }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Article summary..."
                      multiline
                      rows={5}
                      variant="filled"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      sx={{
                        '& .MuiFilledInput-root': { bgcolor: '#141414', fontSize: '0.875rem', borderRadius: '8px' },
                        '& .MuiInputLabel-root': { display: 'none' }
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* ── Link popover ─────────────────────────────────────────────────── */}
      <Popover
        open={linkOpen}
        anchorEl={editor?.view.dom}
        onClose={cancelLink}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 2,
            bgcolor: '#141414',
            border: '1px solid #333',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
          }
        }}
      >
        <Stack spacing={2} sx={{ width: 280 }}>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '1px' }}>
            INSERT LINK
          </Typography>
          <TextField
            autoFocus
            size="small"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') confirmLink(); if (e.key === 'Escape') cancelLink(); }}
            placeholder="https://..."
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: '#000', fontSize: '0.875rem' } }}
          />
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={cancelLink} sx={{ color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: 700 }}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={confirmLink} sx={{ fontWeight: 800, textTransform: 'none' }}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {/* ── Confirm publish dialog ───────────────────────────────────────── */}
      <Dialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        PaperProps={{ sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '400px' } }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 700, pt: 3 }}>
          {isEdit ? 'Update Article?' : 'Publish Article?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {isEdit
              ? 'Changes will be live immediately on the public blog.'
              : 'This will make the article visible on the public blog.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setIsPublishDialogOpen(false)} sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
            Cancel
          </Button>
          <Button onClick={confirmSubmit} variant="contained" sx={{ fontWeight: 800, px: 3 }}>
            Yes, Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Confirm status change dialog ─────────────────────────────────── */}
      <Dialog
        open={isStatusDialogOpen}
        onClose={() => setIsStatusDialogOpen(false)}
        PaperProps={{ sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '400px' } }}
      >
        <DialogTitle sx={{ color: 'white', fontWeight: 700, pt: 3 }}>
          Change Visibility?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Are you sure you want to {pendingStatus === 'Visible' ? 'publish' : 'hide'} this article? The change will take effect immediately.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setIsStatusDialogOpen(false)} sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>
            Cancel
          </Button>
          <Button
            onClick={confirmStatusChange}
            variant="contained"
            sx={{ fontWeight: 800, px: 3 }}
          >
            Yes, Change
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
