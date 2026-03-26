
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

// Keywords that indicate the session was closed remotely by the server.
const SESSION_EXPIRED_HINTS = [
  'sesión expirada',
  'cerrada remotamente',
  'session expired',
  'token inválido',
  'unauthorized',
];

const isSessionExpiredMessage = (msg = '') =>
  SESSION_EXPIRED_HINTS.some(hint => msg.toLowerCase().includes(hint));

/**
 * @param {{ endPoint: string, method?: string, additionalData?: object }} params
 * @returns {Promise<{ code: string, data: object, message: string }>}
 */
export const request = async ({ endPoint, method = 'POST', additionalData }) => {
  const user = storageService.getUser() ?? {};
  const urlApi = `${import.meta.env.VITE_URL_FETCH}/${endPoint}`;

  try {
    const isFormData = additionalData && typeof additionalData.append === 'function';

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${method} ${urlApi}`, isFormData ? '[FormData]' : additionalData);
    }

    const response = await fetch(urlApi, {
      method,
      body: isFormData ? additionalData : (additionalData ? JSON.stringify(additionalData) : undefined),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const dataJson = await response.json().catch(() => ({}));

    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status}`, dataJson);
    }

    // ── 401 / session expired ──────────────────────────────────────────────
    if (response.status === 401 || isSessionExpiredMessage(dataJson?.message)) {
      window.dispatchEvent(
        new CustomEvent('sessionExpired', { detail: { message: dataJson?.message } }),
      );
      return { code: API_CODES.ERR, data: null, message: dataJson?.message };
    }

    if (!response.ok) {
      return {
        code: API_CODES.ERR,
        data: {},
        message: dataJson?.message || `Error ${response.status}`,
      };
    }

    // Respuesta con estructura { code, data, message } de la API
    if (dataJson.code !== undefined) {
      // Also catch ERR responses that signal session expiry
      if (dataJson.code === API_CODES.ERR && isSessionExpiredMessage(dataJson?.message)) {
        window.dispatchEvent(
          new CustomEvent('sessionExpired', { detail: { message: dataJson?.message } }),
        );
      }
      return { code: dataJson.code, data: dataJson.data, message: dataJson.message };
    }

    // Respuesta con objeto plano (e.g. { id, name, ... })
    return { code: API_CODES.OK, data: dataJson, message: '' };

  } catch {
    return { code: API_CODES.ERR, data: {}, message: 'Error' };
  }
};

export const apiService = { request };
