import { useState, useEffect } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactForm from "@/components/forms/ContactForm";

const images = [
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240109-WA0156_pmbfsw.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240313-WA0043_knl337.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240109-WA0138_y93nsn.jpg",
];

export default function Hero() {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "70vh" },
        backgroundImage: `url('${images[bgIndex]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top right, black, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: 6 },
          px: { xs: 3, md: "5%" },
          py: { xs: 5, md: 8 },
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h2"
            sx={{ color: gold, fontStyle: "italic", mb: 1, fontSize: { xs: "2rem", md: "3.5rem" } }}
          >
            One Team. One Vision. Your Dream.
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              mb: 2,
              fontSize: { xs: "1rem", md: "1.25rem" },
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Commercial and Residential
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: "white", fontStyle: "italic", fontWeight: "bold", textDecoration: "underline", mb: 2 }}
          >
            One Call Does it All!
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", mb: 3 }}>
            ⭐⭐⭐⭐⭐ <strong style={{ color: gold }}>4.5</strong> · Reviews
          </Typography>

          <Link
            href="tel:+15185985156"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 1.5,
              bgcolor: "#000",
              color: gold,
              border: `2px solid ${gold}`,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textDecoration: "none",
              "&:hover": { bgcolor: "#111" },
            }}
          >
            <PhoneIcon /> +1 518-598-5156
          </Link>
        </Box>

        <Box
          sx={{
            flex: { md: "0 0 420px" },
            width: { xs: "100%", md: 420 },
            display: { xs: "none", md: "block" },
          }}
        >
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
}
