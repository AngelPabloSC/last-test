import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RoofingIcon from "@mui/icons-material/Roofing";
import ConstructionIcon from "@mui/icons-material/Construction";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const services = [
  {
    badge: "Roofing",
    BadgeIcon: RoofingIcon,
    title: "Roof Replacement & Repair",
    description:
      "Full roof replacements, storm damage repairs, and inspections. We work with all major insurance companies to make the process seamless.",
    url: "/Roofing",
    imageUrl:
      "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_800/v1744252247/banner1_akffxu.jpg",
  },
  {
    badge: "Siding",
    BadgeIcon: ConstructionIcon,
    title: "Siding Installation",
    description:
      "Transform your home's curb appeal with vinyl, fiber cement, or wood siding. Durable, beautiful, and energy-efficient solutions for every budget.",
    url: "/Siding",
    imageUrl:
      "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_800/v1744406636/banner2_pilov2.jpg",
  },
  {
    badge: "Gutters",
    BadgeIcon: WaterDropIcon,
    title: "Gutter Installation & Gutter Cap",
    description:
      "Protect your home from water damage with seamless gutters and our Gutter Cap system. Say goodbye to clogged gutters — guaranteed.",
    url: "/Gutters",
    imageUrl:
      "https://res.cloudinary.com/driyxelzh/image/upload/f_auto,q_auto,c_scale,w_800/v1746726327/IMG-20250505-WA0045_uslnfr.jpg",
  },
];

export default function ServicesSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.dark,
        py: { xs: 7, md: 10 },
        px: { xs: 3, md: "7%" },
      }}
    >
      {/* Header */}
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
          What We Do
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 800,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            mb: 1.5,
          }}
        >
          Expert Services for Your Home
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            maxWidth: 560,
            mx: "auto",
            lineHeight: 1.7,
            mb: 2,
          }}
        >
          From roof replacements to siding and gutters — we handle every project
          with precision, care, and a commitment to lasting results.
        </Typography>

        {/* Yellow underline accent */}
        <Box
          sx={{
            width: 50,
            height: 3,
            bgcolor: theme.palette.primary.main,
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {services.map(({ badge, BadgeIcon, title, description, url, imageUrl }) => (
          <Box
            key={title}
            sx={{
              flex: 1,
              maxWidth: { md: 380 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "rgba(255,255,255,0.06)",
              border: `1px solid rgba(255,255,255,0.1)`,
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.25s, box-shadow 0.25s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 20px 48px rgba(0,0,0,0.5)`,
              },
            }}
          >
            {/* Image */}
            <Box sx={{ height: 200, overflow: "hidden", position: "relative" }}>
              <Box
                component="img"
                src={imageUrl}
                alt={title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s",
                  "&:hover": { transform: "scale(1.06)" },
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1, gap: 1.5 }}>
              {/* Category badge */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.background.dark,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 5,
                  width: "fit-content",
                }}
              >
                <BadgeIcon sx={{ fontSize: 14 }} />
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>
                  {badge}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  flexGrow: 1,
                }}
              >
                {description}
              </Typography>

              {/* Button */}
              <Button
                component={RouterLink}
                to={url}
                endIcon={<ArrowForwardIcon fontSize="small" />}
                sx={{
                  alignSelf: "flex-start",
                  mt: 0.5,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.background.dark,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  borderRadius: 5,
                  px: 2.5,
                  py: 0.7,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    color: "white",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
