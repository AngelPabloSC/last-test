import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { useSnackbar } from '@/context/SnackbarContext';
import { API_CODES } from '@/constants/apiConstants';

export function useReviewForm() {
  const { getFechData } = useFetchDataPromise();
  const [status, setStatus] = useState('idle');
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
      service: '',
      rating: 0,
      review: '',
      consent: false,
    },
  });

  const onSubmit = async (data) => {
    setStatus('loading');

    const payload = {
      fullName: data.fullName,
      email: data.email,
      location: data.location,
      service: data.service,
      rating: data.rating,
      review: data.review,
      consent: data.consent,
    };

    const response = await getFechData({
      endPoint: 'reviews',
      method: 'post',
      additionalData: payload,
    });

    if (response?.code !== API_CODES.ERR) {
      setStatus('idle');
      showSnackbar(
        response?.message || 'Algo falló al comunicarse con el servidor.',
        'error'
      );

    } else {
      setStatus('success');
      reset();
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
    // dialog shortcuts
    dialogSuccess: status === 'success',
  };
}
