import { useState } from 'react'
import { X, Star, CheckCircle, Globe } from 'lucide-react'

// ─── Star Row ─────────────────────────────────────────────────────────────────
function StarRow({ count = 5, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < count ? '#FFD700' : 'transparent'}
          stroke={i < count ? '#FFD700' : '#374151'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
/**
 * PublicarReviewDialog
 *
 * Props:
 *  - isOpen      {boolean}   — controls visibility
 *  - review      {object}    — review data to publish
 *  - onConfirm   {function}  — called when user confirms
 *  - onCancel    {function}  — called when user cancels / closes
 *
 * Review shape:
 *  { id, client, avatar, source, service, rating, review, date }
 */
export function PublicarReviewDialog({ isOpen, review, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false)

  if (!isOpen || !review) return null

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm(review)
    setLoading(false)
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onCancel}
    >
      {/* Card */}
      <div
        className="relative w-[440px] bg-[#111111] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-[22px] border-b border-[#1F1F1F]">
          <h2 className="text-white font-bold text-[17px]">Publicar Review</h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A1A1A] text-[#6B7280] hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className="px-6 py-6 flex flex-col gap-6">

          {/* Review seleccionada */}
          <div className="flex flex-col gap-3">
            <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest">
              Review Seleccionada
            </p>
            <div className="flex items-center gap-3 p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#FFD70020] flex items-center justify-center flex-shrink-0">
                <span className="text-[#FFD700] font-bold text-sm">{review.avatar}</span>
              </div>
              {/* Info */}
              <div className="flex flex-col gap-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-none">{review.client}</p>
                <div className="flex items-center gap-2">
                  <StarRow count={review.rating} size={12} />
                  <span className="text-[#4B5563] text-xs">·</span>
                  <Globe size={11} className="text-[#4B5563]" />
                  <span className="text-[#6B7280] text-xs">{review.source} · {review.service}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview de la review */}
          <div className="flex flex-col gap-3">
            <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest">
              Preview de la Review
            </p>

            {/* Preview card */}
            <div className="p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl flex flex-col gap-3">
              <StarRow count={review.rating} size={16} />
              <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
                "{review.review}"
              </p>
              <p className="text-[#4B5563] text-xs">
                Fuente: {review.date} · {review.source}
              </p>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2.5 p-3 bg-green-950/30 border border-green-900/50 rounded-lg">
              <CheckCircle size={15} className="text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-400 text-[12px] leading-relaxed">
                Esta reseña será publicada en la sección de Reviews del sitio web.
              </p>
            </div>
          </div>

          {/* ── Actions ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={onCancel}
              disabled={loading}
              className="h-9 px-5 bg-transparent border border-[#2A2A2A] text-[#9CA3AF] text-sm font-medium rounded-lg hover:border-[#4B5563] hover:text-white transition-colors disabled:opacity-40"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="h-9 px-5 bg-green-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-green-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Publicando...
                </>
              ) : (
                <>
                  <CheckCircle size={14} />
                  Publicar Review
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Demo / Usage example ─────────────────────────────────────────────────────
const DEMO_REVIEW = {
  id: 1,
  client: 'María García',
  avatar: 'MG',
  source: 'Google',
  service: 'Roofing',
  rating: 5,
  review:
    'Excelente trabajo en mi techo. Muy profesionales y puntuales. Lograron todo a tiempo y el resultado me impresionó bastante.',
  date: '12 Dic 2024',
}

export default function PublicarReviewDialogDemo() {
  const [open, setOpen] = useState(false)
  const [published, setPublished] = useState(false)

  const handleConfirm = (review) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPublished(true)
        setOpen(false)
        resolve()
      }, 1200)
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6 font-[Inter,sans-serif]">
      {published && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-950/40 border border-green-900/60 rounded-xl text-green-400 text-sm">
          <CheckCircle size={15} />
          Reseña de {DEMO_REVIEW.client} publicada correctamente.
        </div>
      )}

      <button
        onClick={() => { setOpen(true); setPublished(false) }}
        className="h-10 px-6 bg-green-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-green-400 transition-colors"
      >
        <CheckCircle size={15} />
        Abrir Dialog — Publicar Review
      </button>

      <PublicarReviewDialog
        isOpen={open}
        review={DEMO_REVIEW}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </div>
  )
}
