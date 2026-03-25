import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CtaSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: "8%" },
        backgroundImage:
          "url('https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240109-WA0138_y93nsn.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(60,20,40,0.65)" }} />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "rgba(15,10,10,0.88)",
          border: `1px solid rgba(255,255,255,0.1)`,
          borderRadius: 4,
          py: { xs: 5, md: 7 },
          px: { xs: 4, md: 8 },
          textAlign: "center",
          maxWidth: 760,
          width: "100%",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Ready to Start?
        </Typography>

        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2.5,
          }}
        >
          Transform Your Home Today
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: 520,
            mx: "auto",
            mb: 5,
            lineHeight: 1.7,
          }}
        >
          Join hundreds of satisfied homeowners across the Capital Region. Get
          your free inspection and no-obligation estimate today.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Call — yellow filled */}
          <Button
            component="a"
            href="tel:+15185985156"
            variant="contained"
            startIcon={<PhoneIcon />}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.background.dark,
              fontWeight: 800,
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: 6,
              textTransform: "none",
              "&:hover": { bgcolor: theme.palette.primary.dark },
            }}
          >
            +1 518-598-5156
          </Button>

          {/* Inspection — outlined white */}
          <Button
            component={RouterLink}
            to="/About/Contact-us"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.45)",
              fontWeight: 700,
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: 6,
              textTransform: "none",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                bgcolor: "transparent",
              },
            }}
          >
            Get Free Inspection
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
