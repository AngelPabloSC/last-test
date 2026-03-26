import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchDataPromise } from '@/hooks/useFetchDataPromise';
import { useLoginContext } from '@/context/LoginContext';
import { API_CODES } from '@/constants/apiConstants';

const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

export const useLogin = () => {
  const { getFechData } = useFetchDataPromise();
  const { login }       = useLoginContext();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    setErrorMsg('');
    try {
      const response = await getFechData({
        endPoint:       'admin/login',
        method:         'POST',
        additionalData: { 
          username: data.email, 
          password: data.password,
          deviceId: getDeviceId()
        },
      });

      if (response?.code !== API_CODES.OK) {
        setErrorMsg(
          response?.message || 'Invalid email or password. Please try again.',
        );
        return;
      }

      login(response.data);

    } catch {
      setErrorMsg('Could not connect to the server. Please try again later.');
    }
  };

  return {
 
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
   
    showPassword,
    handleClickShowPassword,
   
    errorMsg,
  };
};
