// ─── AdminLogin.jsx ───────────────────────────────────────────────────────────
// Responsabilidad única: orquestar la página de login.
// Obtiene el estado del hook useLogin y lo distribuye a los paneles.

import { Box } from '@mui/material';
import { useLogin } from '@/hooks/useLogin';
import LoginBrandingPanel from '@/pages/admin/components/LoginBrandingPanel';
import LoginForm          from '@/pages/admin/components/LoginForm';

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    showPassword,
    handleClickShowPassword,
    errorMsg,
  } = useLogin();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: '#0A0A0A',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <LoginBrandingPanel />

      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        showPassword={showPassword}
        onTogglePassword={handleClickShowPassword}
        errorMsg={errorMsg}
      />
    </Box>
  );
}
