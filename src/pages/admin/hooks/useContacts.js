import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

/**
 * Hook para gestionar la lista de solicitudes (Contactos) con paginación servidor.
 * @param {object} params - Parámetros iniciales de filtrado y búsqueda.
 */
export const useContacts = ({ status = 'todas', search = '' }) => {
  const { getFechData } = useFetchDataPromise();
  const [contactsData, setContactsData] = useState({
    code: null,
    data: [],
    message: '',
    loading: true,
    summary: []
  });

  const [tableState, setTableState] = useState({ 
    count: 0, 
    currentPage: 0, 
    perPage: 10 
  });

  // Mapear filtros locales a valores de API
  const getApiStatus = (localStatus) => {
    const map = {
      'nuevas': 'New',
      'en_progreso': 'In Progress',
      'completadas': 'Completed',
      'canceladas': 'Canceled'
    };
    return map[localStatus] || null;
  };

  const fetchContacts = useCallback(async (page = 1, limit = 10, currentPage = 0) => {
    setContactsData(prev => ({ ...prev, loading: true }));
    try {
      const idUser = storageService.getUser()?.id;
      const sessionToken = storageService.getSessionToken();
      const deviceId = storageService.getDeviceId();

      const apiStatus = getApiStatus(status);
      
      const params = new URLSearchParams();
      if (apiStatus) params.append('status', apiStatus);
      if (search) params.append('search', search);
      params.append('page', page);
      params.append('limit', limit);
      params.append('idUser', idUser);
      params.append('sessionToken', sessionToken);
      params.append('deviceId', deviceId);

      const response = await getFechData({
        endPoint: `contacts?${params.toString()}`,
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setContactsData({
          code: API_CODES.OK,
          data: response.data?.list || [],
          message: response.message || '',
          loading: false,
          summary: response.data?.summary || []
        });

        setTableState({
          count: response.data?.total || 0,
          currentPage: currentPage,
          perPage: limit
        });
      } else {
        setContactsData(prev => ({
          ...prev,
          code: API_CODES.ERR,
          message: response?.message || 'Error al cargar contactos',
          loading: false
        }));
      }
    } catch (error) {
      setContactsData(prev => ({
        ...prev,
        code: API_CODES.ERR,
        message: 'Error de conexión',
        loading: false
      }));
    }
  }, [status, search, getFechData]);

  // Efecto inicial y cuando cambian filtros/búsqueda
  useEffect(() => {
    fetchContacts(1, tableState.perPage, 0);
  }, [status, search]);

  return {
    contactsData,
    tableState,
    fetchContacts,
    refreshContacts: () => fetchContacts(tableState.currentPage + 1, tableState.perPage, tableState.currentPage)
  };
};
