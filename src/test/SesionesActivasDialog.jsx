import { useState } from 'react'
import {
  Shield,
  X,
  Monitor,
  Smartphone,
  Globe,
  LogOut,
  Info,
  Wifi,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const INITIAL_SESSIONS = [
  {
    id: 1,
    device: 'MacBook Pro',
    browser: 'Chrome 120',
    location: 'Capital Region, NY',
    ip: '192.168.1.1',
    lastActive: 'Activa ahora',
    isActive: true,
    isCurrent: true,
    icon: 'monitor',
    iconColor: '#FFD700',
    iconBg: '#FFD70018',
  },
  {
    id: 2,
    device: 'iPhone 14',
    browser: 'Safari 17',
    location: 'New York, NY',
    ip: '74.125.0.1',
    lastActive: 'Hace 2 horas',
    isActive: false,
    isCurrent: false,
    icon: 'smartphone',
    iconColor: '#3B82F6',
    iconBg: '#3B82F618',
  },
  {
    id: 3,
    device: 'Windows 11',
    browser: 'Firefox 121',
    location: 'Ubicación desconocida',
    ip: '89.47.22.15',
    lastActive: 'Hace 5 días',
    isActive: false,
    isCurrent: false,
    icon: 'monitor',
    iconColor: '#6B7280',
    iconBg: '#6B728020',
  },
]

// ─── Device Icon ──────────────────────────────────────────────────────────────
function DeviceIcon({ type, color, bg }) {
  const Icon = type === 'smartphone' ? Smartphone : Monitor
  return (
    <div
      className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: bg }}
    >
      <Icon size={18} style={{ color }} strokeWidth={1.8} />
    </div>
  )
}

// ─── Session Row ──────────────────────────────────────────────────────────────
function SessionRow({ session, onClose, closing }) {
  return (
    <div className="flex items-start gap-4 px-6 py-4 border-b border-[#1A1A1A] last:border-0">
      <DeviceIcon type={session.icon} color={session.iconColor} bg={session.iconBg} />

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Current session badge */}
        {session.isCurrent && (
          <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full bg-[#FFD70018] text-[#FFD700] text-[10px] font-bold border border-[#FFD70030] mb-1">
            Sesión actual
          </span>
        )}

        <p className="text-white text-sm font-semibold leading-tight">
          {session.device} — {session.browser}
        </p>

        <p className="text-[#6B7280] text-xs">
          {session.location} · {session.ip}
        </p>

        {/* Last active */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {session.isCurrent ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
              <span className="text-green-400 text-xs font-medium">{session.lastActive}</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B5563] flex-shrink-0" />
              <span className="text-[#9CA3AF] text-xs">{session.lastActive}</span>
            </>
          )}
        </div>
      </div>

      {/* Close button — hidden for current session */}
      {!session.isCurrent && (
        <button
          onClick={() => onClose(session.id)}
          disabled={closing === session.id}
          className="h-8 px-3 flex-shrink-0 bg-[#FF444415] border border-[#FF444440] text-[#FF4444] text-xs font-semibold rounded-lg hover:bg-[#FF444425] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {closing === session.id ? (
            <>
              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Cerrando...
            </>
          ) : (
            'Cerrar'
          )}
        </button>
      )}
    </div>
  )
}

