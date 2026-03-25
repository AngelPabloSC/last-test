import { Dialog, DialogContent, Box, Typography, Button, Zoom } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";

const GREEN = "#22C55E";

const SPARKLES = [
  { top: 28, left: 52, size: 16, delay: 0 },
  { top: 44, right: 68, size: 12, delay: 0.4 },
  { top: 130, left: 88, size: 9, delay: 0.8 },
  { top: 118, right: 56, size: 14, delay: 1.2 },
];

export default function ReviewSuccessDialog({ open, onClose }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const dark = "#111111";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ transition: Zoom }}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: dark,
            borderRadius: "24px",
            border: `1px solid ${gold}44`,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
          },
        },
        transition: { timeout: 350 },
        backdrop: {
          sx: {
            bgcolor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      <Box
        sx={{
          height: 180,
          background: "linear-gradient(180deg, #1E1800 0%, #111111 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {SPARKLES.map((s, i) => (
          <SparklesIcon
            key={i}
            sx={{
              position: "absolute",
              top: s.top,
              left: s.left ?? "auto",
              right: s.right ?? "auto",
              fontSize: s.size,
              color: `rgba(255,215,0,0.35)`,
              animation: `pulse-success ${1.8 + s.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}

        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: `${gold}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: `0 0 60px 8px rgba(255,215,0,0.22), 0 12px 32px rgba(255,215,0,0.18)`,
            mb: 2,
          }}
        >
          <StarIcon sx={{ fontSize: 48, color: gold }} />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: -4,
              width: 30,
              height: 30,
              borderRadius: "50%",
              bgcolor: GREEN,
              border: `3px solid ${dark}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 16, color: "#fff" }} />
          </Box>
        </Box>
      </Box>

      <DialogContent
        sx={{
          px: { xs: 3, sm: 4 },
          pt: 2,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: "1.8rem",
            letterSpacing: "-0.5px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Thank You for Your Review!
        </Typography>

        <Typography
          sx={{
            color: "#999",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: 340,
            mb: 1,
          }}
        >
          Your feedback has been successfully submitted and will be reviewed
          before being published. We greatly appreciate it!
        </Typography>

        <Box sx={{ width: 48, height: 3, borderRadius: 2, bgcolor: gold }} />

        <Button
          fullWidth
          onClick={onClose}
          sx={{
            mt: 2,
            bgcolor: gold,
            color: dark,
            fontWeight: 800,
            fontSize: "0.95rem",
            borderRadius: "16px",
            py: 1.6,
            textTransform: "none",
            letterSpacing: 0.2,
            "&:hover": { bgcolor: "#E6C200" },
          }}
        >
          Leave another review
        </Button>
      </DialogContent>
      <style>{`
        @keyframes pulse-success {
          from { opacity: 0.15; transform: scale(0.85); }
          to   { opacity: 0.5;  transform: scale(1.15); }
        }
      `}</style>
    </Dialog>
  );
}
