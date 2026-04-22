import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

const getCache = new Map();
const CACHE_TTL_MS = 30_000;

const getCached = (key) => {
  const entry = getCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) { getCache.delete(key); return null; }
  return entry.data;
};
const setCache = (key, data) => getCache.set(key, { data, ts: Date.now() });
export const invalidateCache = (endPoint) => getCache.delete(endPoint);

const SESSION_EXPIRED_HINTS = [
  'sesión expirada',
  'cerrada remotamente',
  'session expired',
  'token inválido',
  'unauthorized',
];

const isSessionExpiredMessage = (msg = '') =>
  SESSION_EXPIRED_HINTS.some(hint => msg.toLowerCase().includes(hint));

export const request = async ({ endPoint, method = 'POST', additionalData }) => {
  const isGET = method === 'GET';
  if (isGET) {
    const cached = getCached(endPoint);
    if (cached) return cached;
  }

  const user = storageService.getUser() ?? {};
  const urlApi = `${import.meta.env.VITE_URL_FETCH}/${endPoint}`;

  try {
    const isFormData = additionalData && typeof additionalData.append === 'function';

    const response = await fetch(urlApi, {
      method,
      body: isFormData ? additionalData : (additionalData ? JSON.stringify(additionalData) : undefined),
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const dataJson = await response.json().catch(() => ({}));

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

    if (dataJson.code !== undefined) {
      if (dataJson.code === API_CODES.ERR && isSessionExpiredMessage(dataJson?.message)) {
        window.dispatchEvent(
          new CustomEvent('sessionExpired', { detail: { message: dataJson?.message } }),
        );
      }
      return { code: dataJson.code, data: dataJson.data, message: dataJson.message };
    }

    const result = { code: API_CODES.OK, data: dataJson, message: '' };
    if (isGET) setCache(endPoint, result);
    return result;

  } catch {
    return { code: API_CODES.ERR, data: {}, message: 'Error' };
  }
};

export const apiService = { request };
