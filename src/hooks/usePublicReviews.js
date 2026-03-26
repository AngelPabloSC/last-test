import { useState, useCallback, useEffect } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';

/**
 * Hook to manage public review data with server-side pagination and category filtering.
 * @param {object} params - pagination and filter parameters
 */
export const usePublicReviews = ({ serviceTypeId = 'all', limit = 6 }) => {
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
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  }, [getFechData]);

  useEffect(() => {
    fetchServiceTypes();
  }, [fetchServiceTypes]);

  const fetchReviews = useCallback(async (page = 1) => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      
      // If not "all", send the numeric serviceTypeId
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

  // Refetch when category changes
  useEffect(() => {
    fetchReviews(1);
  }, [serviceTypeId, fetchReviews]);

  return {
    ...data,
    serviceTypes,
    fetchReviews
  };
};
