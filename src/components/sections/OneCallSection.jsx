import { Box, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { oneCallData } from "@/data/oneCallData.js";

export default function OneCallSection() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#000000", // Deepest black
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow to create depth */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "120%",
          background: "radial-gradient(circle, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: gold,
              fontWeight: 900,
              fontSize: { xs: "2rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}
          >
            {oneCallData.title}
          </Typography>
          <Box sx={{ mt: 1.5, mx: "auto", width: 60, height: 4, bgcolor: gold, borderRadius: 2 }} />
          <Typography 
            variant="h5" 
            sx={{ 
              color: "rgba(255,255,255,0.6)",
              mt: 3,
              fontSize: { xs: "0.9rem", md: "1.25rem" },
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {oneCallData.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 4, sm: 6 },
          }}
        >
          {oneCallData.services.map((item, i) => {
            const IconComponent = item.Icon;
            return (
              <Box
                key={i}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                  borderRadius: "20px",
                  bgcolor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                    transform: "translateY(-8px)",
                    borderColor: alpha(gold, 0.3),
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${alpha(gold, 0.1)}`,
                    "& .icon-container": {
                      transform: "scale(1.1)",
                      color: "#FFFFFF",
                      bgcolor: gold,
                    },
                    "& .service-title": {
                      color: gold,
                    }
                  },
                }}
              >
                <Box 
                  className="icon-container"
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "16px",
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: gold,
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                >
                  <IconComponent sx={{ fontSize: "2.5rem" }} />
                </Box>
                
                <Typography
                  variant="h6"
                  className="service-title"
                  sx={{ 
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{ 
                    color: "rgba(255,255,255,0.5)",
                    textAlign: "center",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
