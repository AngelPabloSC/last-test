import { useState } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';
import { useSnackbar } from '@/context/SnackbarContext';
import { useLoginContext } from '@/context/LoginContext';
import { helpImage } from '@/helpers/helpImage';

export const useProfilePicture = () => {
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();
  const { login, user: currentUser } = useLoginContext();
  const [pictureData, setPictureData] = useState({
    code: null,
    data: {},
    message: '',
    loading: false,
  });

  const handleUpload = async (file) => {
    if (!file) return;

    // Límite de 1.8 MB
    const MAX_SIZE = 1.8 * 1024 * 1024;

    setPictureData(prev => ({ ...prev, loading: true }));
    try {
      // Comprimir solo si es imagen y mayor a 1MB
      const compressedFile = await helpImage.resizeImage(file, {
        compressOnlyIfLargerThan: 1024 * 1024, // 1MB
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.8
      });

      if (compressedFile.size > MAX_SIZE) {
        showSnackbar('The image is too large (max 1.8MB).', 'warning');
        setPictureData(prev => ({ ...prev, loading: false }));
        return;
      }

      const idUser = storageService.getUser()?.id;
      const sessionToken = storageService.getSessionToken();
      const deviceId = storageService.getDeviceId();

      const formData = new FormData();
      formData.append('idUser', idUser);
      formData.append('sessionToken', sessionToken);
      formData.append('deviceId', deviceId);
      formData.append('file', compressedFile);

      const response = await getFechData({
        endPoint: 'admin/profile/picture',
        method: 'POST',
        additionalData: formData,
      });

      if (response?.code === API_CODES.OK) {
        setPictureData({
          code: API_CODES.OK,
          data: response.data || {},
          message: response.message || 'Photo updated successfully.',
          loading: false,
        });
        showSnackbar('Profile picture updated', 'success');

        const newUrl = response.data?.profilePicture || 
                       response.data?.url || 
                       (typeof response.data === 'string' ? response.data : null);

        if (newUrl) {
          // Cache buster to force browser to re-fetch          // Cache buster for reload
          const busterUrl = `${newUrl}${newUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
          const updatedUser = { ...currentUser, profilePicture: busterUrl };
          
          login({
            accessToken:  storageService.getToken(),
            sessionToken: storageService.getSessionToken(),
            user:         updatedUser
          }, false); 
        }
      } else {
        const msg = response?.message || 'Error uploading image.';
        setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (error) {
      const msg = 'Connection error while uploading photo.';
      setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
      showSnackbar(msg, 'error');
    }
  };

  const handleDelete = async () => {
    setPictureData(prev => ({ ...prev, loading: true }));
    try {
      const idUser = storageService.getUser()?.id;
      const sessionToken = storageService.getSessionToken();
      const deviceId = storageService.getDeviceId();

      const response = await getFechData({
        endPoint: 'admin/profile/picture',
        method: 'DELETE',
        additionalData: { idUser, sessionToken, deviceId }
      });

      if (response?.code === API_CODES.OK) {
        setPictureData({
          code: API_CODES.OK,
          data: response.data || {},
          message: response.message || 'Photo removed successfully.',
          loading: false,
        });
        showSnackbar('Profile picture removed', 'success');

        const updatedUser = { ...currentUser, profilePicture: null };
        login({
          accessToken:  storageService.getToken(),
          sessionToken: storageService.getSessionToken(),
          user:         updatedUser
        }, false); // shouldNavigate = false
      } else {
        const msg = response?.message || 'Error removing image.';
        setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (error) {
      const msg = 'Connection error while removing photo.';
      setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
      showSnackbar(msg, 'error');
    }
  };

  return {
    isUploading: pictureData.loading,
    isDeleting: pictureData.loading,
    pictureData,
    handleUpload,
    handleDelete,
  };
};
