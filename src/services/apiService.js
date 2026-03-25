
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

/**
 * @param {{ endPoint: string, method?: string, additionalData?: object }} params
 * @returns {Promise<{ code: string, data: object, message: string }>}
 */
export const request = async ({ endPoint, method = 'POST', additionalData }) => {
  const user   = storageService.getUser() ?? {};
  const urlApi = `${import.meta.env.VITE_URL_FETCH}/${endPoint}`;

  try {
    const response = await fetch(urlApi, {
      method,
      ...(method.toUpperCase() !== 'GET' && { body: JSON.stringify(additionalData) }),
      headers: {
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${user.accessToken}`,
      },
    });

    const dataJson = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        code:    API_CODES.ERR,
        data:    {},
        message: dataJson?.message || `Error ${response.status}`,
      };
    }

    // Respuesta con estructura { code, data, message } de la API
    if (dataJson.code !== undefined) {
      return { code: dataJson.code, data: dataJson.data, message: dataJson.message };
    }

    // Respuesta con objeto plano (e.g. { id, name, ... })
    return { code: API_CODES.OK, data: dataJson, message: '' };

  } catch {
    return { code: API_CODES.ERR, data: {}, message: 'Error' };
  }
};

export const apiService = { request };
