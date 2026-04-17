import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { storageService } from '@/services/storageService';
import { API_CODES } from '@/constants/apiConstants';
import { useLoginContext } from '@/context/LoginContext';
import { useSnackbar } from '@/context/SnackbarContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useLoginContext();
  const { getFechData } = useFetchDataPromise();
  const { showSnackbar } = useSnackbar();

  // Service Requests State
  const [newCount, setNewCount] = useState(0);
  const [newRequests, setNewRequests] = useState([]);
  
  // Reviews State
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const [pendingReviews, setPendingReviews] = useState([]);
  
  const [loading, setLoading] = useState(false);

  // Global Dialogs State
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isReviewDetailOpen, setIsReviewDetailOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchNotificationData = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const idUser = storageService.getUser()?.id;
      const sessionToken = storageService.getSessionToken();
      const deviceId = storageService.getDeviceId();
      const [contactsRes, reviewsRes] = await Promise.all([
        getFechData({
          endPoint: `contacts?status=New&page=1&limit=5&idUser=${idUser}&sessionToken=${sessionToken}&deviceId=${deviceId}`,
          method: 'GET',
        }),
        getFechData({
          endPoint: `reviews/admin?status=New&page=1&limit=5&idUser=${idUser}&sessionToken=${sessionToken}&deviceId=${deviceId}`,
          method: 'GET',
        })
      ]);

      // Process Contacts
      if (contactsRes?.code === API_CODES.OK) {
        setNewRequests(contactsRes.data?.list || []);
        const summary = contactsRes.data?.summary || [];
        const newStatus = summary.find(s => s.status === 'New');
        setNewCount(newStatus ? newStatus.count : 0);
      }

      // Process Reviews
      if (reviewsRes?.code === API_CODES.OK) {
        setPendingReviews(reviewsRes.data?.list || []);
        const summary = reviewsRes.data?.summary || [];
        const pendingStatus = summary.find(s => s.status === 'New'); // API seems to use "New" in summary too
        setPendingReviewsCount(pendingStatus ? pendingStatus.count : 0);
      }

    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [getFechData, user?.id]);

  useEffect(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  // Request Actions
  const openRequestDetail = useCallback((request) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  }, []);

  const closeRequestDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedRequest(null);
  }, []);

  const handleUpdateStatus = async (id, newStatus, message) => {
    try {
      const response = await getFechData({
        endPoint: `contacts/${id}/status`,
        method: 'PUT',
        additionalData: { status: newStatus, message: message || '' }
      });

      if (response?.code === API_CODES.OK || response?.code === 'OK') {
        showSnackbar(response.message || 'Status updated successfully!', 'success');
        if (selectedRequest?.id === id) {
          setSelectedRequest(prev => ({ ...prev, status: newStatus }));
        }
        fetchNotificationData();
        return true;
      } else {
        showSnackbar(response?.message || 'Failed to update status', 'error');
        return false;
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showSnackbar('Connection error while updating status', 'error');
      return false;
    }
  };

  const getHistory = async (id) => {
    try {
      const response = await getFechData({
        endPoint: `contacts/${id}/history`,
        method: 'GET'
      });
      return response?.data || [];
    } catch (error) {
      return [];
    }
  };

  // Review Actions
  const openReviewDetail = useCallback((review) => {
    setSelectedReview(review);
    setIsReviewDetailOpen(true);
  }, []);

  const closeReviewDetail = useCallback(() => {
    setIsReviewDetailOpen(false);
    setSelectedReview(null);
  }, []);

  const handleUpdateReviewStatus = async (id, newStatus, message) => {
    try {
      const response = await getFechData({
        endPoint: `reviews/${id}/status`,
        method: 'PUT',
        additionalData: { status: newStatus, message: message || '' }
      });

      if (response?.code === API_CODES.OK) {
        showSnackbar(response.message || 'Review updated successfully!', 'success');
        if (selectedReview?.id === id) {
          setSelectedReview(prev => ({ ...prev, status: newStatus }));
        }
        fetchNotificationData();
        return true;
      } else {
        showSnackbar(response?.message || 'Failed to update review', 'error');
        return false;
      }
    } catch (error) {
      showSnackbar('Connection error while updating review', 'error');
      return false;
    }
  };

  const getReviewHistory = async (id) => {
    try {
      const response = await getFechData({
        endPoint: `reviews/${id}/history`,
        method: 'GET'
      });
      return response?.data || [];
    } catch (error) {
      return [];
    }
  };

  const value = {
    // Counts
    newCount,
    pendingReviewsCount,
    totalNotifications: newCount + pendingReviewsCount,
    
    // Lists
    newRequests,
    pendingReviews,
    
    loading,
    refreshNotifications: fetchNotificationData,
    
    // Request Dialog
    isDetailOpen,
    selectedRequest,
    openRequestDetail,
    closeRequestDetail,
    handleUpdateStatus,
    getHistory,
    
    // Review Dialog
    isReviewDetailOpen,
    selectedReview,
    openReviewDetail,
    closeReviewDetail,
    handleUpdateReviewStatus,
    getReviewHistory
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
