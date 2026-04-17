import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { useSnackbar } from '@/context/SnackbarContext';
import { API_CODES } from '@/constants/apiConstants';

export function useReviewForm() {
  const { getFechData } = useFetchDataPromise();
  const [status, setStatus] = useState('idle');
  const [serviceTypes, setServiceTypes] = useState([]);
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      location: '',
      serviceTypeId: '',
      rating: 0,
      review: '',
      consent: false,
    },
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

  const onSubmit = async (data) => {
    setStatus('loading');

    const payload = {
      fullName:      data.fullName,
      email:         data.email,
      location:      data.location,
      serviceTypeId: Number(data.serviceTypeId),
      rating:        Number(data.rating),
      review:        data.review,
    };

    try {
      const response = await getFechData({
        endPoint: 'reviews',
        method: 'POST',
        additionalData: payload,
      });

      if (response?.code === API_CODES.OK) {
        setStatus('success');
        reset();
      } else {
        setStatus('idle');
        showSnackbar(
          response?.message || 'Error submitting review.',
          'error'
        );
      }
    } catch (error) {
      setStatus('idle');
      showSnackbar('Connection error.', 'error');
    }
  };

  const resetStatus = () => setStatus('idle');

  return {
    // react-hook-form
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    watch,
    reset,
    onSubmit,
    // API state
    status,
    resetStatus,
    serviceTypes,
    // dialog shortcuts
    dialogSuccess: status === 'success',
  };
}
