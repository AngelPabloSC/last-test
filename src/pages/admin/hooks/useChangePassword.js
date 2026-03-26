import { useState } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { validationRules } from '@/utils/validationRules';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

export const useChangePassword = (onSuccess) => {
  const { showSnackbar } = useSnackbar();
  const { getFechData } = useFetchDataPromise();
  
  const [openPassDialog, setOpenPassDialog] = useState(false);
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [passErrors, setPassErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    code:    null,
    data:    {},
    message: '',
    loading: false,
  });

  const handleOpenPassDialog = () => {
    setPassForm({ current: '', new: '', confirm: '' });
    setPassErrors({});
    setOpenPassDialog(true);
  };

  const handleClosePassDialog = () => !passwordData.loading && setOpenPassDialog(false);

  const handlePassInputChange = (e) => {
    const { name, value } = e.target;
    setPassForm(prev => ({ ...prev, [name]: value }));
    if (passErrors[name]) setPassErrors(prev => ({ ...prev, [name]: '' }));
  };

  const togglePassVisibility = (field) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!passForm.current) newErrors.current = 'Current password is required';
    
    if (!passForm.new) {
      newErrors.new = 'New password is required';
    } else if (passForm.new.length < 8) {
      newErrors.new = 'Minimum 8 characters required';
    } else if (passForm.new.length > 16) {
      newErrors.new = 'Maximum 16 characters allowed';
    } else if (!validationRules.password.value.test(passForm.new)) {
      newErrors.new = 'Must include uppercase, number and special character';
    }

    if (passForm.new !== passForm.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setPassErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitPassword = async () => {
    if (!validatePasswords()) return;

    setPasswordData(prev => ({ ...prev, loading: true }));
    try {
      const user = storageService.getUser() || {};
      const idUser = user.id || 0;
      const sessionToken = storageService.getSessionToken() || '';

      const response = await getFechData({
        endPoint: 'admin/password',
        method:   'PUT',
        additionalData: {
          idUser,
          sessionToken,
          deviceId: storageService.getDeviceId(),
          oldPassword: passForm.current,
          newPassword: passForm.new,
        },
      });

      if (response?.code === API_CODES.OK) {
        setPasswordData({
          code:    API_CODES.OK,
          data:    response.data || {},
          message: response.message || 'Password updated successfully.',
          loading: false,
        });
        showSnackbar('Password updated successfully', 'success');
        setOpenPassDialog(false);
        if (onSuccess) onSuccess();
      } else {
        const msg = response?.message || 'Error updating password.';
        setPasswordData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (err) {
      const msg = 'Server connection error.';
      setPasswordData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
      showSnackbar(msg, 'error');
    }
  };

  return {
    openPassDialog,
    passForm,
    showPass,
    passErrors,
    passwordData, // Expuesto para estados de carga y errores
    isSubmittingPass: passwordData.loading,
    handleOpenPassDialog,
    handleClosePassDialog,
    handlePassInputChange,
    togglePassVisibility,
    onSubmitPassword
  };
};
