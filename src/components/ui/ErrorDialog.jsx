// ─────────────────────────────────────────────────────────────
//  ErrorDialog.jsx  — Nova Solutions
//  Dependencias: @mui/material  @mui/icons-material
//
//  Props:
//    open    {boolean}   Controla si el dialog está abierto
//    onClose {function}  Callback para cerrar el dialog
//    onRetry {function}  Callback para reintentar el envío
//
//  Uso:
//    import ErrorDialog from './ErrorDialog'
//    <ErrorDialog
//      open={status === 'error'}
//      onClose={resetStatus}
//      onRetry={handleSubmit}
//    />
// ─────────────────────────────────────────────────────────────

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Zoom,
} from "@mui/material";
import HomeIcon    from "@mui/icons-material/Home";
import PhoneIcon   from "@mui/icons-material/Phone";
import CloseIcon   from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import WifiOffIcon from "@mui/icons-material/WifiOff";

// ── Tokens ──────────────────────────────────────────────────
const RED  = "#EF4444";
const DARK = "#111111";

// ── Data ────────────────────────────────────────────────────
const INFO_CARDS = [
  { Icon: RefreshIcon, title: "Try Later",     sub: "Usually resolves"  },
  { Icon: PhoneIcon,   title: "Call Us",       sub: "Always available"  },
  { Icon: WifiOffIcon, title: "Check Status",  sub: "Service may be down" },
];

// Posiciones de los sparkles ✦
const SPARKLES = [
  { top: 28,  left: 44,    size: 20, delay: 0    },
  { top: 42,  right: 52,   size: 15, delay: 0.35 },
  { top: 158, left: 60,    size: 11, delay: 0.7  },
  { top: 140, right: 44,   size: 17, delay: 1.05 },
  { top: 8,   left: "50%", size: 10, delay: 1.4  },
];

// Anillos concéntricos decorativos
const RINGS = [
  { size: 384, opacity: 0.08, dashed: false },
  { size: 320, opacity: 0.12, dashed: false },
  { size: 248, opacity: 0.18, dashed: false },
  { size: 200, opacity: 0.25, dashed: true  },
];

// ── Component ───────────────────────────────────────────────
export default function ErrorDialog({ open, onClose, onRetry }) {
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
            bgcolor: DARK,
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
          height: 240,
          background:
            "radial-gradient(ellipse 90% 85% at 50% 35%, #3D0000 0%, #1A0000 50%, #111111 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow radial detrás del círculo */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.19) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Anillos concéntricos */}
        {RINGS.map(({ size, opacity, dashed }, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) translateY(-10px)",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1.5px ${dashed ? "dashed" : "solid"} rgba(239,68,68,${opacity})`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Sparkles ✦ */}
        {SPARKLES.map((s, i) => (
          <Typography
            key={i}
            sx={{
              position: "absolute",
              top:   s.top,
              left:  s.left  ?? "auto",
              right: s.right ?? "auto",
              fontSize: s.size,
              color: `rgba(239,68,68,0.4)`,
              lineHeight: 1,
              animation: `pulse-error ${1.8 + s.delay}s ease-in-out infinite alternate`,
              userSelect: "none",
            }}
          >
            ✦
          </Typography>
        ))}

        {/* Círculo con casa */}
        <Box
          sx={{
            position: "relative",
            mt: -1,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 40%, #3D0A0A 0%, #1E0404 60%, #150000 100%)",
            border: `3px solid ${RED}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 16px rgba(239,68,68,0.25)",
            zIndex: 1,
          }}
        >
          <HomeIcon sx={{ fontSize: 80, color: "#FFFFFF" }} />

          {/* Badge X rojo */}
          <Box
            sx={{
              position: "absolute",
              bottom: -2,
              right: -8,
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: RED,
              border: `3px solid ${DARK}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <CloseIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Box>
        </Box>

        {/* Tagline */}
        <Typography
          sx={{
            position: "absolute",
            bottom: 14,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 5,
            color: "rgba(239,68,68,0.45)",
            userSelect: "none",
          }}
        >
          DON'T WORRY — WE'RE HERE TO HELP
        </Typography>
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
          Service Unavailable
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
          Our system is temporarily unavailable. Please wait a few minutes and
          try again — or reach us{" "}
          <Box component="span" sx={{ color: RED, fontWeight: 700 }}>
            directly by phone
          </Box>
          .
        </Typography>

        {/* Divisor rojo */}
        <Box sx={{ width: 48, height: 3, borderRadius: 2, bgcolor: RED }} />

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
              <Icon sx={{ color: RED, fontSize: 22 }} />
              <Typography sx={{ color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
                {title}
              </Typography>
              <Typography sx={{ color: "#666", fontSize: 10, textAlign: "center" }}>
                {sub}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CTA principal — reintentar */}
        <Button
          fullWidth
          onClick={onRetry}
          startIcon={<RefreshIcon />}
          sx={{
            bgcolor: RED,
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.95rem",
            borderRadius: "16px",
            py: 1.6,
            textTransform: "none",
            letterSpacing: 0.2,
            boxShadow: "0 6px 24px rgba(239,68,68,0.28)",
            "&:hover": {
              bgcolor: "#DC2626",
              boxShadow: "0 8px 32px rgba(239,68,68,0.4)",
            },
          }}
        >
          Try Again Later
        </Button>

        {/* CTA secundario — llamar */}
        <Button
          component="a"
          href="tel:+15185985156"
          fullWidth
          startIcon={<PhoneIcon sx={{ color: RED }} />}
          sx={{
            bgcolor: "#1A1A1A",
            color: "#CCC",
            fontWeight: 700,
            fontSize: "0.88rem",
            borderRadius: "16px",
            py: 1.3,
            textTransform: "none",
            border: "1px solid #333",
            "&:hover": { bgcolor: "#222", color: "#fff" },
          }}
        >
          Call Us Now &nbsp;•&nbsp; +1 518-598-5156
        </Button>

        {/* Botón cerrar */}
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            bgcolor: "#161616",
            color: "#888",
            fontWeight: 500,
            fontSize: "0.88rem",
            borderRadius: "16px",
            py: 1.3,
            textTransform: "none",
            border: "1px solid #2A2A2A",
            "&:hover": { bgcolor: "#222", color: "#bbb" },
          }}
        >
          Close &amp; go back
        </Button>

        {/* Footer */}
        <Typography
          sx={{
            color: "#444",
            fontSize: "0.68rem",
            letterSpacing: 0.3,
            textAlign: "center",
          }}
        >
          Our team is available Mon–Sat · 8am to 6pm
        </Typography>
      </DialogContent>

      <style>{`
        @keyframes pulse-error {
          from { opacity: 0.1; transform: scale(0.85); }
          to   { opacity: 0.5; transform: scale(1.2);  }
        }
      `}</style>
    </Dialog>
  );
}
