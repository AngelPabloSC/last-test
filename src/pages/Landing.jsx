import { lazy, Suspense } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
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
import SplitSection from "@/components/sections/SplitSection";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";
import PublicProjectCard from '@/components/cards/PublicProjectCard';
import { useLandingProjects, useAnimatedCounter } from '@/hooks/useLandingProjects';
import { usePublicReviews } from '@/hooks/usePublicReviews';
import SEO from '@/components/ui/SEO';

const SuppliersSwiper = lazy(() => import('@/components/media/SuppliersSwiper'));

export default function Landing() {
  const theme = useTheme();

  // Fetch landing projects
  const { recentProjects, totalProjects, isLoading } = useLandingProjects(6);
  
  // Fetch public reviews summary for dynamic stats
  const { summary } = usePublicReviews({ limit: 1, fetchServices: false });
  
  // Custom Hook for the counter animation (triggers on scroll)
  const { count: animatedTotal, ref: counterRef } = useAnimatedCounter(totalProjects, 2500);

  return (
    <Box sx={{ overflowX: "hidden", width: "100%" }}>
      <SEO 
        title="Nova Solutions Restoration | #1 Roofing & Siding in Albany & Capital Region"
        description="Trusted roofing, siding, and gutter experts in Albany and the Capital Region. Over 5 years of certified excellence, affordable prices, and durable home exterior solutions. Request a free estimate!"
        keywords="roofing Albany, siding Capital Region, roof repair NY, gutters installation, Nova Solutions Restoration, exterior home improvement"
      />
      <Hero averageRating={summary.average || "4.8"} />
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

      <StatsBar 
        totalProjects={totalProjects} 
        averageRating={summary.average || "4.8"} 
        ratingCount={summary.count || "500+"} 
      />

      <ServicesSection />

      <SplitSection
        imagePos={1}
        imageSrc="https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_800/v1746728328/7C58B497-D953-4A42-9328-A532C4FF5DAB_iwmtiv.png"
        imageAlt="Restoration team"
        eyebrow={<span style={{ fontSize: "1rem", letterSpacing: "5px" }}>Emergency Services</span>}
        title={
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 800,
              fontStyle: "italic",
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

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        ) : (
          <Grid container spacing={2.5} maxWidth={1200} mx="auto">
            {recentProjects.map((p) => {
              const coverImg = p.images?.find(img => img.order === 1)?.url || p.images?.[0]?.url || 'https://images.unsplash.com/photo-1577493322601-3ae1f35c7505?w=800&q=80';
              const cardProps = {
                id: p.id,
                name: p.title || 'Untitled Project',
                category: p.serviceType?.name || 'General',
                img: coverImg,
                shortDesc: p.about || ''
              };

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
                  <PublicProjectCard {...cardProps} height={{ xs: 260, md: 300 }} />
                </Grid>
              );
            })}
            {recentProjects.length === 0 && (
               <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
                  <Typography sx={{ color: 'text.secondary' }}>No recent projects found.</Typography>
               </Box>
            )}
          </Grid>
        )}

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
            ref={counterRef}
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {totalProjects > 0 ? `${animatedTotal}+ Projects Completed` : 'Projects Completed'}
          </Typography>
        </Box>
      </Box>

      {/* 10. CTA */}
      <CtaSection />

      {/* 11. Suppliers — lazy: Swiper no pertenece a la ruta crítica */}
      <Suspense fallback={null}>
        <SuppliersSwiper />
      </Suspense>
    </Box>
  );
}
