import React, { useState } from 'react';
import {
  PenLine,
  Search,
  Bell,
  FileText,
  CheckCircle,
  Edit3,
  Archive,
  Eye,
  TrendingUp,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';

/* ─── Design Tokens ──────────────────────────────── */
const C = {
  bg:          '#0E1018',
  surface:     '#131620',
  surfaceAlt:  '#111111',
  surfaceDeep: '#0D0D0D',
  border:      '#1E2130',
  borderAlt:   '#1F1F1F',
  accent:      '#FFD700',
  accentDim:   'rgba(255,215,0,0.10)',
  textPrimary: '#F1F5F9',
  textSec:     '#64748B',
  textMuted:   '#475569',
  green:       '#10B981',
  blue:        '#3B82F6',
  amber:       '#F0B429',
  purple:      '#8B5CF6',
  red:         '#EF4444',
};

/* ─── Static Data ────────────────────────────────── */
const METRICS = [
  {
    id: 'total',
    label: 'Total Entradas',
    value: '48',
    trend: '↑ +3 esta semana',
    trendColor: C.green,
    iconBg: 'rgba(59,130,246,0.15)',
    icon: FileText,
    iconColor: C.blue,
  },
  {
    id: 'published',
    label: 'Publicadas',
    value: '35',
    trend: '↑ +5 esta semana',
    trendColor: C.green,
    iconBg: 'rgba(16,185,129,0.15)',
    icon: CheckCircle,
    iconColor: C.green,
  },
  {
    id: 'drafts',
    label: 'Borradores',
    value: '8',
    trend: '→ Sin cambios',
    trendColor: C.textSec,
    iconBg: 'rgba(240,180,41,0.15)',
    icon: Edit3,
    iconColor: C.amber,
  },
  {
    id: 'views',
    label: 'Vistas Totales',
    value: '12.4K',
    trend: '↑ +1.2K este mes',
    trendColor: C.green,
    iconBg: 'rgba(139,92,246,0.15)',
    icon: TrendingUp,
    iconColor: C.purple,
  },
];

const TABS = [
  { id: 'all',       label: 'Todas (48)' },
  { id: 'published', label: 'Publicadas' },
  { id: 'draft',     label: 'Borradores' },
  { id: 'archived',  label: 'Archivadas' },
];

const STATUS_STYLES = {
  Publicada: { bg: 'rgba(34,197,94,0.12)',   text: '#22C55E' },
  Borrador:  { bg: 'rgba(255,215,0,0.12)',   text: C.accent  },
  Archivada: { bg: 'rgba(100,116,139,0.12)', text: '#64748B' },
};

const POSTS = [
  {
    id: 1,
    gradient: ['#7C3AED', '#DB2777'],
    title: 'Cómo elegir el pastel perfecto para tu boda',
    views: '2.4K vistas',
    category: 'Pasteles',
    catColor: '#A78BFA',
    catBg: 'rgba(124,58,237,0.12)',
    author: 'Angel S.',
    avatarBg: 'rgba(255,215,0,0.15)',
    avatarColor: C.accent,
    date: '10 Abr 2026',
    status: 'Publicada',
  },
  {
    id: 2,
    gradient: ['#0EA5E9', '#6366F1'],
    title: 'Top 10 tendencias en diseño web para 2026',
    views: '1.8K vistas',
    category: 'Tecnología',
    catColor: '#38BDF8',
    catBg: 'rgba(14,165,233,0.12)',
    author: 'María G.',
    avatarBg: 'rgba(59,130,246,0.15)',
    avatarColor: '#60A5FA',
    date: '8 Abr 2026',
    status: 'Publicada',
  },
  {
    id: 3,
    gradient: ['#F59E0B', '#EF4444'],
    title: 'Guía completa de decoración con fondant',
    views: 'Última edición: hace 2h',
    category: 'Tutoriales',
    catColor: '#FCD34D',
    catBg: 'rgba(245,158,11,0.12)',
    author: 'Angel S.',
    avatarBg: 'rgba(255,215,0,0.15)',
    avatarColor: C.accent,
    date: '5 Abr 2026',
    status: 'Borrador',
  },
  {
    id: 4,
    gradient: ['#10B981', '#059669'],
    title: 'Nuevos sabores de temporada en Mishki Tanta',
    views: '3.1K vistas',
    category: 'Noticias',
    catColor: '#34D399',
    catBg: 'rgba(16,185,129,0.12)',
    author: 'Roberto L.',
    avatarBg: 'rgba(239,68,68,0.15)',
    avatarColor: '#F87171',
    date: '2 Abr 2026',
    status: 'Publicada',
  },
  {
    id: 5,
    gradient: ['#8B5CF6', '#EC4899'],
    title: 'SEO para negocios de repostería',
    views: 'Última edición: ayer',
    category: 'Marketing',
    catColor: '#A78BFA',
    catBg: 'rgba(139,92,246,0.12)',
    author: 'María G.',
    avatarBg: 'rgba(59,130,246,0.15)',
    avatarColor: '#60A5FA',
    date: '28 Mar 2026',
    status: 'Borrador',
  },
  {
    id: 6,
    gradient: ['#64748B', '#475569'],
    title: 'Historia de la pastelería artesanal',
    views: 'Archivada el 15 Mar 2026',
    category: 'Cultura',
    catColor: '#94A3B8',
    catBg: 'rgba(100,116,139,0.12)',
    author: 'Angel S.',
    avatarBg: 'rgba(100,116,139,0.15)',
    avatarColor: '#94A3B8',
    date: '15 Mar 2026',
    status: 'Archivada',
  },
];

/* ─── Sub-components ─────────────────────────────── */

function MetricCard({ label, value, trend, trendColor, iconBg, icon: Icon, iconColor }) {
  return (
    <div style={{
      flex: 1,
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: C.textSec, fontSize: 12 }}>{label}</span>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={16} color={iconColor} />
        </div>
      </div>
      <span style={{ color: C.textPrimary, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{value}</span>
      <span style={{ color: trendColor, fontSize: 11 }}>{trend}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? { bg: '#2a2a2a', text: C.textSec };
  return (
    <span style={{
      background: s.bg, color: s.text,
      fontSize: 12, fontWeight: 600,
      padding: '3px 10px', borderRadius: 20,
    }}>
      {status}
    </span>
  );
}

function PostRow({ post, last }) {
  const [hover, setHover] = useState(false);
  const dimmed = post.status === 'Archivada';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr 130px 120px 110px 100px 80px',
        alignItems: 'center',
        height: 64,
        background: hover ? '#161616' : 'transparent',
        borderBottom: last ? 'none' : `1px solid ${C.borderAlt}`,
        transition: 'background 0.12s',
        cursor: 'pointer',
      }}
    >
      {/* Thumbnail */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 6,
          background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})`,
          opacity: dimmed ? 0.5 : 1,
        }} />
      </div>

      {/* Title + meta */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, paddingRight: 8 }}>
        <span style={{ color: dimmed ? '#666666' : C.textPrimary, fontSize: 13, fontWeight: 600 }}>
          {post.title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Eye size={11} color={dimmed ? '#444444' : '#555555'} />
          <span style={{ color: dimmed ? '#444444' : '#555555', fontSize: 11 }}>{post.views}</span>
        </div>
      </div>

      {/* Category */}
      <div>
        <span style={{
          background: post.catBg, color: post.catColor,
          fontSize: 12, fontWeight: 500,
          padding: '3px 10px', borderRadius: 20,
        }}>
          {post.category}
        </span>
      </div>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 12,
          background: post.avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: post.avatarColor }}>
            {post.author.split(' ').map(w => w[0]).join('')}
          </span>
        </div>
        <span style={{ color: dimmed ? '#555555' : '#888888', fontSize: 12 }}>{post.author}</span>
      </div>

      {/* Date */}
      <span style={{ color: dimmed ? '#555555' : '#888888', fontSize: 12 }}>{post.date}</span>

      {/* Status */}
      <StatusBadge status={post.status} />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Eye size={15} color={dimmed ? '#444444' : '#555555'} style={{ cursor: 'pointer' }} />
        <Pencil size={15} color={dimmed ? '#444444' : '#555555'} style={{ cursor: 'pointer' }} />
        <Trash2 size={15} color={dimmed ? '#444444' : '#555555'} style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────── */

export default function AdminBlog() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: C.bg,
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      <AdminSidebar activeItem="blog" />

      {/* ── Main content ── */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: C.bg,
      }}>

        {/* Header + Metrics */}
        <div style={{
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h1 style={{ color: C.textPrimary, fontSize: 22, fontWeight: 700, margin: 0 }}>
                Gestión de Blog
              </h1>
              <span style={{ color: C.textSec, fontSize: 13 }}>
                Administra las entradas de tu blog
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 8, padding: '0 12px', height: 36, width: 200,
              }}>
                <Search size={14} color={C.textMuted} />
                <input
                  placeholder="Buscar..."
                  style={{
                    background: 'none', border: 'none', outline: 'none',
                    color: C.textPrimary, fontSize: 13, fontFamily: 'Inter, sans-serif',
                    width: '100%',
                  }}
                />
              </div>
              {/* Bell */}
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: C.surface, border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <Bell size={16} color={C.textSec} />
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div style={{ display: 'flex', gap: 16 }}>
            {METRICS.map(m => <MetricCard key={m.id} {...m} />)}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 24px',
          height: 56,
          background: C.surfaceAlt,
          borderBottom: `1px solid ${C.borderAlt}`,
          flexShrink: 0,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? C.accentDim : 'none',
                border: 'none',
                borderRadius: 7,
                padding: '6px 14px',
                cursor: 'pointer',
                color: activeTab === tab.id ? C.accent : '#888888',
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.12s',
              }}
            >
              {tab.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Nueva Entrada */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: C.accent, border: 'none', borderRadius: 8,
            padding: '8px 16px', cursor: 'pointer',
            color: '#111111', fontSize: 13, fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
          }}>
            <PenLine size={14} color="#111111" />
            Nueva Entrada
          </button>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflowY: 'auto', background: C.surfaceAlt }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '56px 1fr 130px 120px 110px 100px 80px',
            height: 36,
            padding: '0 24px',
            alignItems: 'center',
            borderBottom: `1px solid ${C.borderAlt}`,
            position: 'sticky',
            top: 0,
            background: C.surfaceAlt,
            zIndex: 1,
          }}>
            {['', 'TÍTULO', 'CATEGORÍA', 'AUTOR', 'FECHA', 'ESTADO', 'ACCIONES'].map((h, i) => (
              <span key={i} style={{
                color: '#555555', fontSize: 11, fontWeight: 600, letterSpacing: 0.8,
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Post rows */}
          <div style={{ padding: '0 24px' }}>
            {POSTS.map((post, i) => (
              <PostRow key={post.id} post={post} last={i === POSTS.length - 1} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px',
            borderTop: `1px solid ${C.borderAlt}`,
          }}>
            <span style={{ color: '#555555', fontSize: 12 }}>
              Mostrando 1–6 de 48 entradas
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <PageBtn icon={ChevronLeft} disabled />
              {[1, 2, 3, '...', 8].map((p, i) => (
                <PageBtn key={i} label={p} active={p === 1} />
              ))}
              <PageBtn icon={ChevronRight} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Pagination helper ──────────────────────────── */
function PageBtn({ icon: Icon, label, active, disabled }) {
  return (
    <button style={{
      minWidth: 30, height: 30,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: active ? 'rgba(255,215,0,0.10)' : 'none',
      border: active ? '1px solid rgba(255,215,0,0.3)' : '1px solid #1F1F1F',
      borderRadius: 6,
      color: active ? '#FFD700' : disabled ? '#333333' : '#555555',
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      fontFamily: 'Inter, sans-serif',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: Icon ? '0 8px' : 0,
    }}>
      {Icon ? <Icon size={14} /> : label}
    </button>
  );
}
