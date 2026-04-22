import { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Dialog,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import MenuIcon    from '@mui/icons-material/Menu';
import CloseIcon   from '@mui/icons-material/Close';
import Mail        from '@mui/icons-material/Mail';
import Phone       from '@mui/icons-material/Phone';
import ExpandMore  from '@mui/icons-material/ExpandMore';
import ExpandLess  from '@mui/icons-material/ExpandLess';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import { useLocation, Link } from 'react-router-dom';
import { headerMenu } from '../../data/navigation/menu';
import ButtonMovil from '@/components/ui/ButtonMovil';
import ContactForm from '@/components/forms/ContactForm';

const ContactBarDesktop = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { md: 4, lg: 20 },
        py: 2,
        width: '100%',
        zIndex: 51,
        bgcolor: theme.palette.primary.contrastText,
        color: 'white',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
        <Mail sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
        <Typography component="a" href="mailto:Admin@nova-solutions.us" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Admin@nova-solutions.us
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Phone sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
        <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
          Call us
        </Typography>
        <Typography component="a" href="tel:+15185985156" variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          : +1 518-598-5156
        </Typography>
      </Box>
    </Box>
  );
};

const ContactBarMobile = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 0,
        height: '40px',
        width: '100%',
        zIndex: 51,
        bgcolor: theme.palette.secondary.contrastText,
        color: 'white',
        fontSize: '0.75rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Mail sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
        <Typography component="a" href="mailto:Admin@nova-solutions.us" variant="caption" sx={{ color: theme.palette.primary.main, textDecoration: 'none', fontSize: '0.7rem' }}>
          Admin@nova-solutions.us
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ color: '#555', fontSize: '0.7rem' }}>|</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Phone sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
        <Typography component="a" href="tel:+15185985156" variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none', fontSize: '0.7rem' }}>
          +1 518-598-5156
        </Typography>
      </Box>
    </Box>
  );
};

