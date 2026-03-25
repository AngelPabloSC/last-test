import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { oneCallData } from "@/data/oneCallData.js";

export default function OneCallSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.contrastText,
        py: 10,
        px: { xs: 3, md: 6 },
      }}
    >
   
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
          {oneCallData.title}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: theme.palette.background.paper, mt: 2 }}>
          {oneCallData.subtitle}
        </Typography>
      </Box>

      {/* Cards — 1 col xs, 3 cols sm+ (matches Astro sm:grid-cols-3) */}
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
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
              gap: 1,
              color: theme.palette.primary.main,
            }}
          >
            <Box sx={{ color: theme.palette.primary.main, display: "flex", justifyContent: "center" }}>
              <IconComponent sx={{ fontSize: "2.8rem" }} />
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: theme.palette.background.paper, textTransform: "uppercase" }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: `${theme.palette.background.paper}CC`, textAlign: "justify" }}
            >
              {item.text}
            </Typography>
          </Box>
          );
        })}

      </Box>
    </Box>
  );
}
