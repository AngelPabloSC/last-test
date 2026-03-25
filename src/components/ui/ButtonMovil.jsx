import { Box, Link, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function ButtonMovil() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        position: "fixed",
        top: { xs: "160px", sm: "160px" },
        left: 0,
        right: 0,
        px: 2,
        py: 1,
        bgcolor: theme.palette.background.dark,
        borderBottom: `1px solid ${theme.palette.primary.main}66`,
        zIndex: 10,
        alignItems: "center",
      }}
    >
      <Link
        href="/About/Contact-us"
        sx={{
          color: theme.palette.primary.main,
          px: 2, py: 1,
          display: "flex", alignItems: "center", gap: 1,
          justifyContent: "center",
          width: "100%", height: 48,
          textDecoration: "none",
          fontWeight: 700, fontSize: "0.95rem",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <AssignmentTurnedInIcon sx={{ fontSize: 20 }} />
        Get Inspection
      </Link>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: theme.palette.primary.main, opacity: 0.4, height: 32, alignSelf: "center" }}
      />

      <Link
        href="tel:+15185985156"
        sx={{
          color: theme.palette.primary.main,
          px: 2, py: 1,
          display: "flex", alignItems: "center", gap: 1,
          justifyContent: "center",
          width: "100%", height: 48,
          textDecoration: "none",
          fontWeight: 700, fontSize: "0.95rem",
          "&:hover": { opacity: 0.8 },
        }}
      >
        <PhoneIcon sx={{ fontSize: 20 }} />
        Call
      </Link>
    </Box>
  );
}
