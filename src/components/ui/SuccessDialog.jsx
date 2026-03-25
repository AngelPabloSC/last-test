import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Zoom,
} from "@mui/material";
import HomeIcon        from "@mui/icons-material/Home";
import PhoneIcon       from "@mui/icons-material/Phone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon       from "@mui/icons-material/Timer";
import ShieldIcon      from "@mui/icons-material/Shield";
import BadgeIcon       from "@mui/icons-material/Badge";
import SparklesIcon    from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";

const GREEN  = "#22C55E";

// ── Data ────────────────────────────────────────────────────
const INFO_CARDS = [
  { Icon: TimerIcon,  title: "Within hours", sub: "We'll call you"  },
  { Icon: ShieldIcon, title: "100% Free",    sub: "No obligation"   },
  { Icon: BadgeIcon,  title: "BBB Certified",sub: "Trusted pros"    },
];

const SPARKLES = [
  { top: 28,  left: 52,  size: 16, delay: 0    },
  { top: 44,  right: 68, size: 12, delay: 0.4  },
  { top: 130, left: 88,  size: 9,  delay: 0.8  },
  { top: 118, right: 56, size: 14, delay: 1.2  },
];

export default function SuccessDialog({ open, onClose }) {
  const theme = useTheme();
  const gold = theme.palette.primary.main;
  const darkText = theme.palette.primary.contrastText;
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
            border: "1px solid #1F1F1F",
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
      {/* ── Top band ── */}
      <Box
        sx={{
          height: 200,
          background: "linear-gradient(180deg, #1E1800 0%, #111111 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Sparkles decorativos */}
        {SPARKLES.map((s, i) => (
          <SparklesIcon
            key={i}
            sx={{
              position: "absolute",
              top:   s.top,
              left:  s.left  ?? "auto",
              right: s.right ?? "auto",
              fontSize: s.size,
              color: `rgba(255,215,0,0.35)`,
              animation: `pulse-success ${1.8 + s.delay}s ease-in-out infinite alternate`,
            }}
          />
        ))}

        {/* Tagline */}
        <Typography
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,215,0,0.65)",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 5,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          YOUR HOME IS IN GOOD HANDS
        </Typography>

        {/* Círculo con casa */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: `0 0 60px 8px rgba(255,215,0,0.22), 0 12px 32px rgba(255,215,0,0.18)`,
            mb: 3,
          }}
        >
          <HomeIcon sx={{ fontSize: 56, color: dark }} />

          {/* Badge verde */}
          <Box
            sx={{
              position: "absolute",
              bottom: -2,
              right: -6,
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: GREEN,
              border: `3px solid ${dark}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
        </Box>
      </Box>

      {/* ── Cuerpo ── */}
      <DialogContent
        sx={{
          px: { xs: 3, sm: 4 },
          pt: 3.5,
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
            fontSize: "2rem",
            letterSpacing: "-0.5px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Thank You!
        </Typography>

        <Typography
          sx={{
            color: "#999",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: 340,
          }}
        >
          We've received your request and our team will reach out within the
          next few hours to schedule your{" "}
          <Box component="span" sx={{ color: gold, fontWeight: 700 }}>
            FREE inspection
          </Box>
          .
        </Typography>

        {/* Divisor dorado */}
        <Box sx={{ width: 48, height: 3, borderRadius: 2, bgcolor: gold }} />

        {/* Info cards */}
        <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
          {INFO_CARDS.map(({ Icon, title, sub }) => (
            <Box
              key={title}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                bgcolor: "#1A1A1A",
                borderRadius: "14px",
                border: "1px solid #2A2A2A",
                p: 2,
              }}
            >
              <Icon sx={{ color: gold, fontSize: 22 }} />
              <Typography sx={{ color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
                {title}
              </Typography>
              <Typography sx={{ color: "#666", fontSize: 10, textAlign: "center" }}>
                {sub}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CTA principal — llamar */}
        <Button
          component="a"
          href="tel:+15185985156"
          fullWidth
          startIcon={<PhoneIcon />}
          sx={{
            bgcolor: gold,
            color: dark,
            fontWeight: 800,
            fontSize: "0.95rem",
            borderRadius: "16px",
            py: 1.6,
            textTransform: "none",
            letterSpacing: 0.2,
            boxShadow: "0 6px 24px rgba(255,215,0,0.28)",
            "&:hover": {
              bgcolor: "#E6C200",
              boxShadow: "0 8px 32px rgba(255,215,0,0.36)",
            },
          }}
        >
          Call Us Now &nbsp;•&nbsp; +1 518-598-5156
        </Button>

        <Button
          fullWidth
          onClick={onClose}
          sx={{
            bgcolor: "#1A1A1A",
            color: "#888",
            fontWeight: 500,
            fontSize: "0.88rem",
            borderRadius: "16px",
            py: 1.3,
            textTransform: "none",
            border: "1px solid #333",
            "&:hover": { bgcolor: "#222", color: "#bbb" },
          }}
        >
          Close &amp; go back
        </Button>

        {/* Footer rating */}
        <Typography
          sx={{
            color: "#444",
            fontSize: "0.68rem",
            letterSpacing: 0.3,
            textAlign: "center",
          }}
        >
          ⭐⭐⭐⭐⭐&nbsp; Rated 4.8/5 by 200+ Capital Region homeowners
        </Typography>
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
