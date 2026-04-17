import {
  Box,
  Typography,
  InputBase,
  Grid,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import { useRef } from 'react';
import SendOutlinedIcon         from '@mui/icons-material/SendOutlined';
import EditOutlinedIcon         from '@mui/icons-material/EditOutlined';
import FormatBoldIcon           from '@mui/icons-material/FormatBold';
import FormatItalicIcon         from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon     from '@mui/icons-material/FormatUnderlined';
import InsertLinkIcon           from '@mui/icons-material/InsertLink';
import FormatListBulletedIcon   from '@mui/icons-material/FormatListBulleted';
import HorizontalRuleIcon       from '@mui/icons-material/HorizontalRule';
import FormatSizeIcon           from '@mui/icons-material/FormatSize';
import AttachFileIcon           from '@mui/icons-material/AttachFile';
import InboxOutlinedIcon        from '@mui/icons-material/InboxOutlined';
import CloseIcon                from '@mui/icons-material/Close';


import { EditorContent }        from '@tiptap/react';
import { useAdminEmail }   from './hooks/useAdminEmail';
import { useTiptapEditor } from './hooks/useTiptapEditor';




function RecipientChip({ name, email, onRemove }) {
  const theme = useTheme();
  return (
    <Tooltip title={email} arrow placement="top">
      <Chip
        label={name}
        onDelete={() => onRemove(email)}
        deleteIcon={<CloseIcon />}
        size="small"
        sx={{
          bgcolor: 'rgba(255,215,0,0.08)',
          color: 'primary.main',
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: '20px',
          fontSize: 12,
          fontWeight: 600,
          height: 26,
          '& .MuiChip-deleteIcon': {
            color: 'primary.main',
            fontSize: 14,
            '&:hover': { color: theme.palette.primary.light },
          },
        }}
      />
    </Tooltip>
  );
}

function TiptapEditor({ onUpdate }) {
  const theme = useTheme();
  const {
    editor,
    isActive,
    linkOpen, linkUrl, setLinkUrl,
    toggleLinkPopover, confirmLink, cancelLink, onLinkInputBlur, removeLink,
  } = useTiptapEditor(onUpdate);

  if (!editor) return null;

  const btnSx = (name, attrs) => ({
    width: 30,
    height: 30,
    borderRadius: '6px',
    color: isActive(name, attrs) ? 'primary.main' : theme.palette.text.disabled,
    bgcolor: isActive(name, attrs) ? 'rgba(255,215,0,0.1)' : 'transparent',
    border: 'none',
    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: theme.palette.text.secondary },
    transition: 'all 0.12s',
  });

  return (
    <Box>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 0.25,
          px: 2, py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <Tooltip title="Bold" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().toggleBold().run()} sx={btnSx('bold')}>
            <FormatBoldIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().toggleItalic().run()} sx={btnSx('italic')}>
            <FormatItalicIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().toggleUnderline().run()} sx={btnSx('underline')}>
            <FormatUnderlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Heading H1" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} sx={btnSx('heading', { level: 1 })}>
            <FormatSizeIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Box sx={{ width: 1, height: 18, bgcolor: theme.palette.divider, mx: 0.5 }} />
        <Tooltip title="List" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().toggleBulletList().run()} sx={btnSx('bulletList')}>
            <FormatListBulletedIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Separator" arrow>
          <IconButton size="small" onClick={() => editor.chain().focus().setHorizontalRule().run()} sx={btnSx('horizontalRule')}>
            <HorizontalRuleIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title={isActive('link') ? 'Edit link' : 'Insert link'} arrow>
          <IconButton size="small" sx={btnSx('link')} onMouseDown={toggleLinkPopover}>
            <InsertLinkIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Box sx={{ width: 1, height: 18, bgcolor: theme.palette.divider, mx: 0.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <InboxOutlinedIcon sx={{ fontSize: 14, color: theme.palette.text.disabled }} />
          <Typography sx={{ fontSize: 12, color: theme.palette.text.disabled }}>Templates</Typography>
        </Box>
      </Box>


      {linkOpen && (
        <Box
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            px: 2, py: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: 'rgba(255,215,0,0.04)',
          }}
        >
          <InsertLinkIcon sx={{ fontSize: 15, color: 'primary.main', flexShrink: 0 }} />
          <Box
            component="input"
            autoFocus
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); confirmLink(); }
              if (e.key === 'Escape') cancelLink();
            }}
            onBlur={onLinkInputBlur}
            sx={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: theme.palette.text.primary, fontSize: 13,
              fontFamily: 'Inter,sans-serif',
              '&::placeholder': { color: theme.palette.text.disabled },
            }}
          />
          <Box
            component="button"
            onMouseDown={(e) => { e.preventDefault(); confirmLink(); }}
            sx={{
              bgcolor: 'primary.main', border: 'none', borderRadius: '6px',
              px: 1.5, py: 0.5, cursor: 'pointer',
              color: '#111', fontSize: 12, fontWeight: 700, fontFamily: 'Inter,sans-serif',
            }}
          >
            Apply
          </Box>
          {isActive('link') && (
            <Box
              component="button"
              onMouseDown={(e) => { e.preventDefault(); removeLink(); cancelLink(); }}
              sx={{
                background: 'none', border: `1px solid ${theme.palette.divider}`,
                borderRadius: '6px', px: 1.5, py: 0.5, cursor: 'pointer',
                color: theme.palette.text.secondary, fontSize: 12, fontFamily: 'Inter,sans-serif',
              }}
            >
              Remove
            </Box>
          )}
        </Box>
      )}

      {/* Editor area */}
      <Box
        sx={{
          '& .ProseMirror': {
            outline: 'none', minHeight: 200,
            p: '16px 20px', fontSize: 14, lineHeight: 1.6,
            color: theme.palette.text.primary, fontFamily: 'Inter,sans-serif',
            '& h1': { fontSize: 22, fontWeight: 700, mb: 1 },
            '& h2': { fontSize: 18, fontWeight: 600, mb: 1 },
            '& p':  { m: 0, mb: 0.5 },
            '& ul': { pl: 3, mb: 1 },
            '& a':  { color: 'primary.main', textDecoration: 'underline' },
            '& hr': { borderColor: theme.palette.divider, my: 2 },
            '& strong': { fontWeight: 700 },
            '& em': { fontStyle: 'italic' },
            '& u':  { textDecoration: 'underline' },
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EmailsPage() {
  const theme = useTheme();

  const fileInputRef = useRef(null);

  const {
    recipients,
    recipientInput,
    subject,
    isSending,
    sendSuccess,
    isComposerReady,
    attachments,
    confirmDialog,
    resetKey,
    setRecipientInput,
    setSubject,
    setBody,
    handleRecipientKeyDown,
    addRecipient,
    removeRecipient,
    addAttachments,
    removeAttachment,
    requestSendConfirm,
    cancelSend,
    confirmSend,
    suggestions,
  } = useAdminEmail();


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2.5, md: 3.5 },
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, md: 4 },
        flexGrow: 1,
        minHeight: '100%',
        bgcolor: '#000000',
        color: theme.palette.text.primary,
      }}
    >
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 28, fontWeight: 800, color: theme.palette.text.primary }}>
            Send Emails
          </Typography>
          <Typography sx={{ fontSize: 14, color: theme.palette.text.secondary, mt: 0.5 }}>
            Compose and send emails to your clients
          </Typography>
        </Box>

      </Box>



      <Box
        sx={{
          display: 'flex',
          gap: { xs: 0, md: 2.5 },
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >

        <Box
          sx={{
            flex: 1,
            width: '100%',
            bgcolor: '#0A0A0A',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '14px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2.5,
              py: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.text.primary }}>
              New Email
            </Typography>
          </Box>

          {/* To field + autocomplete suggestions */}
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 0.75,
                px: 2.5,
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                minHeight: 48,
              }}
            >
              <Typography
                component="span"
                sx={{ color: theme.palette.text.disabled, fontSize: 13, mr: 0.5, whiteSpace: 'nowrap' }}
              >
                To:
              </Typography>
              {recipients.map((r) => (
                <RecipientChip key={r.email} name={r.name} email={r.email} onRemove={removeRecipient} />
              ))}
              <InputBase
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                onKeyDown={handleRecipientKeyDown}
                placeholder="Add recipient..."
                sx={{
                  flex: 1,
                  minWidth: 120,
                  fontSize: 13,
                  color: theme.palette.text.primary,
                  '& input::placeholder': { color: theme.palette.text.disabled, opacity: 1 },
                }}
              />
            </Box>

            {/* Autocomplete dropdown */}
            {suggestions.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  bgcolor: '#161616',
                  border: `1px solid ${theme.palette.divider}`,
                  borderTop: 'none',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  maxHeight: 240,
                  overflowY: 'auto',
                }}
              >
                {suggestions.map((contact) => (
                  <Box
                    key={contact.email}
                    onClick={() => addRecipient(contact)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 2.5,
                      py: 1.25,
                      cursor: 'pointer',
                      transition: 'background 0.12s',
                      '&:hover': { bgcolor: 'rgba(255,215,0,0.06)' },
                    }}
                  >
                    {/* Avatar */}
                    <Box
                      sx={{
                        width: 28, height: 28, borderRadius: '50%',
                        bgcolor: 'rgba(255,215,0,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ color: 'primary.main', fontSize: 11, fontWeight: 700 }}>
                        {contact.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: theme.palette.text.primary, lineHeight: 1.2 }}>
                        {contact.name}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: theme.palette.text.disabled }}>
                        {contact.email}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Subject field */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              component="span"
              sx={{ color: theme.palette.text.disabled, fontSize: 13, whiteSpace: 'nowrap' }}
            >
              Subject:
            </Typography>
            <InputBase
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Write the subject..."
              fullWidth
              sx={{
                fontSize: 13,
                color: theme.palette.text.primary,
                '& input::placeholder': { color: theme.palette.text.disabled, opacity: 1 },
              }}
            />
          </Box>

          {/* Tiptap rich-text editor — key=resetKey forces remount on every send */}
          <TiptapEditor key={resetKey} onUpdate={setBody} />

          {/* Footer actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
            }}
          >
            {/* Hidden file input */}
            <Box
              component="input"
              type="file"
              multiple
              ref={fileInputRef}
              onChange={addAttachments}
              sx={{ display: 'none' }}
            />

            {/* Adjuntar button */}
            <Box
              component="button"
              onClick={() => fileInputRef.current?.click()}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                background: 'none', border: `1px solid ${theme.palette.divider}`, borderRadius: '7px',
                px: 1.5, py: 0.875, cursor: 'pointer', color: theme.palette.text.secondary,
                fontSize: 13, fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
                '&:hover': { borderColor: theme.palette.text.disabled, color: theme.palette.text.primary },
              }}
            >
              <AttachFileIcon sx={{ fontSize: 15 }} />
              Attach
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Send */}
            <Box
              component="button"
              onClick={requestSendConfirm}
              disabled={!isComposerReady || isSending}
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.75,
                bgcolor: isComposerReady && !isSending ? 'primary.main' : 'rgba(255,215,0,0.25)',
                border: 'none', borderRadius: '7px',
                px: 2, py: 1, cursor: isComposerReady && !isSending ? 'pointer' : 'not-allowed',
                color: '#111111', fontSize: 13, fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
                '&:hover': isComposerReady && !isSending ? { bgcolor: 'primary.light' } : {},
              }}
            >
              {isSending
                ? <CircularProgress size={14} sx={{ color: '#111' }} />
                : <SendOutlinedIcon sx={{ fontSize: 15 }} />
              }
              {isSending ? 'Sending...' : 'Send Email'}
            </Box>
          </Box>

          {/* Attached files chips */}
          {attachments.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.75,
                px: 2.5,
                py: 1,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              {attachments.map((file) => (
                <Chip
                  key={file.name}
                  label={file.name}
                  onDelete={() => removeAttachment(file.name)}
                  deleteIcon={<CloseIcon />}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.04)',
                    color: theme.palette.text.secondary,
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: 11,
                    '& .MuiChip-deleteIcon': { fontSize: 13, color: theme.palette.text.disabled },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Success feedback */}
          {sendSuccess && (
            <Box sx={{ px: 2.5, py: 1.25, bgcolor: 'rgba(34,197,94,0.08)', borderTop: `1px solid rgba(34,197,94,0.2)` }}>
              <Typography sx={{ fontSize: 13, color: '#4ADE80', fontWeight: 600 }}>
                ✓ Email sent successfully
              </Typography>
            </Box>
          )}
        </Box>


      </Box>


      <Dialog
        open={confirmDialog.isOpen}
        onClose={cancelSend}
        PaperProps={{
          sx: {
            bgcolor: '#111111',
            border: (t) => `1px solid ${t.palette.divider}`,
            borderRadius: '16px',
            px: 1,
            minWidth: 360,
            maxWidth: 460,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 3, pt: 3, pb: 2,
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box
              sx={{
                width: 34, height: 34, borderRadius: '10px',
                bgcolor: 'rgba(255,215,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <SendOutlinedIcon sx={{ fontSize: 17, color: 'primary.main' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: 'text.primary' }}>
                Confirm Send
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                Revisa los datos antes de enviar
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={cancelSend} sx={{ color: 'text.disabled' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3, py: 2.5 }}>
          {/* Recipients */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.disabled', letterSpacing: 0.8, mb: 1 }}>
              DESTINATARIOS ({recipients.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {recipients.map((r) => (
                <Tooltip key={r.email} title={r.email} arrow>
                  <Chip
                    label={r.name}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,215,0,0.08)',
                      color: 'primary.main',
                      border: '1px solid rgba(255,215,0,0.2)',
                      fontSize: 11, fontWeight: 600, height: 24,
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* Subject */}
          <Box
            sx={{
              p: 1.75, borderRadius: '10px',
              bgcolor: 'rgba(255,255,255,0.03)',
              border: (t) => `1px solid ${t.palette.divider}`,
              mb: attachments.length > 0 ? 2 : 0,
            }}
          >
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.disabled', letterSpacing: 0.8, mb: 0.5 }}>
              ASUNTO
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.primary', fontWeight: 500 }}>
              {subject}
            </Typography>
          </Box>

          {/* Attachments */}
          {attachments.length > 0 && (
            <Box>
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'text.disabled', letterSpacing: 0.8, mb: 1 }}>
                ADJUNTOS ({attachments.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {attachments.map((f) => (
                  <Chip
                    key={f.name}
                    label={f.name}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.04)',
                      color: 'text.secondary',
                      border: (t) => `1px solid ${t.palette.divider}`,
                      fontSize: 11,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 0, gap: 1, '& > *': { margin: '0 !important' } }}>
          <Box
            component="button"
            onClick={cancelSend}
            sx={{
              flex: 1, background: 'none',
              border: (t) => `1px solid ${t.palette.divider}`,
              borderRadius: '8px', py: 1, px: 2, cursor: 'pointer',
              color: 'text.secondary', fontSize: 13, fontFamily: 'Inter,sans-serif',
              transition: 'all 0.15s',
              '&:hover': { borderColor: 'text.disabled', color: 'text.primary' },
            }}
          >
            Cancelar
          </Box>
          <Box
            component="button"
            onClick={confirmSend}
            sx={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75,
              bgcolor: 'primary.main', border: 'none', borderRadius: '8px',
              py: 1, px: 2, cursor: 'pointer',
              color: '#111', fontSize: 13, fontWeight: 700, fontFamily: 'Inter,sans-serif',
              transition: 'all 0.15s',
              '&:hover': { bgcolor: 'primary.light' },
            }}
          >
            <SendOutlinedIcon sx={{ fontSize: 15 }} />
            Enviar ahora
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
