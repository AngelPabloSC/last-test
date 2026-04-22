import { useState, useCallback, useEffect } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';

export const usePublicReviews = ({ serviceTypeId = 'all', limit = 6, fetchServices = true }) => {
  const { getFechData } = useFetchDataPromise();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [data, setData] = useState({
    list: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    summary: { average: 0, count: 0 },
    loading: true,
    error: null
  });

  const fetchServiceTypes = useCallback(async () => {
    try {
      const response = await getFechData({
        endPoint: 'service-types',
        method: 'GET',
      });
      if (response?.code === API_CODES.OK) {
        setServiceTypes(response.data || []);
      }
    } catch {
    }
  }, [getFechData]);

  useEffect(() => {
    if (fetchServices) fetchServiceTypes();
  }, [fetchServiceTypes, fetchServices]);

  const fetchReviews = useCallback(async (page = 1) => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      
      if (serviceTypeId !== 'all') {
        params.append('serviceTypeId', serviceTypeId);
      }

      const response = await getFechData({
        endPoint: `reviews?${params.toString()}`,
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setData({
          list: response.data?.list || [],
          total: response.data?.total || 0,
          totalPages: response.data?.totalPages || 0,
          currentPage: page,
          summary: response.data?.summary || { average: 0, count: 0 },
          loading: false,
          error: null
        });
      } else {
        setData(prev => ({
          ...prev,
          loading: false,
          error: response?.message || 'Error loading reviews'
        }));
      }
    } catch (err) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Connection error'
      }));
    }
  }, [serviceTypeId, limit, getFechData]);

  useEffect(() => {
    fetchReviews(1);
  }, [serviceTypeId, fetchReviews]);

  return {
    ...data,
    serviceTypes,
    fetchReviews
  };
};
