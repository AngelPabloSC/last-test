import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Switch,
  IconButton,
  InputBase,
  Chip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  NotificationsNone as BellIcon,
  EditOutlined as EditIcon,
  MailOutline as MailIcon,
  PhoneOutlined as PhoneIcon,
  LocationOnOutlined as MapPinIcon,
  AccessTime as ClockIcon,
  ShieldOutlined as ShieldIcon,
  VisibilityOutlined as EyeIcon,
  CheckCircleOutline as CheckCircleIcon,
  StarsOutlined as StarIcon,
  ErrorOutline as AlertCircleIcon,
  HighlightOff as XCircleIcon,
} from '@mui/icons-material';
import { useLoginContext } from '@/context/LoginContext';
import { useChangePassword } from './hooks/useChangePassword';
import { useActiveSessions } from './hooks/useActiveSessions';
import { useUpdateProfile } from './hooks/useUpdateProfile';
import { useProfilePicture } from './hooks/useProfilePicture';
import ChangePasswordDialog from './components/ChangePasswordDialog';
import ActiveSessionsDialog from './components/ActiveSessionsDialog';
import { 
  CameraAlt as CameraIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';
import { useRef } from 'react';

// ─── Activity Item Component ──────────────────────────────────────────────────
const ACTIVITY_ICONS = {
  published: { icon: CheckCircleIcon, color: '#4ADE80',  bg: 'rgba(74, 222, 128, 0.1)'  },
  approved:  { icon: StarIcon,        color: '#FFD700',  bg: 'rgba(255, 215, 0, 0.15)'   },
  accepted:  { icon: AlertCircleIcon, color: '#60A5FA',  bg: 'rgba(96, 165, 250, 0.1)'   },
  rejected:  { icon: XCircleIcon,     color: '#F87171',  bg: 'rgba(248, 113, 113, 0.1)'    },
};

function ActivityItem({ type, text, time }) {
  const { icon: Icon, color, bg } = ACTIVITY_ICONS[type] || ACTIVITY_ICONS.published;
  return (
    <Box sx={{ display: 'flex', alignItems: 'start', gap: 1.5, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.03)', '&:last-child': { borderBottom: 0 } }}>
      <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.2 }}>
        <Icon sx={{ fontSize: 14, color }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
        <Typography sx={{ color: '#E5E7EB', fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{text}</Typography>
        <Typography sx={{ color: '#6B7280', fontSize: 11, mt: 0.25 }}>{time}</Typography>
      </Box>
    </Box>
  );
}

// ─── Custom Card Component ────────────────────────────────────────────────────
function ProfileCard({ title, children, sx = {} }) {
  return (
    <Box 
      sx={{ 
        bgcolor: '#111111', 
        border: '1px solid #1F1F1F', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        transition: 'transform 0.2s, border-color 0.2s',
        '&:hover': { borderColor: '#2A2A2A' },
        ...sx 
      }}
    >
      {title && (
        <Box sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid #1F1F1F', bgcolor: 'rgba(255,255,255,0.01)' }}>
          <Typography sx={{ color: '#F3F4F6', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</Typography>
        </Box>
      )}
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>{children}</Box>
    </Box>
  );
}

export default function AdminProfilePage() {
  const theme = useTheme();
  const { user } = useLoginContext();
  const [editing, setEditing] = useState(false);
  
  const {
    openPassDialog,
    passForm,
    showPass,
    passErrors,
    passwordData,
    isSubmittingPass,
    handleOpenPassDialog,
    handleClosePassDialog,
    handlePassInputChange,
    togglePassVisibility,
    onSubmitPassword
  } = useChangePassword();

  const {
    open:          sessionsOpen,
    loading:       sessionsLoading,
    activeSessions,
    recentSessions,
    sessionData,
    closingId,
    closingAll,
    closedAll,
    otherActiveSessions,
    handleOpen:    handleOpenSessions,
    handleClose:   handleCloseSessions,
    handleCloseSession,
    handleCloseAll,
  } = useActiveSessions();

  const [isOver, setIsOver] = useState(false);
  const fileInputRef = useRef(null);

  const {
    isUploading,
    isDeleting,
    pictureData,
    handleUpload,
    handleDelete
  } = useProfilePicture();

  const [notifications, setNotifications] = useState({
    newRequests: true,
    newReviews: true,
    weeklyReports: false,
    marketing: false,
  });

  const [formData, setFormData] = useState({
    nombre:         user?.person?.names || user?.username || 'Angel Sarango',
    rol:            user?.rol || 'Administrador',
    email:          user?.person?.email || user?.email || 'Admin@nova-solutions.us',
    ubicacion:      user?.location || 'Quito, Ecuador',
    telefono:       user?.person?.phone || '(518) 598-5156',
    identification: user?.person?.identificationNumber || '...',
    zona:           'Eastern Time (ET) UTC-5',
  });

  // Sync formData when user rehydrates from storage
  useEffect(() => {
    if (user) {
      setFormData({
        nombre:         user?.person?.names || user?.username || 'Angel Sarango',
        rol:            user?.rol || 'Administrador',
        email:          user?.person?.email || user?.email || 'Admin@nova-solutions.us',
        ubicacion:      user?.location || 'Quito, Ecuador',
        telefono:       user?.person?.phone || '(518) 598-5156',
        identification: user?.person?.identificationNumber || '...',
        zona:           'Eastern Time (ET) UTC-5',
      });
    }
  }, [user]);

  const {
    profileData,
    isUpdating,
    onSubmitProfile
  } = useUpdateProfile(formData, setEditing);

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleToggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const activities = [
    { type: 'published', text: 'You published a review from Maria Garcia', time: '2 hrs ago' },
    { type: 'approved',  text: 'You approved a request from Robert Lopez', time: '5 hrs ago' },
    { type: 'accepted',  text: 'You accepted a request from Ernesto Lopez', time: '1 day ago' },
    { type: 'rejected',  text: 'You rejected a review from David Chen (spam)', time: '2 days ago' },
  ];

  const getInitials = (name = '') => {
    const parts = name.split(' ').filter(p => !p.toLocaleLowerCase().includes('.'));
    const initials = parts.map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return initials || 'AS';
  };

  if (!user && !profileData.loading) {
    return (
      <Box sx={{ p: 5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ height: 200, bgcolor: '#111', borderRadius: '12px', mb: 3 }} className="skeleton-pulse" />
            <Box sx={{ height: 300, bgcolor: '#111', borderRadius: '12px' }} className="skeleton-pulse" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ height: 520, bgcolor: '#111', borderRadius: '12px' }} className="skeleton-pulse" />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', bgcolor: '#0A0A0A', color: 'white' }}>
      
      {/* Top Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 3, md: 5 }, py: 3, borderBottom: '1px solid #1F1F1F', flexShrink: 0 }}>
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 900 }}>My Profile</Typography>
          <Typography sx={{ fontSize: 14, color: '#6B7280', mt: 0.5 }}>Manage your personal information and account preferences.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', border: '1px solid #1F1F1F', bgcolor: '#111111', borderRadius: '8px', px: 1.5, py: 0.8 }}>
            <SearchIcon sx={{ fontSize: 16, color: '#6B7280', mr: 1 }} />
            <InputBase placeholder="Search..." sx={{ fontSize: 13, color: 'white', width: 140, '& input::placeholder': { color: '#4B5563', opacity: 1 } }} />
          </Box>
          <IconButton sx={{ bgcolor: '#111111', border: '1px solid #1F1F1F', borderRadius: '8px', color: '#6B7280', '&:hover': { color: 'white' } }}>
            <BellIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, px: { xs: 2, sm: 3, md: 5 }, py: { xs: 2.3, md: 3.5 }, overflowY: 'auto' }}>
        <Grid container spacing={2.5}>
          
          {/* Left Column (Profile, Info, Activity) */}
          <Grid size={{ xs: 12, md: 7.5, lg: 8.2 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            
            {/* Main Profile Header Card */}
            <ProfileCard>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  
                  {/* Interactive Avatar Area */}
                  <Box 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{ 
                      position: 'relative', 
                      width: 54, 
                      height: 54,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: isOver ? '2px dashed #FFD700' : 'none',
                      outlineOffset: '4px',
                      '&:hover .profile-overlay': { opacity: 1 },
                      '&:hover .delete-btn': { opacity: 1 },
                    }}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={onFileSelect} 
                      style={{ display: 'none' }} 
                      accept="image/*"
                    />
                    
                    <Avatar 
                      src={user?.profilePicture}
                      onClick={() => fileInputRef.current?.click()}
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        bgcolor: 'primary.main', 
                        color: 'black', 
                        fontWeight: 900, 
                        fontSize: 18, 
                        textTransform: 'uppercase',
                        opacity: (isUploading || isDeleting) ? 0.3 : 1
                      }}
                    >
                      {getInitials(formData.nombre)}
                    </Avatar>

                    {/* Hover Overlays */}
                    <Box 
                      className="profile-overlay"
                      onClick={() => fileInputRef.current?.click()}
                      sx={{ 
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                        bgcolor: 'rgba(0,0,0,0.4)', borderRadius: '50%', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: isUploading ? 1 : 0, transition: 'opacity 0.2s', pointerEvents: isUploading ? 'auto' : 'none'
                      }}
                    >
                      <CameraIcon sx={{ color: 'white', fontSize: 18 }} />
                    </Box>

                    {/* Delete X Button */}
                    {user?.profilePicture && !isDeleting && (
                      <IconButton 
                        className="delete-btn"
                        onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                        size="small"
                        sx={{ 
                          position: 'absolute', top: -4, right: -4, 
                          width: 22, height: 22, bgcolor: '#F87171', color: 'white', 
                          opacity: 0, transition: 'opacity 0.2s',
                          border: '2px solid #0A0A0A',
                          '&:hover': { bgcolor: '#EF4444' }
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    )}
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 16, fontWeight: 800 }}>{formData.nombre}</Typography>
                    <Chip label={formData.rol} size="small" sx={{ mt: 0.25, bgcolor: 'rgba(255, 215, 0, 0.1)', color: 'primary.main', border: '1px solid rgba(255, 215, 0, 0.3)', fontWeight: 700, fontSize: 8.5, height: 18 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.8, color: '#6B7280' }}>
                      <MailIcon sx={{ fontSize: 13 }} />
                      <Typography sx={{ fontSize: 11.5 }}>{formData.email}</Typography>
                    </Box>
                  </Box>
                </Box>
                {!editing ? (
                  <Button onClick={() => setEditing(true)} startIcon={<EditIcon sx={{ fontSize: 14 }} />} sx={{ bgcolor: '#1F1F1F', color: '#9CA3AF', textTransform: 'none', border: '1px solid #2A2A2A', fontWeight: 600, px: 2, '&:hover': { color: 'white', borderColor: '#4B5563' } }}>
                    Edit
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button onClick={() => setEditing(false)} variant="outlined" sx={{ borderColor: '#2A2A2A', color: '#9CA3AF', textTransform: 'none', fontWeight: 600, '&:hover': { borderColor: '#4B5563', bgcolor: 'transparent' } }}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={onSubmitProfile} 
                      disabled={isUpdating}
                      variant="contained" 
                      sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 800, textTransform: 'none', '&:hover': { bgcolor: '#e6c200' } }}
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </Button>
                  </Box>
                )}
              </Box>
            </ProfileCard>

            {/* General Information Card */}
            <ProfileCard title="General Information">
              <Grid container spacing={4}>
                {[
                  { label: 'Full Name', name: 'nombre', icon: null },
                  { label: 'Role', name: 'rol', icon: null, disabled: true },
                  { label: 'Email', name: 'email', icon: <MailIcon sx={{ fontSize: 14 }} /> },
                  { label: 'Location', name: 'ubicacion', icon: <MapPinIcon sx={{ fontSize: 14 }} /> },
                  { label: 'Phone', name: 'telefono', icon: <PhoneIcon sx={{ fontSize: 14 }} /> },
                  { label: 'Identification No.', name: 'identification', icon: null, disabled: true },
                  { label: 'Timezone', name: 'zona', icon: <ClockIcon sx={{ fontSize: 14 }} /> },
                ].map((field) => (
                  <Grid size={{ xs: 6 }} key={field.name}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                      <Typography sx={{ color: '#6B7280', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{field.label}</Typography>
                      {editing ? (
                        <TextField
                          fullWidth
                          size="small"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          disabled={field.disabled}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              color: 'white',
                              bgcolor: '#0a0a0a',
                              fontSize: 12,
                              '& fieldset': { borderColor: '#2A2A2A' },
                              '&:hover fieldset': { borderColor: '#4B5563' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                              '&.Mui-disabled': { opacity: 0.5 },
                            },
                          }}
                        />
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: 28 }}>
                          <Typography sx={{ color: 'white', fontWeight: 500, fontSize: 12 }}>{formData[field.name]}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </ProfileCard>

            {/* Recent Activity Card */}
            <ProfileCard title="Recent Activity">
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {activities.map((a, i) => (
                  <ActivityItem key={i} {...a} />
                ))}
              </Box>
            </ProfileCard>

          </Grid>

          {/* Right Column (Security, Notifications, Danger) */}
          <Grid size={{ xs: 12, md: 4.5, lg: 3.8 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            
            {/* Security Section */}
            <ProfileCard title="Security Settings">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Password</Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: 12, letterSpacing: 3 }}>••••••••••</Typography>
                  </Box>
                  <Button onClick={handleOpenPassDialog} variant="outlined" size="small" sx={{ borderColor: '#2A2A2A', color: '#9CA3AF', textTransform: 'none', fontSize: 12, fontWeight: 600, '&:hover': { borderColor: '#4B5563', color: 'white' } }}>
                    Change
                  </Button>
                </Box>
                <Divider sx={{ borderColor: '#1F1F1F' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Active Sessions</Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: 12 }}>
                      {activeSessions.length > 0 ? `${activeSessions.length} dispositivos` : sessionsLoading ? 'Detectando...' : 'Sin sesiones activas'}
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleOpenSessions}
                    variant="outlined" size="small" startIcon={<EyeIcon sx={{ fontSize: 14 }} />}
                    sx={{ borderColor: '#2A2A2A', color: '#9CA3AF', textTransform: 'none', fontSize: 12, fontWeight: 600, '&:hover': { borderColor: '#4B5563', color: 'white' } }}
                  >
                    View
                  </Button>
                </Box>

              </Box>
            </ProfileCard>

            {/* Notifications Card */}
            <ProfileCard title="Notification Preferences">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { key: 'newRequests', label: 'New Requests', sub: 'Instant email and mobile alert' },
                  { key: 'newReviews', label: 'New Reviews', sub: 'Instant email alert' },
            
                ].map((item) => (
                  <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{item.label}</Typography>
                      <Typography sx={{ color: '#6B7280', fontSize: 12 }}>{item.sub}</Typography>
                    </Box>
                    <Switch 
                      checked={notifications[item.key]} 
                      onChange={() => handleToggle(item.key)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </ProfileCard>

            {/* Danger Zone */}
            <ProfileCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AlertCircleIcon sx={{ color: '#F87171', fontSize: 14 }} />
                  <Typography sx={{ color: '#F87171', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Danger Zone</Typography>
                </Box>
                <Typography sx={{ color: '#6B7280', fontSize: 12, lineHeight: 1.5 }}>
                  Irreversibly delete your administrator account and all associated data.
                </Typography>
                <Button fullWidth sx={{ bgcolor: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#F87171', textTransform: 'none', fontSize: 12, fontWeight: 700, py: 1, '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.2)' } }}>
                  Delete Account
                </Button>
              </Box>
            </ProfileCard>

          </Grid>
        </Grid>
      </Box>

      {/* ── Change Password Dialog ─────────────────────────────────────────── */}
      <ChangePasswordDialog
        open={openPassDialog}
        onClose={handleClosePassDialog}
        form={passForm}
        showPass={showPass}
        errors={passErrors}
        passwordData={passwordData}
        submitting={isSubmittingPass}
        onChange={handlePassInputChange}
        onToggleVisibility={togglePassVisibility}
        onSubmit={onSubmitPassword}
      />

      {/* ── Active Sessions Dialog ────────────────────────────────────────── */}
      <ActiveSessionsDialog
        open={sessionsOpen}
        onClose={handleCloseSessions}
        activeSessions={activeSessions}
        recentSessions={recentSessions}
        sessionData={sessionData}
        loading={sessionsLoading}
        closingId={closingId}
        closingAll={closingAll}
        closedAll={closedAll}
        otherActiveSessions={otherActiveSessions}
        onCloseSession={handleCloseSession}
        onCloseAll={handleCloseAll}
      />
    </Box>


  );
}
