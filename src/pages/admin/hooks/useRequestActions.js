import { useSnackbar } from '@/context/SnackbarContext';
import { useDialog } from '@/hooks/useDialog';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';

export function useRequestActions() {
  const viewDialog = useDialog();
  const statusDialog = useDialog();
  const { showSnackbar } = useSnackbar();
  const { getFechData } = useFetchDataPromise();

  const handleUpdateStatus = async (item, newStatus, message) => {
    try {
      if (!item?.id) {
        showSnackbar('Error: Missing request ID', 'error');
        return false;
      }

      const response = await getFechData({
        endPoint: `contacts/${item.id}/status`,
        method: 'PUT',
        additionalData: {
          status: newStatus,
          message: message || ''
        }
      });

      if (response?.code === API_CODES.OK || response?.code === 'OK') {
        showSnackbar(response.message || 'Status updated successfully!', 'success');
        statusDialog.handleCloseDialog();
        return true;
      } else {
        showSnackbar(response?.message || 'Failed to update status', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showSnackbar('Connection error while updating status', 'error');
      return false;
    }
  };

  const getHistory = async (id) => {
    try {
      const response = await getFechData({
        endPoint: `contacts/${id}/history`,
        method: 'GET'
      });
      return response?.data || [];
    } catch (error) {
      console.error('Error fetching history:', error);
      return [];
    }
  };

  return {
    viewDialog,
    statusDialog,
    handleUpdateStatus,
    getHistory,
  };
}
