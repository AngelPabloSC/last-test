import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';

/**
 * Hook to manage the review list with server pagination and filtering.
 * @param {object} params - Initial filtering and search parameters.
 */
export const useReviews = ({ status = 'all', search = '' }) => {
  const { getFechData } = useFetchDataPromise();
  const [reviewsData, setReviewsData] = useState({
    code: null,
    data: [],
    message: '',
    loading: true,
    summary: [],
    averageRating: 0
  });

  const [tableState, setTableState] = useState({ 
    count: 0, 
    currentPage: 0, 
    perPage: 10 
  });

  // Map local filters to API status values
  const getApiStatus = (localStatus) => {
    const map = {
      'all': null,
      'pending': 'pending', 
      'published': 'published',
      'rejected': 'rejected',
      '5_stars': '5_stars'
    };
    return map[localStatus] || null;
  };

  const fetchReviews = useCallback(async (page = 1, limit = 10, currentPage = 0) => {
    setReviewsData(prev => ({ ...prev, loading: true }));
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
        endPoint: `reviews/admin?${params.toString()}`,
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setReviewsData({
          code: API_CODES.OK,
          data: response.data?.list || [],
          message: response.message || '',
          loading: false,
          summary: response.data?.summary || [],
          averageRating: response.data?.averageRating || 0
        });

        setTableState({
          count: response.data?.total || 0,
          currentPage: currentPage,
          perPage: limit
        });
      } else {
        setReviewsData(prev => ({
          ...prev,
          code: API_CODES.ERR,
          message: response?.message || 'Error loading reviews',
          loading: false
        }));
      }
    } catch (error) {
      setReviewsData(prev => ({
        ...prev,
        code: API_CODES.ERR,
        message: 'Connection error',
        loading: false
      }));
    }
  }, [status, search, getFechData]);

  // Initial fetch and on filter/search change
  useEffect(() => {
    fetchReviews(1, tableState.perPage, 0);
  }, [status, search]);

  return {
    reviewsData,
    tableState,
    fetchReviews,
    refreshReviews: () => fetchReviews(tableState.currentPage + 1, tableState.perPage, tableState.currentPage)
  };
};
