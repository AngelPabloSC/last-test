import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { suppliers } from "@/data/suppliersData";
import "swiper/css";

export default function SuppliersSwiper() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.dark,
        textAlign: "center",
        px: { xs: 2, md: 5 },
        py: { xs: 6, md: 8 },
        borderTop: `1px solid rgba(255,255,255,0.07)`,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          color: "white",
          fontWeight: 600,
          fontSize: { xs: "1rem", md: "1.1rem" },
          mb: 1.5,
        }}
      >
        We use only top-quality products from leading suppliers
      </Typography>

      {/* Yellow underline accent */}
      <Box
        sx={{
          width: 44,
          height: 3,
          bgcolor: theme.palette.primary.main,
          mx: "auto",
          mb: { xs: 4, md: 6 },
          borderRadius: 2,
        }}
      />

      {/* Swiper */}
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{
          0:    { slidesPerView: 2.5, spaceBetween: 20, centeredSlides: false },
          480:  { slidesPerView: 3,   spaceBetween: 24, centeredSlides: false },
          768:  { slidesPerView: 4,   spaceBetween: 32, centeredSlides: true  },
          1024: { slidesPerView: 4,   spaceBetween: 40, centeredSlides: true  },
          1280: { slidesPerView: 4,   spaceBetween: 80, centeredSlides: true  },
        }}
        style={{ width: "100%" }}
      >
        {[...suppliers, ...suppliers].map((item, i) => (
          <SwiperSlide
            key={i}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Box
              component="img"
              src={item.imgUrl}
              alt={item.alt}
              sx={{
                height: { xs: 52, sm: 64, md: 80 },
                width: "100%",
                maxWidth: { xs: 110, sm: 140, md: 180 },
                objectFit: "contain",
                mx: "auto",
                display: "block",
                filter: "none",
                opacity: 0.6,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 1 },
              }}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
