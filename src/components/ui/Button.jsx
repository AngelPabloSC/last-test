import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Button({ href, variant = "primary", size = "md", disabled = false, children, type = "button", target }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;

  const variants = {
    primary: { bgcolor: gold, color: darkText, "&:hover": { bgcolor: theme.palette.primary.dark } },
    secondary: { bgcolor: "#1a1a2e", color: "white", "&:hover": { bgcolor: "#2a2a4e" } },
    ghostLight: { border: "2px solid white", color: "white", "&:hover": { border: "2px solid black" } },
    ghostDark: { border: "2px solid #333", color: "#333", "&:hover": { border: "2px solid black" } },
  };

  const sizes = {
    sm: { px: 2, py: 0.5, fontSize: "0.75rem" },
    md: { px: 2, py: 1, fontSize: "0.875rem" },
    lg: { px: 4, py: 1.25, fontSize: "1rem" },
  };

  return (
    <MuiButton
      href={href}
      type={!href ? type : undefined}
      disabled={disabled}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
        fontWeight: 500,
        textTransform: "none",
        transition: "all 0.3s",
        ...variants[variant],
        ...sizes[size],
      }}
    >
      {children}
    </MuiButton>
  );
}
