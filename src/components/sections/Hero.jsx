import { useState, useEffect } from "react";
import { Box, Typography, Link, Button, Dialog, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "@/components/forms/ContactForm";
import ReviewStarRating from "@/components/ui/ReviewStarRating";


const images = [
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240109-WA0156_pmbfsw.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240313-WA0043_knl337.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1920/v1746726907/IMG-20240109-WA0138_y93nsn.jpg",
];

export default function Hero({ averageRating = "4.5" }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const [bgIndex, setBgIndex] = useState(0);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

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
            sx={{ color: gold, fontStyle: "italic", mb: 1, fontSize: { xs: "2rem", md: "4rem" } }}
          >
           The Capital Region’s Newest Name in Home Excellence Built on a Decade of Mastery
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)",
              mb: 2,
              fontSize: { xs: "1rem", md: "1.5rem" },
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: "bold",
              
            }}
          >
            Roof - Siding- Interior and more...

          </Typography>

          <Typography
            variant="h5"
            sx={{ color: "white", fontStyle: "italic", fontWeight: "bold", mb: 2 }}
          >
            One Call Does it All!
          </Typography>

          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <ReviewStarRating rating={Number(averageRating)} size={20} color={gold} />
            <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem" }}>
              <strong style={{ color: gold }}>{averageRating}</strong> · Reviews
            </Typography>
          </Box> */}

          <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setQuoteDialogOpen(true)}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: '4px',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
                  Reserve your free estimate!
            </Button>
      
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
           CALL US NOW
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { md: "0 0 420px" },
            width: { xs: "100%", md: 420 },
            display: { xs: "none", md: "block" },
          }}
        >
         
        </Box>
      </Box>

      <Dialog
        open={quoteDialogOpen}
        onClose={() => setQuoteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#111111',
            borderRadius: 2,
            p: { xs: 2, md: 4 },
            m: 2,
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setQuoteDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: -16,
              top: -16,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <ContactForm />
        </Box>
      </Dialog>
    </Box>
  );
}
