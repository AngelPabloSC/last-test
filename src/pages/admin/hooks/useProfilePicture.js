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
        showSnackbar('La imagen es demasiado pesada (máx 1.8MB).', 'warning');
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
          message: response.message || 'Foto actualizada con éxito.',
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
        const msg = response?.message || 'Error al subir la imagen.';
        setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (error) {
      const msg = 'Error de conexión al subir la foto.';
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
          message: response.message || 'Foto eliminada con éxito.',
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
        const msg = response?.message || 'Error al eliminar la imagen.';
        setPictureData(prev => ({ ...prev, code: API_CODES.ERR, message: msg, loading: false }));
        showSnackbar(msg, 'error');
      }
    } catch (error) {
      const msg = 'Error de conexión al eliminar la foto.';
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
