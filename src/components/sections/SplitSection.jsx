import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SplitSection({
  imagePos = 1,
  imageSrc,
  imageAlt = "section image",
  imageNode,
  eyebrow,
  title,
  subtitle,
  body,
  children,
  bgcolor,
  py = { xs: 8, md: 10 },
  px = { xs: 4, md: "8%" },
}) {
  const theme = useTheme();

  const imageLeft = imagePos === -1;

  const textBlock = (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {eyebrow && (
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
          {eyebrow}
        </Typography>
      )}

      {title && (
        <Box
          sx={(typeof title === "string"
            ? {
                color: theme.palette.text.primary,
                fontWeight: 800,
                fontStyle: "italic",
                mb: 2,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
              }
            : {})}
        >
          {typeof title === "string" ? (
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 800,
                fontStyle: "italic",
                mb: 2,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
              }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
      )}

      {subtitle && (
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, mb: 2 }}
        >
          {subtitle}
        </Typography>
      )}

      {body && (
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            mb: 3,
            lineHeight: 1.7,
          }}
        >
          {body}
        </Typography>
      )}

      {children}
    </Box>
  );

  const imageBlock = imageNode ? (
    <Box sx={{ flex: 1 }}>{imageNode}</Box>
  ) : imageSrc ? (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <Box
        component="img"
        src={imageSrc}
        alt={imageAlt}
        sx={{
          borderRadius: 6,
          width: { xs: "90%", md: "80%" },
          objectFit: "cover",
          boxShadow: 4,
        }}
      />
    </Box>
  ) : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: bgcolor ?? theme.palette.background.dark,
        px,
        py,
        gap: 5,
      }}
    >
      {imageLeft ? imageBlock : textBlock}
      {imageLeft ? textBlock : imageBlock}
    </Box>
  );
}
