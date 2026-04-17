import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Search,
  Bell,
  Send,
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  List,
  Quote,
  Tag,
  ChevronDown,
  CloudUpload,
  Paperclip,
  AlignLeft,
  Trash2,
  X,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

/* ─── Design Tokens ──────────────────────────────── */
const C = {
  bg:          '#0B0D17',
  headerBg:    '#0D0F1A',
  surface:     '#131520',
  surfaceDeep: '#0D0D0D',
  surfaceInput:'#1A1D2E',
  border:      '#2D3148',
  borderDark:  '#1E2235',
  borderSub:   '#1F1F1F',
  accent:      '#F5C218',
  accentAlt:   '#FFD700',
  textPrimary: '#FFFFFF',
  textSec:     '#9CA3AF',
  textMuted:   '#6B7280',
  textDim:     '#4B5563',
  green:       '#22C55E',
  red:         '#EF4444',
};

/* ─── Status options ─────────────────────────────── */
const STATUS_OPTIONS = [
  { value: 'visible',  label: 'Visible',  color: C.green },
  { value: 'borrador', label: 'Borrador', color: C.accentAlt },
  { value: 'privado',  label: 'Privado',  color: C.textMuted },
];

/* ─── Toolbar buttons ────────────────────────────── */
const TOOLBAR = [
  { icon: Bold,      title: 'Negrita',     cmd: 'bold' },
  { icon: Italic,    title: 'Cursiva',     cmd: 'italic' },
  { icon: Underline, title: 'Subrayado',   cmd: 'underline' },
  null, // separator
  { icon: Link,      title: 'Enlace',      cmd: 'link' },
  { icon: Image,     title: 'Imagen',      cmd: 'image' },
  { icon: List,      title: 'Lista',       cmd: 'list' },
  { icon: Quote,     title: 'Cita',        cmd: 'quote' },
];

