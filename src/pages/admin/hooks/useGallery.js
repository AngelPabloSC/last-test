import { useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { apiService } from '@/services/apiService';
import { API_CODES } from '@/constants/apiConstants';

export const useGallery = ({ status = 'all', search = '' } = {}) => {
  const { getFechData } = useFetchDataPromise();
  
  const [galleryData, setGalleryData] = useState({
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

  // Map local filter statuses to API category parameters if applicable
  // For now, if 'all', don't send status. Otherwise send status. But the user didn't specify.
  // We'll keep it simple and just use the ones from before if needed.
  const getApiStatus = (localStatus) => {
    if (localStatus === 'all') return null;
    const map = {
      'residential': 'Residential',
      'commercial':  'Commercial',
      'industrial':  'Industrial',
      'interior':    'Interior Design'
    };
    return map[localStatus] || localStatus;
  };

  const fetchGallery = useCallback(async (page = 1, limit = 10, currentPage = 0) => {
    setGalleryData(prev => ({ ...prev, loading: true }));
    try {
      const apiStatus = getApiStatus(status);
      
      const params = new URLSearchParams();
      if (apiStatus) params.append('status', apiStatus);
      if (search)    params.append('search', search);
      params.append('page', page);
      params.append('limit', limit);

      const response = await getFechData({
        endPoint: `projects?${params.toString()}`,
        method: 'GET',
      });

      if (response?.code === API_CODES.OK) {
        setGalleryData({
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
        setGalleryData(prev => ({
          ...prev, code: API_CODES.ERR,
          message: response?.message || 'Error loading projects',
          loading: false
        }));
      }
    } catch (error) {
      setGalleryData(prev => ({
        ...prev, code: API_CODES.ERR,
        message: 'Connection error',
        loading: false
      }));
    }
  }, [status, search, getFechData]);

  // Initial fetch and refetch on search/status change
  useEffect(() => {
    fetchGallery(1, tableState.perPage, 0);
  }, [status, search]);

  const refreshGallery = useCallback(() => {
    fetchGallery(tableState.currentPage + 1, tableState.perPage, tableState.currentPage);
  }, [fetchGallery, tableState]);

  const deleteProject = useCallback(async (id) => {
    try {
      const response = await apiService.request({
        endPoint: `projects/${id}`,
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error deleting project' };
    }
  }, []);

  const saveProject = useCallback(async (projectData) => {
    try {
      // expected payload: { serviceTypeId, title, year, client, location, area, about }
      const response = await apiService.request({
        endPoint: 'projects',
        method: 'POST',
        additionalData: projectData
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error creating project' };
    }
  }, []);

  const updateProject = useCallback(async (id, projectData) => {
    try {
      const response = await apiService.request({
        endPoint: `projects/${id}`,
        method: 'PUT',
        additionalData: projectData
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error updating project' };
    }
  }, []);

  const updateProjectStatus = useCallback(async (id, status, comment = 'Status changed via admin panel.') => {
    try {
      const response = await apiService.request({
        endPoint: `projects/${id}/status`,
        method: 'PUT',
        additionalData: { status, comment }
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error updating project status' };
    }
  }, []);

  const uploadProjectImages = useCallback(async (id, formData) => {
    try {
      const response = await apiService.request({
        endPoint: `projects/${id}/images`,
        method: 'POST',
        additionalData: formData
      });
      return response;
    } catch (error) {
      return { code: 'ERR', message: error.message || 'Error uploading images' };
    }
  }, []);

  // Getting project by ID usually implies calling an endpoint if data is not fully loaded
  const getProjectById = useCallback(async (id) => {
    try {
      const response = await getFechData({
        endPoint: `projects/${id}`,
        method: 'GET'
      });
      return response?.data?.data || response?.data || null;
    } catch (error) {
      return null;
    }
  }, [getFechData]);

  return {
    galleryData,
    tableState,
    fetchGallery,
    refreshGallery,
    deleteProject,
    saveProject,
    updateProject,
    updateProjectStatus,
    uploadProjectImages,
    getProjectById
  };
};
