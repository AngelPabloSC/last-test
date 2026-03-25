import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShieldIcon from "@mui/icons-material/Shield";

const stats = [
  { icon: HomeRepairServiceIcon, value: "500+",  label: "Projects Completed" },
  { icon: StarIcon,              value: "5+",    label: "Years of Excellence" },
  { icon: VerifiedIcon,          value: "4.8/5", label: "Average Rating" },
  { icon: ShieldIcon,            value: "100%",  label: "Satisfaction Rate" },
];

export default function StatsBar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.dark,
        py: { xs: 4, md: 5 },
        px: { xs: 3, md: "8%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: { xs: 3, md: 2 },
        }}
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              flex: "1 1 130px",
              bgcolor: "#111111",
              borderRadius: 2,
              px: 3,
              py: 2.5,
              border: `1px solid #1F1F1F`,
              borderTop: `3px solid ${theme.palette.primary.main}`,
            }}
          >
            <Icon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 800,
                fontSize: { xs: "1.6rem", md: "2rem" },
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.78rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
