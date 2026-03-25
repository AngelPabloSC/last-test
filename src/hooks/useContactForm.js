import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { API_CODES } from '@/constants/apiConstants';

export function useContactForm() {
  const { getFechData } = useFetchDataPromise();

  const [status,   setStatus]   = useState('idle');  // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      name:    data.fullName,
      email:   data.email,
      phone:   data.phone,
      address: data.address,
      city:    data.city,
      project: data.project,
    };

    const response = await getFechData({
      endPoint:       'contacts',
      method:         'post',
      additionalData: payload,
    });

    if (response?.code !== API_CODES.ERR) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
      setErrorMsg(
        response?.message || 'Something went wrong. Please try again.',
      );
    }
  };

  const resetStatus = () => setStatus('idle');

  return {
    // react-hook-form
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    // API state
    status,
    errorMsg,
    resetStatus,
    // dialog shortcuts
    dialogSuccess: status === 'success',
    dialogError:   status === 'error',
  };
}
