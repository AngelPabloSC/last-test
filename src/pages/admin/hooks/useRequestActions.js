import { useSnackbar } from '@/context/SnackbarContext';
import { useDialog } from '@/hooks/useDialog';

export function useRequestActions() {
  const viewDialog = useDialog();
  const statusDialog = useDialog();
  const { showSnackbar } = useSnackbar();

  const handleUpdateStatus = async (newStatus) => {
    // Aquí iría la llamada fetch() real a la API.
    
    // Simulando retraso
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    showSnackbar('Status updated successfully!', 'success');
    statusDialog.handleCloseDialog();
    
    return true; // Usado para actualizar la UI desde el padre
  };

  return {
    viewDialog,
    statusDialog,
    handleUpdateStatus,
  };
}
