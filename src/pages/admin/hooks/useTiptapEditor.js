import { useState, useMemo } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit      from '@tiptap/starter-kit';
import Underline       from '@tiptap/extension-underline';
import Link            from '@tiptap/extension-link';
import HorizontalRule  from '@tiptap/extension-horizontal-rule';
import Image           from '@tiptap/extension-image';

/**
 * useTiptapEditor
 *
 * Owns ALL editor logic:
 * - Tiptap editor instance with re-render subscriptions
 * - Toolbar active-state helpers
 * - Link popover state (open / url)
 * - applyLink: handles selection-aware link insertion + exits the mark
 *
 * @param {(html: string) => void} onContentChange  Called on every content update
 */
export function useTiptapEditor(onContentChange) {
  // ── Re-render tick (toolbar active state) ───────────────────────────────────
  const [, setTick]             = useState(0);
  const bump                    = () => setTick((n) => n + 1);

  // ── Link popover state ───────────────────────────────────────────────────────
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl,  setLinkUrl]  = useState('');

  // ── Stable Extensions ───────────────────────────────────────────────────────
  const extensions = useMemo(() => [
    StarterKit.configure({ 
      horizontalRule: false,
      // Just in case this version of StarterKit includes them
      underline: false,
      link: false 
    }),
    Underline.configure(),
    HorizontalRule.configure(),
    Link.configure({ openOnClick: false }),
    Image.configure({
      allowBase64: true,
    }),
  ], []);

  // ── Editor instance ──────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions,
    content: '',
    onUpdate({ editor: ed }) {
      bump();
      onContentChange(ed.getHTML());
    },
    onSelectionUpdate: bump,
    onTransaction:     bump,
  });

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /** Whether a given mark/node is currently active */
  const isActive = (name, attrs) => editor?.isActive(name, attrs) ?? false;

  /**
   * Apply a link correctly:
   * - Text is selected  → set link mark on the selection, move cursor after it
   * - No selection      → insert the URL as linked text, exit the mark
   * Both cases call unsetMark('link') after to clear stored marks so the next
   * character typed is NOT part of the link.
   */
  const applyLink = (url) => {
    if (!editor) return;
    const { empty, to } = editor.state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${url}</a>`)
        .unsetMark('link')
        .run();
    } else {
      editor
        .chain()
        .focus()
        .setLink({ href: url })
        .setTextSelection(to)
        .unsetMark('link')
        .run();
    }
  };

  /** Remove the link mark at the cursor / selection */
  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  /** Insert an image with 80% width and 250px height as requested */
  const addImage = (src) => {
    if (src) {
      editor?.chain()
        .focus()
        .insertContent(`<img src="${src}" width="80%" height="250px" style="width: 80%; height: 250px; object-fit: cover; border-radius: 4px; display: block; margin: 10px auto;" />`)
        .run();
    }
  };

  // ── Link popover handlers ────────────────────────────────────────────────────

  /** Toggle the link popover open/closed (use onMouseDown to keep selection) */
  const toggleLinkPopover = (e) => {
    e?.preventDefault();
    if (linkOpen) {
      setLinkOpen(false);
      setLinkUrl('');
    } else {
      const existing = editor?.getAttributes('link').href ?? '';
      setLinkUrl(existing);
      setLinkOpen(true);
    }
  };

  /** Confirm the URL and close the popover */
  const confirmLink = () => {
    if (linkUrl.trim()) {
      applyLink(linkUrl.trim());
    } else {
      removeLink();
    }
    setLinkOpen(false);
    setLinkUrl('');
  };

  /** Close the popover without applying (e.g. Escape or onBlur) */
  const cancelLink = () => {
    setLinkOpen(false);
    setLinkUrl('');
    editor?.commands.focus();
  };

  /** Auto-close on blur (delayed so Aplicar/Quitar onMouseDown fires first) */
  const onLinkInputBlur = () => {
    setTimeout(() => {
      setLinkOpen(false);
      setLinkUrl('');
    }, 150);
  };

  return {
    editor,
    isActive,
    linkOpen,
    linkUrl,
    setLinkUrl,
    toggleLinkPopover,
    confirmLink,
    cancelLink,
    onLinkInputBlur,
    removeLink,
    addImage,
  };
}
