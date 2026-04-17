import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Card({ title, paragraph, buttonText, url, imageUrl }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;

  return (
    <Box
      sx={{
        position: "relative",
        width: 300,
        overflow: "hidden",
        borderRadius: "24px 0 24px 0",
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.03)" },
        "&:hover .top-bar, &:hover .bottom-bar": { opacity: 0 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(13,14,15,0.8)" }} />

      <Box className="top-bar" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: 6, bgcolor: gold, zIndex: 10, transition: "opacity 0.3s" }} />
      <Box className="bottom-bar" sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 6, bgcolor: gold, zIndex: 10, transition: "opacity 0.3s" }} />

      <Box sx={{ position: "relative", zIndex: 10, p: 3, display: "flex", flexDirection: "column", minHeight: 300, color: "white" }}>
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>{title}</Typography>
          <Box sx={{ width: 48, height: 2, bgcolor: "white", mx: "auto", mb: 2 }} />
          <Typography variant="body2" lineHeight={1.6}>{paragraph}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", mt: "auto" }}>
          <Button
            href={url}
            variant="contained"
            sx={{ bgcolor: gold, color: darkText, fontWeight: "bold", mt: 2, "&:hover": { bgcolor: theme.palette.primary.dark } }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
