import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerData, socialLinks } from "@/data/footerData";

// Map social link names → icon components
const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

function Footer() {
  const theme = useTheme();

  const contact = footerData.find((d) => d.type === "contact");
  const sections = footerData.filter((d) => d.type === "section");

  const linkSx = {
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "0.88rem",
    display: "block",
    "&:hover": { color: theme.palette.primary.main },
  };

  const sectionAccent = (
    <Box sx={{ width: 32, height: 2, bgcolor: theme.palette.primary.main, mb: 2, borderRadius: 1 }} />
  );

  return (
    <>
      {/* ── Main footer ── */}
      <Box
        component="footer"
        sx={{
          bgcolor: theme.palette.background.dark,
          color: "white",
          px: { xs: 3, md: "7%" },
          py: { xs: 5, md: 7 },
          borderTop: `3px solid ${theme.palette.primary.main}`,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 5, md: 4 } }}>

          {/* Brand column */}
          <Box sx={{ flex: "2 1 220px", minWidth: 200 }}>
            {/* Brand name */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
              <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "white" }}>
                Nova Solutions
              </Typography>
            </Box>
                     <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                maxWidth: 220,
                "&:hover img": { transform: "scale(1.05)" },
              }}
            >
              <Link
                href="https://maps.app.goo.gl/QoNHzw2ME7cze2Br5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open location in Google Maps"
                sx={{ position: "absolute", inset: 0, zIndex: 1 }}
              />
              <Box
                component="img"
                src="https://res.cloudinary.com/driyxelzh/image/upload/v1758226116/PHOTO-2025-09-18-15-03-26_xbia6m.jpg"
                alt="520 Warren St, Albany NY"
                sx={{ width: "100%", height: 110, objectFit: "cover", display: "block", transition: "transform 0.3s" }}
              />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.7, mb: 3 }}>
              Your trusted home improvement partner in Capital Region, NY.
              Quality roofing, siding, and gutter services since 2010.
            </Typography>
            {/* Social icons — from data */}
            <Box sx={{ display: "flex", gap: 1, mb: 2.5 }}>
              {socialLinks.map(({ name, href }) => {
                const Icon = SOCIAL_ICONS[name];
                if (!Icon) return null;
                return (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    sx={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: 36, height: 36, borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.6)",
                      "&:hover": { bgcolor: theme.palette.primary.main, color: theme.palette.background.dark, borderColor: theme.palette.primary.main },
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Link>
                );
              })}
            </Box>


   
          </Box>

          {/* Section columns — from data */}
          {sections.map((section) => (
            <Box key={section.title} sx={{ flex: "1 1 130px", minWidth: 110 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "white", mb: 1.5 }}>
                {section.title}
              </Typography>
              {sectionAccent}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {section.services.map((s) => (
                  <Link key={s.name} component={RouterLink} to={s.link} sx={linkSx}>
                    {s.name}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}

          {/* Contact column — from data */}
          {contact && (
            <Box sx={{ flex: "1 1 200px", minWidth: 180 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "white", mb: 1.5 }}>
                {contact.title}
              </Typography>
              {sectionAccent}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 17 }} />
                  <Link href={`tel:${contact.number.replace(/\s/g, "")}`} sx={{ ...linkSx, display: "inline" }}>
                    {contact.number}
                  </Link>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 17 }} />
                  <Link href={`mailto:${contact.email}`} sx={{ ...linkSx, display: "inline" }}>
                    {contact.email}
                  </Link>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 17, mt: "2px" }} />
                  <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {contact.direction}
                    {contact.areas && <><br />{contact.areas}</>}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Copyright bar ── */}
      <Box
        sx={{
          bgcolor: theme.palette.background.dark,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          py: 2,
          px: { xs: 3, md: "7%" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>
          © 2024 Nova Solutions. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          {[
            { label: "Privacy Policy",   to: "/privacy-policy" },
            { label: "Terms of Service", to: "/privacy-policy" },
            { label: "Sitemap",          to: "/" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              component={RouterLink}
              to={to}
              sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", textDecoration: "none", "&:hover": { color: theme.palette.primary.main } }}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Footer;
