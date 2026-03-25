import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ShieldIcon from "@mui/icons-material/Shield";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SplitSection from "@/components/sections/SplitSection";

const trustBadges = [
  { icon: ShieldIcon,  label: "BBB Accredited" },
  { icon: BadgeIcon,   label: "Licensed & Insured" },
  { icon: GroupsIcon,  label: "Family Owned" },
];

const IMAGES = [
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_1200/v1746981693/PHOTO-2025-05-11-11-40-19_atlhtq.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1744252247/banner1_akffxu.jpg",
  "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_600/v1746726327/IMG-20250505-WA0045_uslnfr.jpg",
];

export default function AboutNovaSection({ imagePos = -1 }) {
  const theme = useTheme();

  const imageGrid = (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={IMAGES[0]}
        alt="Nova Solutions team"
        loading="lazy"
        sx={{
          width: "100%",
          height: { sm: 220, md: 320 },
          objectFit: "cover",
          borderRadius: 3,
          border: "1px solid #2A2A2A",
        }}
      />
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
        {IMAGES.slice(1).map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`Nova project ${i + 2}`}
            loading="lazy"
            sx={{ flex: 1, height: 150, objectFit: "cover", borderRadius: 2 }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <SplitSection
      imagePos={imagePos}
      imageNode={imageGrid}
      eyebrow="WHO WE ARE"
      title={
        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 800,
            lineHeight: 1.15,
            fontSize: { xs: "1.8rem", md: "2.6rem" },
            mb: 3,
          }}
        >
          Built on Trust,{" "}
          <Box component="span" sx={{ display: "block" }}>
            Driven by Excellence
          </Box>
        </Typography>
      }
      body={
        <>
          Nova Solutions is a family-owned home improvement company serving the Capital
          Region of New York. We specialize in roofing, siding, and gutter systems —
          delivering premium craftsmanship on every project.
          <br /><br />
          We are fully licensed, insured, and BBB accredited. Our team works directly
          with your insurance company to handle storm damage claims, making the process
          stress-free from start to finish.
        </>
      }
    >
      {/* Trust Badges */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4 }}>
        {trustBadges.map(({ icon: Icon, label }) => (
          <Box
            key={label}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: `${theme.palette.primary.main}15`,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "20px",
              px: 2,
              py: 1,
            }}
          >
            <Icon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
            <Typography sx={{ color: theme.palette.primary.main, fontSize: 14, fontWeight: 700 }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* CTAs */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Button
          component={Link}
          to="/About/Contact-us"
          variant="contained"
          startIcon={<PhoneIcon />}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "#111111",
            fontWeight: 800,
            fontSize: "0.95rem",
            borderRadius: "20px",
            px: 3.5,
            py: 1.5,
            boxShadow: "none",
            "&:hover": { bgcolor: theme.palette.primary.dark, color: "#111111", boxShadow: "none" },
          }}
        >
          Get Free Inspection
        </Button>
        <Box
          component={Link}
          to="/About"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: 500,
            "&:hover": { color: theme.palette.primary.main },
            transition: "color 0.2s",
          }}
        >
          Our Story
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </SplitSection>
  );
}
