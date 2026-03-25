import { TextField, MenuItem } from '@mui/material';

/**
 * A reusable, react-hook-form compatible Select component using Material UI.
 * @param {string} name Form field name
 * @param {Object} register The register function from react-hook-form
 * @param {Object} rules Validation rules
 * @param {Object} error Error object from react-hook-form (if any)
 * @param {Array} options Array of strings or objects {label, value}
 * @param {string} placeholder The default disabled option
 * @param {Object} sx Custom styles
 */
export default function CustomSelect({
  name,
  register,
  rules,
  error,
  options = [],
  placeholder = 'Select an option...',
  sx,
  ...props
}) {
  return (
    <TextField
      select
      fullWidth
      error={!!error}
      helperText={error?.message}
      defaultValue=""
      slotProps={{ select: { displayEmpty: true } }}
      sx={sx}
      {...(register ? register(name, rules) : {})}
      {...props}
    >
      <MenuItem value="" disabled sx={{ fontSize: 14 }}>
        {placeholder}
      </MenuItem>
      {options.map((opt) => {
        const value = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <MenuItem key={value} value={value} sx={{ fontSize: 14 }}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
