import { TextField } from '@mui/material';

/**
 * A reusable, react-hook-form compatible TextField component using Material UI.
 * @param {string} name Form field name
 * @param {Object} register The register function from react-hook-form
 * @param {Object} rules Validation rules
 * @param {Object} error Error object from react-hook-form (if any)
 * @param {Object} sx Custom styles
 */
export default function CustomTextField({
  name,
  register,
  rules,
  error,
  sx,
  ...props
}) {
  return (
    <TextField
      error={!!error}
      helperText={error?.message}
      sx={sx}
      {...(register && name ? register(name, rules) : {})}
      {...props}
    />
  );
}