/* ─── Sub-components ─────────────────────────────── */

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div style={{
      background: '#111111',
      border: `1px solid ${C.borderSub}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 44, padding: '0 16px',
        borderBottom: `1px solid ${C.borderSub}`,
      }}>
        <Icon size={14} color={C.accentAlt} />
        <span style={{ color: C.textPrimary, fontSize: 13, fontWeight: 600 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <span style={{
      color: '#555555', fontSize: 11, fontWeight: 600, letterSpacing: 0.8,
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  );
}

function TagChip({ label, onRemove }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      background: C.borderDark,
      borderRadius: 12, height: 24, padding: '0 10px',
    }}>
      <span style={{ color: C.accent, fontSize: 11 }}>{label}</span>
      {onRemove && (
        <button onClick={() => onRemove(label)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, display: 'flex', alignItems: 'center',
        }}>
          <X size={10} color={C.textMuted} />
        </button>
      )}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────── */

export default function AdminNuevaEntrada({ onBack }) {
  const [title, setTitle]           = useState('Bienvenidos a nuestro nuevo blog');
  const [content, setContent]       = useState(
    'Título del post\n\nEste es el contenido principal de la entrada. Aquí puedes escribir párrafos completos, añadir imágenes, insertar enlaces y dar formato a tu texto usando la barra de herramientas de arriba.\n\nEn Nova Solutions creemos en compartir conocimiento y mantenerte siempre informado con las últimas novedades del sector.'
  );
  const [excerpt, setExcerpt]       = useState(
    'En este blog compartiremos las últimas novedades, proyectos y tips del equipo de Nova Solutions. ¡Bienvenidos!'
  );
  const [tags, setTags]             = useState(['nova']);
  const [tagInput, setTagInput]     = useState('');
  const [category, setCategory]     = useState('General');
  const [status, setStatus]         = useState('visible');
  const [pubDate]                   = useState('10 Abr 2026');
  const [imageFile, setImageFile]   = useState(null);
  const [dragOver, setDragOver]     = useState(false);
  const fileRef                     = useRef(null);

  const currentStatus = STATUS_OPTIONS.find(s => s.value === status);

  function addTag(e) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,$/, '');
      if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
      setTagInput('');
    }
  }

  function removeTag(tag) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) setImageFile(file);
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: C.bg,
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      <AdminSidebar activeItem="blog" />

      {/* ── Right panel ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 72,
          padding: '0 24px',
          background: C.headerBg,
          borderBottom: `1px solid ${C.borderDark}`,
          flexShrink: 0,
        }}>
          {/* Back */}
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', padding: 4,
          }}>
            <ArrowLeft size={18} color={C.textSec} />
          </button>

          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700 }}>Nueva Entrada</span>
            <span style={{ color: C.textMuted, fontSize: 11 }}>Crea y publica una nueva entrada de blog</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: C.surfaceInput, border: `1px solid ${C.border}`,
            borderRadius: 8, padding: '0 12px', height: 36, width: 200,
          }}>
            <Search size={14} color={C.textMuted} />
            <input
              placeholder="Buscar..."
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: C.textPrimary, fontSize: 13, fontFamily: 'Inter, sans-serif', width: '100%',
              }}
            />
          </div>

          {/* Bell */}
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: C.surfaceInput, border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <Bell size={18} color={C.textSec} />
          </div>

          {/* Guardar Borrador */}
          <button style={{
            height: 36, padding: '0 16px', borderRadius: 8, cursor: 'pointer',
            background: 'none', border: `1px solid #374151`,
            color: '#D1D5DB', fontSize: 13, fontFamily: 'Inter, sans-serif',
          }}>
            Guardar Borrador
          </button>

          {/* Publicar */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            height: 36, padding: '0 16px', borderRadius: 8, cursor: 'pointer',
            background: C.accent, border: 'none',
            color: '#0D0F1A', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
          }}>
            <Send size={14} color="#0D0F1A" />
            Publicar
          </button>
        </header>

        {/* Content area */}
        <div style={{
          flex: 1, display: 'flex', gap: 20,
          padding: 24, overflowY: 'auto', background: C.bg,
        }}>

          {/* ── Editor column ── */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', gap: 20,
            background: C.bg,
          }}>

            {/* Title input */}
            <div style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
            }}>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título de la entrada..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: C.textPrimary, fontSize: 22, fontWeight: 600,
                  fontFamily: 'Inter, sans-serif', width: '100%',
                }}
              />
            </div>

            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 10, height: 44, padding: '0 16px',
            }}>
              {TOOLBAR.map((btn, i) =>
                btn === null ? (
                  <div key={i} style={{ width: 1, height: 20, background: C.border, margin: '0 2px' }} />
                ) : (
                  <button
                    key={i}
                    title={btn.title}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 30, height: 30, borderRadius: 6, padding: 0,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.borderDark}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <btn.icon size={18} color={C.textSec} />
                  </button>
                )
              )}
            </div>

            {/* Content textarea */}
            <div style={{
              flex: 1,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: 20,
              minHeight: 300,
            }}>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Comienza a escribir el contenido de tu entrada aquí..."
                style={{
                  background: 'none', border: 'none', outline: 'none', resize: 'none',
                  color: '#CCCCCC', fontSize: 14, lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif', width: '100%', height: '100%',
                  minHeight: 280,
                }}
              />
            </div>

            {/* Tags + Category row */}
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Tags */}
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, height: 52, padding: '0 16px',
                flexWrap: 'wrap', overflow: 'hidden',
              }}>
                <Tag size={16} color={C.textMuted} />
                {tags.map(tag => <TagChip key={tag} label={tag} onRemove={removeTag} />)}
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="blog, noticias..."
                  style={{
                    background: 'none', border: 'none', outline: 'none',
                    color: C.textPrimary, fontSize: 13, fontFamily: 'Inter, sans-serif',
                    flex: 1, minWidth: 80,
                  }}
                />
              </div>

              {/* Category dropdown */}
              <div style={{
                width: 180, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 8, background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 10, height: 52, padding: '0 16px', cursor: 'pointer',
              }}>
                <span style={{ color: C.textMuted, fontSize: 13 }}>{category}</span>
                <ChevronDown size={16} color={C.textMuted} />
              </div>
            </div>
          </div>

          {/* ── Settings column ── */}
          <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Publicación card */}
            <SectionCard icon={Send} title="Publicación">
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>

                <FieldLabel>Estado</FieldLabel>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: C.surfaceDeep, border: `1px solid ${C.borderSub}`,
                  borderRadius: 8, height: 38, padding: '0 12px', cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: 4,
                      background: currentStatus.color,
                    }} />
                    <span style={{ color: currentStatus.color, fontSize: 13 }}>
                      {currentStatus.label}
                    </span>
                  </div>
                  <ChevronDown size={14} color="#555555" />
                </div>

                <FieldLabel>Fecha de Publicación</FieldLabel>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: C.surfaceDeep, border: `1px solid ${C.borderSub}`,
                  borderRadius: 8, height: 38, padding: '0 12px',
                }}>
                  <span style={{ color: '#555555', fontSize: 14 }}>📅</span>
                  <span style={{ color: '#888888', fontSize: 13 }}>{pubDate}</span>
                </div>

                <FieldLabel>Autor</FieldLabel>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: C.surfaceDeep, border: `1px solid ${C.borderSub}`,
                  borderRadius: 8, height: 38, padding: '0 12px',
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: 'rgba(255,215,0,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: C.accentAlt, fontSize: 10, fontWeight: 700 }}>AS</span>
                  </div>
                  <span style={{ color: C.textPrimary, fontSize: 13 }}>Angel Sarango</span>
                </div>
              </div>
            </SectionCard>

            {/* Imagen Destacada card */}
            <SectionCard icon={Image} title="Imagen Destacada">
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Drop zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  style={{
                    background: dragOver ? 'rgba(245,194,24,0.05)' : C.surfaceDeep,
                    border: `1px dashed ${dragOver ? C.accent : '#2A2A2A'}`,
                    borderRadius: 10, height: 130, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.15s',
                  }}
                >
                  {imageFile ? (
                    <>
                      <span style={{ color: C.green, fontSize: 24 }}>✓</span>
                      <span style={{ color: '#888888', fontSize: 12 }}>{imageFile.name}</span>
                    </>
                  ) : (
                    <>
                      <CloudUpload size={28} color="#333333" />
                      <span style={{ color: '#555555', fontSize: 13 }}>Arrastra una imagen aquí</span>
                      <span style={{ color: '#444444', fontSize: 11 }}>o haz clic para seleccionar</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => e.target.files[0] && setImageFile(e.target.files[0])}
                />
                {/* Select button */}
                <button
                  onClick={() => fileRef.current?.click()}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    background: 'none', border: `1px solid #2A2A2A`,
                    borderRadius: 8, height: 36, cursor: 'pointer',
                    color: '#888888', fontSize: 12, fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <Paperclip size={13} color="#888888" />
                  Seleccionar archivo
                </button>
              </div>
            </SectionCard>

            {/* Extracto card */}
            <SectionCard icon={AlignLeft} title="Extracto">
              <div style={{ padding: 16 }}>
                <div style={{
                  background: C.surfaceDeep, border: `1px solid ${C.borderSub}`,
                  borderRadius: 8, padding: 12, minHeight: 80,
                }}>
                  <textarea
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Escribe un resumen corto de la entrada..."
                    style={{
                      background: 'none', border: 'none', outline: 'none', resize: 'none',
                      color: '#AAAAAA', fontSize: 12, lineHeight: 1.6,
                      fontFamily: 'Inter, sans-serif', width: '100%', minHeight: 60,
                    }}
                  />
                </div>
              </div>
            </SectionCard>

            {/* Delete button */}
            <button style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              height: 40, borderRadius: 8, cursor: 'pointer',
              background: 'none', border: `1px solid rgba(239,68,68,0.2)`,
              color: C.red, fontSize: 12, fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
            }}>
              <Trash2 size={13} color={C.red} />
              Mover a la Papelera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