// ─── Confirm Close All ────────────────────────────────────────────────────────
function ConfirmCloseAll({ onConfirm, onCancel }) {
  return (
    <div className="mx-6 mb-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-red-300 text-sm leading-relaxed">
          Esto cerrará <strong>todas las sesiones excepto la actual</strong>. Los dispositivos deberán iniciar sesión de nuevo.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 h-8 border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:border-[#4B5563] transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 h-8 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-400 transition-colors"
        >
          Sí, cerrar todas
        </button>
      </div>
    </div>
  )
}

// ─── Success State ────────────────────────────────────────────────────────────
function SuccessState({ onClose }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 py-12">
      <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
        <CheckCircle size={28} className="text-green-400" />
      </div>
      <div className="text-center flex flex-col gap-2">
        <p className="text-white font-semibold">Sesiones cerradas</p>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Todas las sesiones externas han sido cerradas correctamente.
        </p>
      </div>
      <button
        onClick={onClose}
        className="h-9 px-6 bg-[#1F1F1F] border border-[#2A2A2A] text-white text-sm font-medium rounded-lg hover:bg-[#2A2A2A] transition-colors"
      >
        Aceptar
      </button>
    </div>
  )
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
/**
 * SesionesActivasDialog
 *
 * Props:
 *  - isOpen    {boolean}   — controls visibility
 *  - onClose   {function}  — called when dialog should close
 */
export function SesionesActivasDialog({ isOpen, onClose }) {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS)
  const [closing, setClosing] = useState(null)       // id of session being closed
  const [showConfirm, setShowConfirm] = useState(false)
  const [closedAll, setClosedAll] = useState(false)

  if (!isOpen) return null

  // Close single session (optimistic)
  const handleCloseSession = (id) => {
    setClosing(id)
    setTimeout(() => {
      setSessions((prev) => prev.filter((s) => s.id !== id))
      setClosing(null)
    }, 900)
  }

  // Close all sessions except current
  const handleCloseAll = () => {
    setShowConfirm(false)
    setTimeout(() => {
      setSessions((prev) => prev.filter((s) => s.isCurrent))
      setClosedAll(true)
    }, 600)
  }

  const otherSessions = sessions.filter((s) => !s.isCurrent)

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      {/* Dialog card */}
      <div
        className="w-[520px] bg-[#111111] border border-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFD70015] flex items-center justify-center">
              <Shield size={17} className="text-[#FFD700]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-[17px] leading-tight">
                Sesiones Activas
              </h2>
              <p className="text-[#6B7280] text-xs mt-0.5">
                {sessions.length} {sessions.length === 1 ? 'sesión encontrada' : 'sesiones encontradas'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A1A1A] text-[#6B7280] hover:text-white hover:bg-[#2A2A2A] transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        {closedAll ? (
          <SuccessState onClose={onClose} />
        ) : (
          <>
            <div className="overflow-y-auto flex-1">
              {sessions.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  onClose={handleCloseSession}
                  closing={closing}
                />
              ))}
            </div>

            {/* Confirm panel */}
            {showConfirm && (
              <ConfirmCloseAll
                onConfirm={handleCloseAll}
                onCancel={() => setShowConfirm(false)}
              />
            )}

            {/* Info note */}
            {!showConfirm && (
              <div className="flex items-start gap-3 px-6 py-3.5 border-t border-[#1F1F1F]">
                <Info size={13} className="text-[#6B7280] flex-shrink-0 mt-0.5" />
                <p className="text-[#6B7280] text-xs leading-relaxed">
                  Cerrar una sesión desconectará ese dispositivo inmediatamente. Deberás iniciar sesión de nuevo desde ese dispositivo.
                </p>
              </div>
            )}

            {/* ── Footer ──────────────────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#1F1F1F]">
              <button
                onClick={onClose}
                className="h-10 px-5 border border-[#2A2A2A] text-[#9CA3AF] text-sm font-medium rounded-lg hover:border-[#4B5563] hover:text-white transition-colors"
              >
                Cancelar
              </button>

              {otherSessions.length > 0 ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  disabled={showConfirm}
                  className="h-10 px-5 bg-[#FF444420] border border-[#FF444450] text-[#FF4444] text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-[#FF444430] transition-colors disabled:opacity-50"
                >
                  <LogOut size={15} />
                  Cerrar todas las sesiones
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[#6B7280] text-xs">
                  <CheckCircle size={14} className="text-green-400" />
                  Solo queda tu sesión activa
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Demo ─────────────────────────────────────────────────────────────────────
export default function SesionesActivasDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-[Inter,sans-serif]">
      {/* Fake profile card as background context */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-6 w-80 flex flex-col gap-5">
        <h3 className="text-white font-semibold text-sm">Seguridad</h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">Sesiones activas</p>
            <p className="text-[#6B7280] text-xs">3 dispositivos</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="h-8 px-4 bg-[#1F1F1F] border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:text-white hover:border-[#4B5563] transition-colors flex items-center gap-1.5"
          >
            <Wifi size={12} />
            Ver
          </button>
        </div>
      </div>

      <SesionesActivasDialog isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
