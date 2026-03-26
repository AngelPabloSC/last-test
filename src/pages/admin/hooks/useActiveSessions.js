// ─── useActiveSessions.js ─────────────────────────────────────────────────────
// Hook that manages the Active Sessions dialog state and API calls.

import { useState, useCallback, useMemo } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { useSnackbar } from '@/context/SnackbarContext';
import { API_CODES } from '@/constants/apiConstants';
import { storageService } from '@/services/storageService';

// ─── Mapper ──────────────────────────────────────────────────────────────────
// Transforms API session into UI session format
const mapApiSessionToUi = (session, currentSessionToken) => {
  const ua = session.userAgent || '';
  const deviceId = session.deviceId || '';

  // 1. Device Type & Icon
  let device = 'Computadora';
  let icon = 'monitor';
  let iconColor = '#6B7280';
  let iconBg = '#6B728020';

  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    device = ua.includes('iPhone') ? 'iPhone' : 'Dispositivo móvil';
    icon = 'smartphone';
    iconColor = '#3B82F6';
    iconBg = '#3B82F618';
  } else if (ua.includes('Macintosh')) {
    device = 'Mac';
    icon = 'monitor';
    iconColor = '#FFD700';
    iconBg = '#FFD70018';
  } else if (ua.includes('Windows')) {
    device = 'Windows PC';
  }

  // 2. Browser Detection
  let browser = 'Incierto';
  if (ua.includes('Postman')) browser = 'Postman';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';
  else if (ua.includes('Edg/')) browser = 'Edge';

  // 3. Location / Device Name logic
  // If deviceId looks like a human-recognized name (PC-LUIS), use it.
  // Otherwise, use "Ubicación remota".
  const isCustomName = deviceId && !deviceId.startsWith('device_');
  const location = isCustomName ? deviceId : 'Ubicación remota';

  // 4. State
  let stateText = '';
  if (session.isActive) {
    stateText = 'Activa ahora';
  } else if (session.closedAt) {
    stateText = `Cerrada el ${new Date(session.closedAt).toLocaleDateString()}`;
  } else {
    stateText = 'Sesión finalizada';
  }

  return {
    id: session.id,
    device,
    browser,
    location,
    ip: session.ipAddress?.replace('::ffff:', '') || 'Desconocida',
    stateText,
    isActive: session.isActive,
    isCurrent: session.token === currentSessionToken,
    icon,
    iconColor,
    iconBg,
  };
};

export const useActiveSessions = () => {
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [sessionData, setSessionData] = useState({
    code:    null,
    data:    { active: [], recent: [] },
    message: '',
    loading: false,
  });
  const [closingId, setClosingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [closingAll, setClosingAll] = useState(false);
  const [closedAll, setClosedAll] = useState(false);

  // ── Fetch sessions ─────────────────────────────────────────────────────────
  const fetchSessions = useCallback(async () => {
    setSessionData(prev => ({ ...prev, loading: true }));
    try {
      const response = await getFechData({
        endPoint: 'admin/sessions',
        method:   'GET',
      });

      if (response?.code === API_CODES.OK) {
        const currentToken = storageService.getSessionToken();
        const active = (response.data?.active || []).map(s => mapApiSessionToUi(s, currentToken));
        const recent = (response.data?.recent || []).map(s => mapApiSessionToUi(s, currentToken));

        setSessionData({
          code:    API_CODES.OK,
          data:    { active, recent },
          message: response.message || 'Éxito',
          loading: false,
        });
      } else {
        const msg = response?.message || 'No se pudieron cargar las sesiones.';
        setSessionData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch {
      const msg = 'Error de conexión con el servidor.';
      setSessionData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
      showSnackbar(msg, 'error');
    }
  }, [getFechData, showSnackbar]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleOpen = () => {
    setClosedAll(false);
    setShowConfirm(false);
    setOpen(true);
    fetchSessions();
  };

  const handleClose = () => {
    if (closingId || closingAll) return;
    setOpen(false);
    setShowConfirm(false);
    setClosedAll(false);
  };

  const handleCloseSession = async (sessionId) => {
    setClosingId(sessionId);
    try {
      const response = await getFechData({
        endPoint: `admin/sessions/${sessionId}`,
        method:   'DELETE',
      });

      if (response?.code === API_CODES.OK) {
        setSessionData(prev => ({
          ...prev,
          data: {
            active: prev.data.active.filter(s => s.id !== sessionId),
            recent: prev.data.recent.map(s => 
              s.id === sessionId ? { ...s, isActive: false, stateText: 'Cerrada ahora' } : s
            )
          }
        }));
        showSnackbar('Sesión cerrada correctamente.', 'success');
      } else {
        showSnackbar(response?.message || 'No se pudo cerrar la sesión.', 'error');
      }
    } catch {
      showSnackbar('Error al cerrar la sesión.', 'error');
    } finally {
      setClosingId(null);
    }
  };

  const handleCloseAll = async () => {
    setClosingAll(true);
    try {
      const response = await getFechData({
        endPoint: 'admin/sessions',
        method:   'DELETE',
      });

      if (response?.code === API_CODES.OK) {
        setSessionData(prev => ({
          ...prev,
          data: {
            active: prev.data.active.filter(s => s.isCurrent),
            recent: prev.data.recent.map(s => 
              (!s.isCurrent ? { ...s, isActive: false, stateText: 'Cerrada ahora' } : s)
            )
          }
        }));
        setClosedAll(true);
        setShowConfirm(false);
      } else {
        showSnackbar(response?.message || 'Could not close sessions.', 'error');
      }
    } catch {
      showSnackbar('Error closing all sessions.', 'error');
    } finally {
      setClosingAll(false);
    }
  };

  const otherActiveSessions = useMemo(() => 
    sessionData.data.active.filter(s => !s.isCurrent), 
    [sessionData.data.active]
  );

  return {
    open,
    loading:        sessionData.loading,
    activeSessions: sessionData.data.active,
    recentSessions: sessionData.data.recent,
    sessionData, // Extrayendo el objeto completo si se necesita
    closingId,
    closingAll,
    closedAll,
    showConfirm,
    otherActiveSessions,
    handleOpen,
    handleClose,
    handleCloseSession,
    handleCloseAll,
    setShowConfirm,
  };
};
