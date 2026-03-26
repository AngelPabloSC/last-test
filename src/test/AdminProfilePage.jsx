import { useState } from 'react'
import {
  Search,
  Bell,
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  Users,
  Settings,
  Edit2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  Globe,
} from 'lucide-react'

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { key: 'peticiones',    label: 'Peticiones',    icon: ClipboardList   },
  { key: 'reviews',       label: 'Reviews',       icon: MessageSquare   },
  { key: 'clientes',      label: 'Clientes',      icon: Users           },
  { key: 'configuracion', label: 'Configuración', icon: Settings        },
]

function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="w-[260px] h-screen bg-[#111111] border-r border-[#1F1F1F] flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-[#1F1F1F]">
        <div className="w-8 h-8 rounded-lg bg-[#FFD700] flex items-center justify-center">
          <span className="text-[#0A0A0A] font-black text-xs">N</span>
        </div>
        <span className="text-white font-bold text-sm tracking-wide">Nova Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = activeNav === key
          return (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                active
                  ? 'bg-[#FFD70015] text-[#FFD700] border border-[#FFD70030]'
                  : 'text-[#6B7280] hover:text-white hover:bg-[#1F1F1F]'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 pb-5 border-t border-[#1F1F1F] pt-4">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0">
            <span className="text-[#0A0A0A] font-bold text-xs">AS</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-medium truncate">Angel Sarango</span>
            <span className="text-[#6B7280] text-xs truncate">Administrador</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
        checked ? 'bg-[#FFD700]' : 'bg-[#2A2A2A]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

// ─── Activity Item ────────────────────────────────────────────────────────────
const ACTIVITY_ICONS = {
  published: { icon: CheckCircle, color: 'text-green-400',  bg: 'bg-green-500/10'  },
  approved:  { icon: Star,        color: 'text-[#FFD700]',  bg: 'bg-[#FFD70015]'   },
  accepted:  { icon: AlertCircle, color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  rejected:  { icon: XCircle,     color: 'text-red-400',    bg: 'bg-red-500/10'    },
}

function ActivityItem({ type, text, time }) {
  const { icon: Icon, color, bg } = ACTIVITY_ICONS[type] || ACTIVITY_ICONS.published
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1A1A1A] last:border-0">
      <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={14} className={color} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-[#D1D5DB] text-sm leading-snug">{text}</p>
        <p className="text-[#4B5563] text-xs">{time}</p>
      </div>
    </div>
  )
}

// ─── Info Field ───────────────────────────────────────────────────────────────
function InfoField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-[#111111] border border-[#1F1F1F] rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-[#1F1F1F]">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = {
  nuevasPeticiones: true,
  nuevasReviews:    true,
  reportesSemanales: false,
  marketing:        false,
}

export default function AdminProfilePage() {
  const [activeNav, setActiveNav]       = useState('configuracion')
  const [editing, setEditing]           = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const toggleNotif = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))

  const [profile, setProfile] = useState({
    nombre:   'Angel Sarango',
    rol:      'Administrador',
    email:    'angel.sarango@novasolutions.com',
    ubicacion:'Capital Region, NY',
    telefono: '(518) 444-0120',
    zona:     'Eastern Time (ET) UTC-5',
  })

  const [formData, setFormData] = useState({ ...profile })
  const set = (key) => (e) => setFormData((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    setProfile({ ...formData })
    setEditing(false)
  }

  const activities = [
    { type: 'published', text: 'Publicaste la reseña de María García',    time: 'Hace 2 hrs'   },
    { type: 'approved',  text: 'Aprobaste la solicitud de Roberto López',  time: 'Hace 5 hrs'   },
    { type: 'accepted',  text: 'Aceptaste la solicitud de Ernesto López',  time: 'Hace 1 día'   },
    { type: 'rejected',  text: 'Rechazaste la reseña de David Chen (spam)',time: 'Hace 2 días'  },
  ]

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden font-[Inter,sans-serif]">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-10 h-[88px] border-b border-[#1F1F1F] flex-shrink-0">
          <div>
            <h1 className="text-white text-2xl font-black">Mi Perfil</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">
              Edita tu información personal y preferencias de cuenta.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                placeholder="Buscar..."
                className="w-[200px] h-9 pl-9 pr-4 bg-[#111111] border border-[#1F1F1F] rounded-lg text-white text-sm placeholder-[#4B5563] focus:outline-none focus:border-[#FFD700] transition-colors"
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center bg-[#111111] border border-[#1F1F1F] rounded-lg text-[#6B7280] hover:text-white transition-colors">
              <Bell size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          <div className="flex gap-8">

            {/* ── Left column ───────────────────────────────────────── */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">

              {/* Profile card */}
              <Card>
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0A0A0A] font-black text-xl">AS</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-white text-lg font-bold leading-tight">{profile.nombre}</h2>
                        <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#FFD70015] text-[#FFD700] text-xs font-semibold rounded-full border border-[#FFD70030]">
                          {profile.rol}
                        </span>
                        <p className="text-[#6B7280] text-sm mt-2 flex items-center gap-1.5">
                          <Mail size={12} />
                          {profile.email}
                        </p>
                        <p className="text-[#4B5563] text-xs mt-1">
                          Miembro desde hace 3 años · Última sesión hace 2 horas
                        </p>
                      </div>

                      {/* Edit / Save buttons */}
                      {editing ? (
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => { setFormData({ ...profile }); setEditing(false) }}
                            className="h-8 px-4 border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:border-[#4B5563] transition-colors"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleSave}
                            className="h-8 px-4 bg-[#FFD700] text-[#0A0A0A] text-xs font-bold rounded-lg hover:bg-[#FFC200] transition-colors"
                          >
                            Guardar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditing(true)}
                          className="flex items-center gap-1.5 h-8 px-4 bg-[#1F1F1F] border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:text-white hover:border-[#4B5563] transition-colors flex-shrink-0"
                        >
                          <Edit2 size={12} />
                          Editar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal info */}
              <Card title="Información Personal">
                {editing ? (
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { key: 'nombre',    label: 'Nombre completo' },
                      { key: 'rol',       label: 'Rol'             },
                      { key: 'email',     label: 'Email'           },
                      { key: 'ubicacion', label: 'Ubicación'       },
                      { key: 'telefono',  label: 'Teléfono'        },
                      { key: 'zona',      label: 'Zona horaria'    },
                    ].map(({ key, label }) => (
                      <div key={key} className="flex flex-col gap-1.5">
                        <label className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">
                          {label}
                        </label>
                        <input
                          value={formData[key]}
                          onChange={set(key)}
                          disabled={key === 'rol'}
                          className="h-9 px-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#FFD700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    <InfoField label="Nombre completo" value={profile.nombre} />
                    <InfoField label="Rol"             value={profile.rol} />
                    <InfoField label="Email"           value={profile.email} />
                    <InfoField label="Ubicación"       value={profile.ubicacion} />
                    <InfoField label="Teléfono"        value={profile.telefono} />
                    <InfoField label="Zona horaria"    value={profile.zona} />
                  </div>
                )}
              </Card>

              {/* Recent activity */}
              <Card title="Actividad Reciente">
                <div className="flex flex-col">
                  {activities.map((a, i) => (
                    <ActivityItem key={i} {...a} />
                  ))}
                </div>
              </Card>
            </div>

            {/* ── Right column ──────────────────────────────────────── */}
            <div className="w-[340px] flex-shrink-0 flex flex-col gap-6">

              {/* Security */}
              <Card title="Seguridad">
                <div className="flex flex-col gap-4">
                  {/* Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-sm font-medium">Contraseña</span>
                      <span className="text-[#6B7280] text-xs tracking-widest">••••••••••</span>
                    </div>
                    <button className="h-8 px-4 bg-[#1F1F1F] border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:text-white hover:border-[#4B5563] transition-colors">
                      Cambiar
                    </button>
                  </div>

                  <div className="h-px bg-[#1F1F1F]" />

                  {/* Active sessions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-white text-sm font-medium">Sesiones activas</span>
                      <span className="text-[#6B7280] text-xs">2 dispositivos</span>
                    </div>
                    <button className="h-8 px-4 bg-[#1F1F1F] border border-[#2A2A2A] text-[#9CA3AF] text-xs font-medium rounded-lg hover:text-white hover:border-[#4B5563] transition-colors flex items-center gap-1.5">
                      <Eye size={12} />
                      Ver
                    </button>
                  </div>

                  <div className="h-px bg-[#1F1F1F]" />

                  {/* 2FA hint */}
                  <div className="flex items-start gap-3 p-3 bg-[#FFD70008] border border-[#FFD70020] rounded-lg">
                    <Shield size={14} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">
                      Activa la verificación en dos pasos para mayor seguridad.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Notifications */}
              <Card title="Notificaciones">
                <div className="flex flex-col gap-4">
                  {[
                    { key: 'nuevasPeticiones',  label: 'Nuevas peticiones',   sub: 'Cada vez'             },
                    { key: 'nuevasReviews',      label: 'Nuevas reviews',      sub: 'Cada vez'             },
                    { key: 'reportesSemanales',  label: 'Reportes semanales',  sub: 'Cada lunes'           },
                    { key: 'marketing',          label: 'Marketing',           sub: 'Boletín mensual'      },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white text-sm font-medium">{label}</span>
                        <span className="text-[#6B7280] text-xs">{sub}</span>
                      </div>
                      <Toggle
                        checked={notifications[key]}
                        onChange={() => toggleNotif(key)}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Danger zone */}
              <Card>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-400" />
                    <span className="text-red-400 text-xs font-bold uppercase tracking-wide">
                      Zona de peligro
                    </span>
                  </div>
                  <p className="text-[#6B7280] text-xs leading-relaxed">
                    Esta acción eliminará permanentemente tu cuenta y todos los datos asociados.
                  </p>
                  <button className="w-full h-9 bg-red-500/10 border border-red-900/50 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/20 transition-colors">
                    Eliminar cuenta
                  </button>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
