import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All paths to prerender
const ROUTES = [
  '/',
  '/Roofing',
  '/Roofing/Roof-installation',
  '/Roofing/Asphalt-Single',
  '/Roofing/Insurance-Claims',
  '/Roofing/Metal-Roofing',
  '/Roofing/Commercial',
  '/Roofing-Repair',
  '/Roofing-Repair/Roof-Inspection',
  '/Roofing-Repair/Storm-Damage',
  '/Roofing-Repair/Hail-Damage',
  '/Siding',
  '/Siding/Vinyl-Siding',
  '/Siding/Siding-Replacement',
  '/Siding/fiber-Cement-Siding',
  '/Gutters',
  '/Gutters/Gutter-Guards',
  '/Gutters/Gutter-Guards/Gutter-Protection',
  '/Gutters/Gutter-Guards/Leaf-Filters',
  '/Gutters/Gutter-Guards/Leaf-Guards',
  '/Gutters/Gutter-Guards/Gutter-Covers',
  '/Gutters/Gutter-Guards/Gutter-Cap',
  '/Gutters/Gutter-Replacement',
  '/Gutters/Gutter-Repairs',
  '/About',
  '/About/Contact-us',
  '/privacy-policy',
];

const PORT = 5174;
const DIST_DIR = path.join(process.cwd(), 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`dist directory does not exist at ${DIST_DIR}. Run "npm run build" first.`);
  process.exit(1);
}

const app = express();

// Serve static files from the dist directory
app.use(express.static(DIST_DIR));

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// Start the server
const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Pre-rendering started at http://localhost:${PORT}`);
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Disable network fetching for external heavy assets if possible, but we mostly just want the DOM.
  // We'll wait until the React app injects the SEO tags (usually very fast).

  for (const route of ROUTES) {
    try {
      console.log(`Processing ${route}...`);
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait a tiny bit extra to ensure React's useEffect has injected meta tags
      await new Promise(resolve => setTimeout(resolve, 500));

      const html = await page.content();
      
      // Map route to output file path
      let filePath = path.join(DIST_DIR, route);
      
      // Create directories if they don't exist
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      
      // If it's the root, we don't append index.html to the path as a dir
      if (route === '/') {
        filePath = path.join(DIST_DIR, 'index.html');
      } else {
        filePath = path.join(filePath, 'index.html');
      }
      
      fs.writeFileSync(filePath, html);
      console.log(`✅ Saved ${filePath}`);
    } catch (e) {
      console.error(`❌ Failed to render ${route}:`, e.message);
    }
  }

  await browser.close();
  server.close();
  console.log('🎉 Pre-rendering complete!\n');
  process.exit(0);
});
