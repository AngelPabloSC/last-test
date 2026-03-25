import { createTheme } from '@mui/material/styles';

// Nova Solutions Dark Theme Configuration
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFEC00', // Yellow
            light: '#FFF9B0',
            dark: '#E5D400',
            contrastText: '#000000',
            100: '#FFF9B0',
            300: '#FFF066',
            600: '#E5D400',
            700: '#BBAA00',
            800: '#8C7F00',
            900: '#5D5500',
        },
        secondary: {
            main: '#41D4ff', // Cyan
            light: '#000000',
            dark: '#997300',
            contrastText: '#000000',
        },
        background: {
            default: '#000000',
            paper: '#111111',
            light: '#eef1ff',
            dark: '#0A0A0A',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
            disabled: '#7077A1',
        },
        // Custom colors for Nova Solutions Dark Mode
        headline: {
            main: '#ffffff',
            light: '#1a1f3c',
            dark: '#ffffff',
        },
        eyebrow: {
            main: '#e6b800',
            light: '#1e3c8c',
            dark: '#e6b800',
        },
        body: {
            base: '#ffffff',
            light: '#1a1f3c',
            dark: '#ffffff',
        },
        nav: {
            text: '#ffffff',
            textPrimary: '#ffffff',
            textHover: '#FFEC00',
            textActive: '#FFEC00',
            textCurrent: '#FFEC00',
            submenuBg: '#1a1f3c',
            mobileText: '#ffffff',
            mobileTextHover: '#e6b800',
            mobileTextActive: '#41d4ff',
            mobileTextCurrent: '#ffffff',
        },
        accent: 'rgba(0, 0, 255, 0.5)',
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h1: {
            fontSize: 'clamp(1.5rem, 4vw + 0.1rem, 3rem)',
            fontWeight: 700,
        },
        h2: {
            fontSize: 'clamp(1.25rem, 3vw + 0.1rem, 2.5rem)',
            fontWeight: 700,
        },
        h3: {
            fontSize: 'clamp(1.125rem, 2.5vw + 0.1rem, 2rem)',
            fontWeight: 700,
        },
        h4: {
            fontSize: 'clamp(1rem, 2vw + 0.1rem, 1.75rem)',
            fontWeight: 600,
        },
        h5: {
            fontSize: 'clamp(0.875rem, 1.5vw + 0.1rem, 1.5rem)',
            fontWeight: 600,
        },
        h6: {
            fontSize: 'clamp(0.75rem, 1.25vw + 0.1rem, 1.25rem)',
            fontWeight: 600,
        },
        body1: {
            fontSize: 'clamp(1rem, 2vw + 0.125rem, 1.25rem)',
        },
        body2: {
            fontSize: 'clamp(0.875rem, 1.5vw + 0.0625rem, 1rem)',
        },
        caption: {
            fontSize: 'clamp(0.625rem, 1.5vw + 0.0625rem, 0.75rem)',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
});
