import { useState, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { useSnackbar } from '@/context/SnackbarContext';
import { API_CODES } from '@/constants/apiConstants';

/**
 * Hook to manage review actions: status updates and history.
 */
export const useReviewActions = () => {
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  // Update status (PUT /reviews/:id/status)
  const updateReviewStatus = useCallback(async (id, status, message = '') => {
    setLoading(true);
    try {
      const response = await getFechData({
        endPoint: `reviews/${id}/status`,
        method: 'PUT',
        additionalData: { status, message }
      });

      if (response?.code === API_CODES.OK) {
        showSnackbar(response.message || 'Status updated successfully', 'success');
        return true;
      } else {
        showSnackbar(response?.message || 'Error updating status', 'error');
        return false;
      }
    } catch (error) {
      showSnackbar('Connection error', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [getFechData, showSnackbar]);

  // Fetch history (GET /reviews/:id/history)
  const getReviewHistory = useCallback(async (id) => {
    try {
      const response = await getFechData({
        endPoint: `reviews/${id}/history`,
        method: 'GET'
      });

      if (response?.code === API_CODES.OK) {
        return response.data || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching review history:', error);
      return [];
    }
  }, [getFechData]);

  return {
    updateReviewStatus,
    getReviewHistory,
    loading
  };
};