const DesktopNav = () => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const closeTimer = useRef(null);
  const subCloseTimer = useRef(null);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (!isDesktop) {
      setAnchorEl(null);
      setActiveMenu(null);
      setSubMenuAnchorEl(null);
      setActiveSubMenu(null);
    }
  }, [isDesktop]);

  const isActiveParent = (item) => {
    if (item.link === location.pathname) return true;
    if (item.children) {
      return item.children.some(child => isActiveParent(child));
    }
    return false;
  };

  const clearTimers = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
  };

  const handleOpen = (event, item) => {
    clearTimers();
    if (!item.children) {
        setAnchorEl(null);
        setActiveMenu(null);
        return;
    }
    
    if (activeMenu?.name !== item.name) {
        setSubMenuAnchorEl(null);
        setActiveSubMenu(null);
    }

    setAnchorEl(event.currentTarget);
    setActiveMenu(item);
  };

  const handleClose = () => {
    closeTimer.current = setTimeout(() => {
        setAnchorEl(null);
        setActiveMenu(null);
        setSubMenuAnchorEl(null);
        setActiveSubMenu(null);
    }, 150);
  };

  const handleMenuEnter = () => {
      clearTimers();
  };

  const handleSubOpen = (event, child) => {
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
    
    if (!child.children) {
        setSubMenuAnchorEl(null);
        setActiveSubMenu(null);
        return;
    }
    setSubMenuAnchorEl(event.currentTarget);
    setActiveSubMenu(child);
  };

  const handleSubClose = () => {
     subCloseTimer.current = setTimeout(() => {
        setSubMenuAnchorEl(null);
        setActiveSubMenu(null);
     }, 150);
  };
  
  const handleSubMenuEnter = () => {
      if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 3 }}>
      {headerMenu.map((item) => {
        const isActive = isActiveParent(item);
        return (
          <Button
            key={item.name}
            component={Link}
            to={item.link}
            onMouseEnter={(e) => handleOpen(e, item)}
            onMouseLeave={handleClose}
            sx={{
              color: isActive
                ? theme.palette.nav.textCurrent
                : theme.palette.nav.textPrimary,
              fontWeight: isActive ? 600 : 400,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: 0,
              pb: 0.5,
              '&:hover': {
                 textDecoration: 'none',
                 color: theme.palette.nav.textCurrent,
                 bgcolor: 'transparent',
              },
            }}
            endIcon={item.children && <ExpandMore />}
          >
            {item.name}
          </Button>
        );
      })}


      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
            setAnchorEl(null);
            setActiveMenu(null);
        }}
        MenuListProps={{ 
            onMouseLeave: handleClose,
            onMouseEnter: handleMenuEnter
        }}
        disablePortal
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
            pointerEvents: 'none',
            '& .MuiPaper-root': {
                pointerEvents: 'auto',
                minWidth: 220,
                mt: 0,
                borderRadius: '10px',
                border: `1px solid ${theme.palette.primary.main}33`,
                bgcolor: '#111111',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }
        }}
      >
        {activeMenu?.children?.map((child) => (
          <Box key={child.name} sx={{ position: 'relative' }}>
             <MenuItem
                component={Link}
                to={child.link}
                onClick={() => {
                    setAnchorEl(null);
                    setActiveMenu(null);
                    setSubMenuAnchorEl(null);
                    setActiveSubMenu(null);
                }}
                onMouseEnter={(e) => handleSubOpen(e, child)}
                onMouseLeave={handleSubClose}
                selected={location.pathname === child.link}
                sx={{
                  fontSize: '0.95rem',
                  color: location.pathname === child.link ? theme.palette.primary.main : '#CCCCCC',
                  fontWeight: location.pathname === child.link ? 700 : 400,
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 1.2,
                  px: 2,
                  borderLeft: location.pathname === child.link ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  '&:hover': {
                    bgcolor: '#1A1A1A',
                    color: theme.palette.primary.main,
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                  },
                  '&.Mui-selected': {
                    bgcolor: 'transparent',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: '#1A1A1A',
                  },
                }}
              >
                {child.name}
                {child.children && <ChevronRight fontSize="small" sx={{ color: '#666' }} />}
              </MenuItem>
          </Box>
        ))}
      </Menu>

      {/* Secondary Menu (Level 3) */}
       <Menu
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={() => {
            setSubMenuAnchorEl(null);
            setActiveSubMenu(null);
        }}
        MenuListProps={{ 
            onMouseLeave: handleSubClose,
            onMouseEnter: handleSubMenuEnter
        }}
        disablePortal
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        sx={{
            pointerEvents: 'none',
            '& .MuiPaper-root': {
                pointerEvents: 'auto',
                minWidth: 220,
                ml: 0.5,
                borderRadius: '10px',
                border: `1px solid ${theme.palette.primary.main}33`,
                bgcolor: '#111111',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }
        }}
      >
          {activeSubMenu?.children?.map((grandChild) => (
              <MenuItem
                key={grandChild.name}
                component={Link}
                to={grandChild.link}
                onClick={() => {
                    setAnchorEl(null);
                    setActiveMenu(null);
                    setSubMenuAnchorEl(null);
                    setActiveSubMenu(null);
                }}
                selected={location.pathname === grandChild.link}
                sx={{
                  fontSize: '0.95rem',
                  color: location.pathname === grandChild.link ? theme.palette.primary.main : '#CCCCCC',
                  fontWeight: location.pathname === grandChild.link ? 700 : 400,
                  py: 1.2,
                  px: 2,
                  borderLeft: location.pathname === grandChild.link ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  '&:hover': {
                    bgcolor: '#1A1A1A',
                    color: theme.palette.primary.main,
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                  },
                  '&.Mui-selected': { bgcolor: 'transparent' },
                  '&.Mui-selected:hover': { bgcolor: '#1A1A1A' },
                }}
              >
                {grandChild.name}
              </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

function MobileNav({ mobileOpen, handleDrawerToggle, mobileSubmenuOpen, toggleMobileSubmenu, onOpenQuote }) {
  const theme = useTheme();
  const location = useLocation();

  const isCurrentPage = (link) => {
    if (link === '/') return location.pathname === '/';
    return location.pathname === link;
  };

  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          width: '100%',
          bgcolor: theme.palette.primary.contrastText,
          pt: 12,
          px: 4,
        },
      }}
    >
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          color: theme.palette.text.primary,
        }}
      >
        <CloseIcon />
      </IconButton>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {headerMenu.map((item) => (
          <Box key={item.name}>
            <ListItem disablePadding>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  onClick={handleDrawerToggle}
                  sx={{
                    py: 0.5,
                    px: 0,
                    color: isCurrentPage(item.link)
                      ? theme.palette.nav.mobileTextCurrent
                      : theme.palette.nav.mobileText,
                    fontWeight: isCurrentPage(item.link) ? 600 : 400,
                    '&:hover': {
                      color: theme.palette.nav.mobileTextHover,
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: isCurrentPage(item.link) ? 700 : 500 }} />
                </ListItemButton>
                {item.children && (
                  <IconButton
                    onClick={() => toggleMobileSubmenu(item.name)}
                    sx={{
                      color: isCurrentPage(item.link)
                        ? theme.palette.nav.mobileTextCurrent
                        : theme.palette.nav.mobileText,
                      p: 1,
                    }}
                  >
                    {mobileSubmenuOpen[item.name] ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </Box>
            </ListItem>
            {item.children && (
              <Collapse in={mobileSubmenuOpen[item.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ ml: 2, mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {item.children.map((child) => (
                    <Box key={child.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ListItemButton
                          component={Link}
                          to={child.link}
                          onClick={handleDrawerToggle}
                          sx={{
                            py: 0.5,
                            px: 0,
                            color: isCurrentPage(child.link)
                              ? theme.palette.nav.mobileTextCurrent
                              : theme.palette.nav.mobileText,
                            fontWeight: isCurrentPage(child.link) ? 600 : 400,
                            '&:hover': {
                              color: theme.palette.nav.mobileTextHover,
                              bgcolor: 'transparent',
                            },
                          }}
                        >
                          <ListItemText primary={child.name} primaryTypographyProps={{ fontSize: '1.1rem' }} />
                        </ListItemButton>
                        {child.children && (
                          <IconButton
                            onClick={() => toggleMobileSubmenu(`${item.name}-${child.name}`)}
                            sx={{
                              color: isCurrentPage(child.link)
                                ? theme.palette.nav.mobileTextCurrent
                                : theme.palette.nav.mobileText,
                              p: 1,
                            }}
                          >
                            {mobileSubmenuOpen[`${item.name}-${child.name}`] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </Box>
                      {child.children && (
                        <Collapse in={mobileSubmenuOpen[`${item.name}-${child.name}`]} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding sx={{ ml: 2, mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {child.children.map((subChild) => (
                              <ListItemButton
                                key={subChild.name}
                                component={Link}
                                to={subChild.link}
                                onClick={handleDrawerToggle}
                                sx={{
                                  py: 0.5,
                                  px: 0,
                                  color: isCurrentPage(subChild.link)
                                    ? theme.palette.nav.mobileTextCurrent
                                    : theme.palette.nav.mobileText,
                                  fontWeight: isCurrentPage(subChild.link) ? 600 : 400,
                                  '&:hover': {
                                    color: theme.palette.nav.mobileTextHover,
                                    bgcolor: 'transparent',
                                  },
                                }}
                              >
                                <ListItemText primary={subChild.name} primaryTypographyProps={{ fontSize: '1rem' }} />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </Box>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
      <Box sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            handleDrawerToggle();
            if (onOpenQuote) onOpenQuote();
          }}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 700,
            py: 1.5,
            borderRadius: '4px',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          GET A QUOTE
        </Button>
      </Box>
    </Drawer>
  );
}

function Header() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState({});
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleMobileSubmenu = (menuName) => {
    setMobileSubmenuOpen((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <>
   
      <ButtonMovil />
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          bgcolor: theme.palette.primary.contrastText,
          boxShadow: 2,
          height: { xs: '100px', md: '120px' },
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>

       
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              height: '100%',
              alignItems: 'stretch',
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                ml: { lg: 4 },
                pr: 4,
              }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/driyxelzh/image/upload/v1775663721/icono_nova_rwfnjx.png"
                alt="Nova Solutions Corporation Logo"
                sx={{ width: "70%", height: 'auto' }}
              />
            </Box>

            {/* Right column: two rows stacked */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  pr: 6,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setQuoteDialogOpen(true)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 700,
                    px: 3,
                    py: 0.7,
                    fontSize: '0.9rem',
                    borderRadius: '4px',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  GET A QUOTE
                </Button>
              </Box>

              {/* Row 2 — Navigation */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  pr: 6,
                }}
              >
                <DesktopNav />
              </Box>

            </Box>
          </Box>

          {/* ── Mobile: single-row layout ──────────────────────────── */}
          <Toolbar
            disableGutters
            sx={{
              display: { xs: 'flex', lg: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100px',
              px: 2,
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/driyxelzh/image/upload/v1775663721/icono_nova_rwfnjx.png"
                alt="Nova Solutions Corporation Logo"
                sx={{ width: 100, height: 'auto' }}
              />
            </Box>

            <IconButton
              color="inherit"
              aria-label="toggle menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>

        </Container>
      </AppBar>

      <MobileNav
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        mobileSubmenuOpen={mobileSubmenuOpen}
        toggleMobileSubmenu={toggleMobileSubmenu}
        onOpenQuote={() => setQuoteDialogOpen(true)}
      />
      
      <Dialog
        open={quoteDialogOpen}
        onClose={() => setQuoteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#111111',
            borderRadius: 2,
            p: { xs: 2, md: 4 },
            m: 2,
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setQuoteDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: -16,
              top: -16,
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          <ContactForm />
        </Box>
      </Dialog>
      
      <Box sx={{ height: { xs: '164px', md: '120px' } }} />
    </>
  );
}

export default Header;
