import { useState } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';
import { useSnackbar } from '@/context/SnackbarContext';
import { useLoginContext } from '@/context/LoginContext';

export const useUpdateProfile = (formData, setEditing) => {
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();
  const { login, user: currentUser } = useLoginContext();
  const [profileData, setProfileData] = useState({
    code:    null,
    data:    {},
    message: '',
    loading: false,
  });

  const onSubmitProfile = async () => {
    setProfileData(prev => ({ ...prev, loading: true }));
    try {
      const idUser       = storageService.getUser()?.id;
      const sessionToken = storageService.getSessionToken();
      const deviceId     = storageService.getDeviceId();

      const response = await getFechData({
        endPoint: 'admin/profile/data',
        method:   'PUT', 
        additionalData: {
          idUser,
          sessionToken,
          deviceId,
          location:               formData.ubicacion,
          names:                  formData.nombre,
          phone:                  formData.telefono,
          email:                  formData.email,
          identificationNumber:   formData.identification,
        },
      });

      if (response?.code === API_CODES.OK) {
        setProfileData({
          code:    API_CODES.OK,
          data:    response.data || {},
          message: response.message || 'Profile updated successfully.',
          loading: false,
        });
        showSnackbar('Profile updated successfully', 'success');
        
        // Deep merge the new values with current state to avoid regressions
        const latestToken = storageService.getToken();
        const latestSession = storageService.getSessionToken();
        const latestDeviceId = storageService.getDeviceId();

        const updatedUser = {
          ...currentUser,
          ...response.data, 
          person: {
            ...currentUser?.person,
            names:                formData.nombre,
            phone:                formData.telefono,
            email:                formData.email,
            identificationNumber: formData.identification,
            ...response.data?.person
          },
          location:    formData.ubicacion,
          email:       formData.email,
          accessToken: latestToken // Keep token at root
        };
        
        login({ 
          accessToken:  latestToken, 
          sessionToken: latestSession, 
          user:         updatedUser 
        }, false); // shouldNavigate = false
        
        setEditing(false);
      } else {
        const msg = response?.message || 'Error updating profile.';
        setProfileData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (error) {
      const msg = 'Server connection error.';
      setProfileData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
      showSnackbar(msg, 'error');
    }
  };

  return {
    isUpdating: profileData.loading,
    profileData,
    onSubmitProfile,
  };
};
