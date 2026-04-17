import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { apiService } from '@/services/apiService';
import { API_CODES } from '@/constants/apiConstants';

/**
 * Hook to manage blog posts in the admin panel.
 * Handles fetching, pagination, filtering, and CRUD operations.
 */
export const useBlog = ({ status = 'all', search = '' } = {}) => {
  const { getFechData } = useFetchDataPromise();
  
  const [blogData, setBlogData] = useState({
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

  /**
   * Helper to map local status to API expected values if needed.
   */
  const getApiStatus = (localStatus) => {
    if (localStatus === 'all') return null;
    return localStatus.charAt(0).toUpperCase() + localStatus.slice(1);
  };

  /**
   * Main fetcher for the blogs list.
   */
  const fetchBlogs = useCallback(async (page = 1, limit = 10, currentPage = 0) => {
    setBlogData(prev => ({ ...prev, loading: true }));
    try {
      const apiStatus = getApiStatus(status);
      
      const params = new URLSearchParams();
      if (apiStatus) params.append('status', apiStatus);
      if (search)    params.append('search', search);
      params.append('page', page);
      params.append('limit', limit);

      const response = await getFechData({
        endPoint: `blogs/admin?${params.toString()}`,
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setBlogData({
          code: API_CODES.OK,
          data: response.data?.data || [],
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
        setBlogData(prev => ({
          ...prev, code: API_CODES.ERR,
          message: response?.message || 'Error loading blogs',
          loading: false
        }));
      }
    } catch (error) {
      setBlogData(prev => ({
        ...prev, code: API_CODES.ERR,
        message: 'Connection error',
        loading: false
      }));
    }
  }, [status, search, getFechData]);

  // Initial fetch and refetch on search/status change
  useEffect(() => {
    fetchBlogs(1, tableState.perPage, 0);
  }, [status, search]);

  const refreshBlogs = useCallback(() => {
    fetchBlogs(tableState.currentPage + 1, tableState.perPage, tableState.currentPage);
  }, [fetchBlogs, tableState]);

  const deleteBlog = useCallback(async (id) => {
    try {
      const response = await apiService.request({
        endPoint: `blogs/${id}`,
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error deleting blog' };
    }
  }, []);

  const saveBlog = useCallback(async (formData) => {
    try {
      const response = await apiService.request({
        endPoint: 'blogs',
        method: 'POST',
        additionalData: formData
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error creating blog' };
    }
  }, []);

  const updateBlog = useCallback(async (id, formData) => {
    try {
      const response = await apiService.request({
        endPoint: `blogs/${id}`,
        method: 'PUT',
        additionalData: formData
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error updating blog' };
    }
  }, []);

  const updateBlogStatus = useCallback(async (id, status) => {
    try {
      const response = await apiService.request({
        endPoint: `blogs/${id}/visibility`,
        method: 'PUT',
        additionalData: { status }
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error updating blog status' };
    }
  }, []);

  const getBlogById = useCallback(async (id) => {
    try {
      const response = await getFechData({
        endPoint: `blogs/admin/${id}`,
        method: 'GET'
      });
      return response?.data?.data || response?.data || null;
    } catch (error) {
      return null;
    }
  }, [getFechData]);

  return {
    blogData,
    tableState,
    fetchBlogs,
    refreshBlogs,
    deleteBlog,
    saveBlog,
    updateBlog,
    updateBlogStatus,
    getBlogById
  };
};
