// ─── useFetchDataPromise.js ───────────────────────────────────────────────────
// Adaptador React sobre apiService.
// Expone getFechData como callback estable para usarlo dentro de otros hooks.

import { useCallback } from 'react';
import { apiService } from '@/services/apiService';

export const useFetchDataPromise = () => {
  const getFechData = useCallback(
    ({ endPoint, method = 'POST', additionalData }) =>
      apiService.request({ endPoint, method, additionalData }),
    [],
  );

  return { getFechData };
};
