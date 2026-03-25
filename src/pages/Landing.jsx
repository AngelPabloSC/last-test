import { Box, Typography, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import StepsAccordion from "@/components/sections/StepsAccordion";
import OneCallSection from "@/components/sections/OneCallSection";
import AboutNovaSection from "@/components/sections/AboutNovaSection";
import CtaSection from "@/components/sections/CtaSection";
import SuppliersSwiper from "@/components/media/SuppliersSwiper";
import SplitSection from "@/components/sections/SplitSection";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";

const gallery = [
  {
    title: "Roofing",
    desc: "Recent roofing projects in Capital Region.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1744252247/banner1_akffxu.jpg",
  },
  {
    title: "Siding",
    desc: "Durable vinyl & fiber cement siding.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1744406636/banner2_pilov2.jpg",
  },
  {
    title: "Gutters",
    desc: "Clean gutter finishes & gutter guards.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1746726327/IMG-20250505-WA0045_uslnfr.jpg",
  },
  {
    title: "Restoration",
    desc: "Fire & water damage restoration.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1746726355/IMG-20250508-WA0026_vlclqo.jpg",
  },
  {
    title: "Commercial",
    desc: "Commercial roofing & siding projects.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1746726907/IMG-20240109-WA0156_pmbfsw.jpg",
  },
  {
    title: "Completed Projects",
    desc: "500+ satisfied homeowners.",
    img: "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1746726907/IMG-20240313-WA0043_knl337.jpg",
  },
];

export default function Landing() {
  const theme = useTheme();

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: theme.palette.background.dark,
          color: "white",
          py: "10px",
          px: 2,
        }}
      >
        <Box
          component="ul"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 2, md: 8 },
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {["Trusted Experts", "Reliable Installations", "Local Remodelers"].map((text) => (
            <Box
              component="li"
              key={text}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: { xs: "0.75rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: { xs: "1rem", md: "1.3rem" },
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  flexShrink: 0,
                }}
              >
                ✓
              </Box>
              {text}
            </Box>
          ))}
        </Box>
      </Box>

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Services */}
      <ServicesSection />

      {/* 5. Disaster / Emergency section — image LEFT (imagePos={-1}) */}
      <SplitSection
        imagePos={1}
        imageSrc="https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_800/v1746728328/7C58B497-D953-4A42-9328-A532C4FF5DAB_iwmtiv.png"
        imageAlt="Restoration team"
        eyebrow="Emergency Services"
        title={
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 800,
              fontStyle: "italic",
              mb: 2,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
            }}
          >
            When Disaster Strikes,{" "}
            <Box component="span" sx={{ color: theme.palette.text.primary }}>
              Call Nova Solutions
            </Box>
          </Typography>
        }
        subtitle="Trusted Experts in Capital Region"
        body="Emergencies can strike anytime, leaving your property in disarray. Nova Solutions specializes in flood restoration and water damage restoration in Capital Region, ensuring quick help when disaster hits.We handle mitigation and fire restoration, and more to restore your space swiftly. Our experts prioritize safety, efficiency, and quality, so you can regain peace of mind. Turn to Nova Solutions for a fast, reliable recovery that brings your property back to its best."
      >
        {/* Fire / Water damage tiles */}
        <Grid container spacing={2} maxWidth={400}>
          {[
            { icon: <LocalFireDepartmentIcon />, label: "Fire Damage" },
            { icon: <WaterIcon />, label: "Water Damage" },
          ].map(({ icon, label }) => (
            <Grid size={6} key={label}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: `${theme.palette.primary.main}15`,
                  border: `1px solid ${theme.palette.primary.main}33`,
                  px: 3,
                  py: 2,
                  borderRadius: 3,
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.background.dark,
                  },
                }}
              >
                {icon}
                <Typography fontWeight="bold" mt={0.5}>
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </SplitSection>

      <AboutNovaSection />


      <StepsAccordion />


      <OneCallSection />

      <Box
        sx={{
          bgcolor: theme.palette.background.dark,
          py: { xs: 7, md: 10 },
          px: { xs: 3, md: "7%" },
        }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Our Work
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 800,
              fontSize: { xs: "1.8rem", md: "2.4rem" },
            }}
          >
            Recent Projects
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, mt: 1 }}>
            Quality craftsmanship across Capital Region NY
          </Typography>
        </Box>

        <Grid container spacing={2.5} maxWidth={1200} mx="auto">
          {gallery.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                  height: 240,
                  "&:hover .gallery-img": { transform: "scale(1.08)" },
                  "&:hover .gallery-overlay": { opacity: 1 },
                }}
              >
                <Box
                  className="gallery-img"
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                  }}
                />
                <Box
                  className="gallery-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: `${theme.palette.primary.main}22`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2.5,
                    color: "white",
                  }}
                >
                  <Typography fontWeight={700} fontSize="1rem">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, fontSize: "0.82rem" }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Gallery CTA */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            mt: 5,
            flexWrap: "wrap",
          }}
        >
          <Button
            component={RouterLink}
            to="/Gallery"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "#111111",
              fontWeight: 800,
              fontSize: "0.95rem",
              borderRadius: "14px",
              px: 4,
              py: 1.5,
              boxShadow: "none",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
                color: "#111111",
                boxShadow: "none",
              },
            }}
          >
            View All Projects
          </Button>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            500+ Projects Completed
          </Typography>
        </Box>
      </Box>

      {/* 10. CTA */}
      <CtaSection />

      {/* 11. Suppliers */}
      <SuppliersSwiper />
    </Box>
  );
}
