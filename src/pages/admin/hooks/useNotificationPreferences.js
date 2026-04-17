import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';
import { useSnackbar } from '@/context/SnackbarContext';

export const useNotificationPreferences = () => {
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();

  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track which notificationTypeId is currently being toggled
  const [togglingId, setTogglingId] = useState(null);

  const fetchPreferences = useCallback(async () => {
    setLoading(true);
    const response = await getFechData({
      endPoint: 'admin/notification-preferences',
      method: 'GET',
    });

    if (response?.code === API_CODES.OK) {
      setPreferences(response.data ?? []);
    }
    setLoading(false);
  }, [getFechData]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const togglePreference = async (id, currentEnabled) => {
    const newEnabled = !currentEnabled;

    // Optimistic update
    setPreferences(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: newEnabled } : p))
    );
    setTogglingId(id);

    const response = await getFechData({
      endPoint: 'admin/notification-preferences',
      method: 'PUT',
      additionalData: { notificationTypeId: id, enabled: newEnabled },
    });

    setTogglingId(null);

    if (response?.code !== API_CODES.OK) {
      // Revert on failure
      setPreferences(prev =>
        prev.map(p => (p.id === id ? { ...p, enabled: currentEnabled } : p))
      );
      showSnackbar(response?.message || 'Failed to update notification preference', 'error');
    }
  };

  return { preferences, loading, togglingId, togglePreference };
};
