import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const navLinks = [
  { id: 'privacy-policy', label: 'Privacy Policy' },
  { id: 'terms-conditions', label: 'Terms & Conditions' },
  { id: 'rights-choices', label: 'Your Rights' },
  { id: 'contact', label: 'Contact' },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [ids]);

  return active;
}

export default function TermsPrivacyPage() {
  const theme = useTheme();
  const activeSection = useActiveSection(navLinks.map((t) => t.id));

  useEffect(() => {
    document.title = "Privacy Policy and Terms | Nova Solutions";
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = "Read our full Privacy Policy and Terms & Conditions to understand how Nova Solutions collects, uses, and protects your data while delivering quality service in Capital Region and surrounding areas.";
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0D0D0D', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Hero Header Area */}
      <Box sx={{ bgcolor: '#141414', borderBottom: '1px solid #222', pt: { xs: 16, md: 24 }, pb: 8 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 } }}>
          <Box sx={{ display: 'flex', gap: 1, color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
            <Box component={RouterLink} to="/" sx={{ color: '#888', textDecoration: 'none', '&:hover': { color: 'white' } }}>Home</Box>
            <span>/</span>
            <span>Privacy & Terms</span>
          </Box>
          <Box component="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, m: 0, mb: 1, letterSpacing: '-0.02em' }}>
            Privacy Policy & Terms
          </Box>
          <Box sx={{ color: '#666', fontSize: '0.85rem' }}>
            Last updated: January 1, 2024 - Nova Solutions LLC
          </Box>
        </Container>
      </Box>

      {/* Main Layout Area */}
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 6 }, py: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 10, lg: 16 } }}>
          
          {/* Sidebar */}
          <Box sx={{ width: { xs: '100%', lg: '240px' }, flexShrink: 0 }}>
            <Box sx={{ position: 'sticky', top: 120 }}>
              <Box sx={{ color: '#888', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 3 }}>
                ON THIS PAGE
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #333' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <Box
                      key={link.id}
                      component="button"
                      onClick={() => scrollTo(link.id)}
                      sx={{
                        textAlign: 'left',
                        bgcolor: 'transparent',
                        border: 'none',
                        borderLeft: '2px solid',
                        borderColor: isActive ? theme.palette.primary.main : 'transparent',
                        color: isActive ? 'white' : '#888',
                        py: 1.5,
                        px: 3,
                        fontSize: '0.85rem',
                        fontWeight: isActive ? 600 : 400,
                        ml: '-1px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { color: 'white' }
                      }}
                    >
                      {link.label}
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{ mt: 8 }}>
                <Box sx={{ color: '#888', fontSize: '0.75rem', mb: 2 }}>Questions about our policies?</Box>
                <Button
                  component={RouterLink}
                  to="/About/Contact-us"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: 'black',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    borderRadius: 1,
                    py: 1.5,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#e6c200', boxShadow: 'none' }
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, maxWidth: '800px', '& p': { color: '#999', fontSize: '0.95rem', lineHeight: 1.8, m: 0, mb: 3 } }}>
            
            {/* Privacy Section Header */}
            <Box id="privacy-policy" sx={{ scrollMarginTop: 120 }}>
              <Box sx={{ color: theme.palette.primary.main, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 1 }}>
                PRIVACY POLICY
              </Box>
              <Box component="h2" sx={{ fontSize: '2rem', fontWeight: 700, m: 0, mb: 3 }}>
                Privacy Policy
              </Box>
            </Box>

            {/* Accent Block - 1. Your Privacy Rights */}
            <Box sx={{ borderLeft: `3px solid ${theme.palette.primary.main}`, pl: { xs: 3, md: 5 }, my: 6 }}>
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mb: 1.5 }}>1. Your Privacy Rights</Box>
              <p>
                Nova Solutions is committed to protecting your personal information and your right to privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information we may gather through your use of our website, services, and communications. This policy applies to all pages, forms, platforms, and services operated by Nova Solutions that link to this statement.
              </p>
              <p>
                We encourage you to read this Privacy Policy carefully to understand how we collect, use, and safeguard your personal information. By using our website and services, you agree to the terms described in this policy.
              </p>
              <p style={{ marginBottom: 0 }}>
                If you have any questions or concerns regarding our privacy practices, please refer to the final section of this document for contact details.
              </p>
            </Box>

            <Box id="data-collection" sx={{ scrollMarginTop: 120 }}>
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 6, mb: 2 }}>2. Information We Collect</Box>
              <p>We may collect the following types of information:</p>
              <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {[
                  'Full name',
                  'Email address',
                  'Phone number (cell or landline)',
                  'City and geographic location',
                  'Form submissions and service inquiries'
                ].map((item, i) => (
                  <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: '#999', fontSize: '0.95rem' }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: theme.palette.primary.main, mt: 1.2, flexShrink: 0 }} />
                    {item}
                  </Box>
                ))}
              </Box>
              
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>3. How We Use Your Information</Box>
              <p>We use your personal data to:</p>
              <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                {[
                  'Send personalized emails, SMS, or phone calls regarding services',
                  'Respond to inquiries or provide support',
                  'Offer location-based services or promotions',
                  'Improve our services and user experience',
                  'Monitor website analytics and site performance',
                  'Conduct marketing campaigns, promotions, or surveys'
                ].map((item, i) => (
                  <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: '#999', fontSize: '0.95rem' }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: theme.palette.primary.main, mt: 1.2, flexShrink: 0 }} />
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box id="cookies" sx={{ scrollMarginTop: 120 }}>
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>4. Use of Cookies and Tracking</Box>
              <p>
                We use cookies and similar technologies to personalize your experience, track usage patterns, and improve our website functionality. You may disable cookies through your browser settings, but doing so may limit certain functionalities of our website.
              </p>
            </Box>

            <Box>
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>5. Sharing of Information</Box>
              <p>
                Nova Solutions does <strong style={{color: 'white'}}>not sell or rent</strong> your personal information. We may share data with trusted third-party service providers who assist us in delivering services (e.g., hosting, email, payment processors), and only as necessary to complete transactions or enhance your experience. These providers are required to keep your data confidential.
              </p>
              <p>
                However, no mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
              
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>6. Your Consent</Box>
              <p>
                By submitting any form on our website or providing information through communication, you consent to the collection, use, and storage of your data by Nova Solutions in accordance with this Privacy Policy.
              </p>
              
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>7. Data Security</Box>
              <p>
                We take data protection seriously. Your information is stored on secure servers and protected by encryption and administrative safeguards. Access is restricted to authorized personnel only. We continually review our practices to keep your data safe from unauthorized access, loss, or misuse.
              </p>

              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>8. Data Retention</Box>
              <p>
                We retain personal data for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.
              </p>
            </Box>

            <Box id="rights-choices" sx={{ scrollMarginTop: 120 }}>
              <Box component="h3" sx={{ fontSize: '1.25rem', fontWeight: 700, m: 0, mt: 8, mb: 2 }}>9. Your Rights & Choices</Box>
              <p>
                You have the right to access, update, or request deletion of your personal information.
              </p>
              <p>
                <strong style={{color: 'white'}}>Opt-Out of Texting:</strong> You may opt out of receiving text messages from us at any time by replying &quot;STOP&quot; to any message. You may also reply &quot;HELP&quot; for assistance.
              </p>
              <p>
                To exercise your rights, contact us at:{' '}
                <a href="mailto:Admin@nova-solutions.us" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>Admin@nova-solutions.us</a>
              </p>
            </Box>

            {/* Terms and Conditions Section Divider */}
            <Box id="terms-conditions" sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 12, mb: 8, scrollMarginTop: 120 }}>
              <Box sx={{ color: theme.palette.primary.main, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                Terms & Conditions
              </Box>
              <Box sx={{ flex: 1, height: '1px', bgcolor: theme.palette.primary.main, opacity: 0.3 }} />
            </Box>

            {/* Terms Content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mb: 1.5 }}>1. Acceptance of Terms</Box>
                <p>
                  By using this website, you agree to be bound by these terms and conditions. If you do not agree, please do not access or use the site.
                </p>
              </Box>
              
              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>2. Use of Website</Box>
                <p>You may use this site for lawful purposes only. You agree not to:</p>
                <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  {[
                    'Misuse or attempt to exploit the platform',
                    'Upload harmful, misleading, or fraudulent content',
                    'Collect information about others without consent',
                    'Violate any laws or third-party rights'
                  ].map((item, i) => (
                    <Box component="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: '#999', fontSize: '0.95rem' }}>
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: theme.palette.primary.main, mt: 1.2, flexShrink: 0 }} />
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>3. Intellectual Property</Box>
                <p>
                  All content on this website — including logos, text, images, and code — is the property of Nova Solutions and may not be used without permission.
                </p>
              </Box>

              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>4. Disclaimer</Box>
                <p>
                  We strive to ensure the information on our site is accurate. However, we make no warranties regarding completeness or accuracy and disclaim liability for any errors or omissions.
                </p>
              </Box>

              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>5. Limitation of Liability</Box>
                <p>
                  Nova Solutions is not responsible for any damages or losses arising from the use or inability to use our site, even if advised of such damages.
                </p>
              </Box>

              <Box>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>6. Changes to Terms</Box>
                <p>
                  We may revise these Terms & Conditions or Privacy Policy at any time without prior notice. Updates will be posted on this page with a new effective date.
                </p>
              </Box>

              <Box id="contact" sx={{ scrollMarginTop: 120 }}>
                <Box component="h3" sx={{ fontSize: '1.15rem', fontWeight: 700, m: 0, mt: 2, mb: 1.5 }}>7. Contact Us</Box>
                <p>
                  For questions regarding these terms or our privacy practices, please contact us at:{' '}
                  <a href="mailto:Admin@nova-solutions.us" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>Admin@nova-solutions.us</a>
                </p>
              </Box>
            </Box>

          </Box>
        </Box>
      </Container>
    </Box>
  );
}
