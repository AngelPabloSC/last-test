import { useState } from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin,
  MapPin, Phone, Mail, Timer,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  'All Projects', 'Residential', 'Commercial', 'Industrial', 'Interior Design',
];

const MAIN_GRID_ROW1 = {
  featured: {
    name: 'Skyline Tower Complex', category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  stack: [
    { name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80' },
    { name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  ],
};

const MAIN_GRID_ROW2 = {
  featured: {
    name: 'Skyline Tower Complex', category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80',
  },
  stack: [
    { name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
    { name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  ],
};

const MAIN_GRID_ROW3 = {
  big: [
    { name: 'Skyline Tower Complex', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
    { name: 'Skyline Tower Complex', category: 'Commercial', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  ],
  grid: [
    { name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=400&q=80' },
    { name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80' },
    { name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80' },
    { name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80' },
    { name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=400&q=80' },
    { name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
  ],
};

const MAIN_GRID_ROW4 = [
  { name: 'Heritage Loft Conversion', category: 'Interior Design', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { name: 'Harbor Bridge Plaza', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { name: 'Green Meadows Estate', category: 'Residential', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80' },
];

const MORE_ROW1 = [
  { category: 'RESIDENTIAL', name: 'Hillside Villa', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { category: 'COMMERCIAL', name: 'Tech Campus Hub', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { category: 'INDUSTRIAL', name: 'Logistics Center', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
];

const MORE_ROW2 = [
  { category: 'COMMERCIAL', name: 'Corporate Tower', img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80' },
  { category: 'RESIDENTIAL', name: 'Parkside Homes', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
];

const MORE_ROW3 = [
  { category: 'INTERIOR', name: 'Luxury Penthouse', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80' },
  { category: 'RESIDENTIAL', name: 'Urban Apartments', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { category: 'COMMERCIAL', name: 'Executive Office', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
];

const FOOTER_SERVICES = [
  'Residential Construction', 'Commercial Projects',
  'Industrial Facilities', 'Interior Design', 'Renovation & Remodeling',
];

const FOOTER_COMPANY = [
  { label: 'About Us', active: false },
  { label: 'Our Projects', active: false },
  { label: 'Gallery', active: true },
  { label: 'Testimonials', active: false },
  { label: 'Careers', active: false },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

/**
 * Reusable project card with image, gradient overlay and label.
 * `labelSize` controls font size for smaller cards in the grid.
 */
function ProjectCard({ name, category, img, className = '', labelSize = 'md' }) {
  return (
    <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
        <span className="text-[#FFD700] font-bold text-[11px] tracking-widest uppercase">
          {category}
        </span>
        <span className={`text-white font-semibold ${labelSize === 'sm' ? 'text-[13px]' : 'text-[15px]'}`}>
          {name}
        </span>
      </div>
    </div>
  );
}

/** Card used in "Explore Our Full Portfolio" with category badge at bottom */
function MoreProjectCard({ category, name, img, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-sm group cursor-pointer ${className}`}>
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
        <span className="text-[#FFD700] font-bold text-[10px] tracking-[3px] uppercase">
          {category}
        </span>
        <span className="text-white font-bold text-[16px]">{name}</span>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [loadedCount, setLoadedCount] = useState(12);
  const totalProjects = 28;

  const handleLoadMore = () => {
    setLoadedCount((prev) => Math.min(prev + 8, totalProjects));
  };

  const progressPct = (loadedCount / totalProjects) * 100;

  return (
    <div className="bg-[#0A0A0A] min-h-screen font-['Inter',sans-serif]">

      {/* ── TOP INFO BAR ──────────────────────────────────────────────── */}
      <div
        className="bg-[#080808] flex items-center justify-between px-12 h-10 border-b border-[#1C1C1C]"
        style={{ minHeight: 40 }}
      >
        {/* Left: contact info */}
        <div className="flex items-center gap-5">
          <span className="text-[#888] text-[11px]">☎&nbsp; +1 (555) 234-5678</span>
          <span className="text-[#333] text-[11px]">|</span>
          <span className="text-[#888] text-[11px]">✉&nbsp; info@novasolutions.com</span>
        </div>
        {/* Right: social icons */}
        <div className="flex items-center gap-3.5">
          <span className="text-[#555] text-[11px]">Follow Us:</span>
          <Facebook size={13} className="text-[#555] cursor-pointer hover:text-[#FFD700] transition-colors" />
          <Twitter size={13} className="text-[#555] cursor-pointer hover:text-[#FFD700] transition-colors" />
          <Instagram size={13} className="text-[#555] cursor-pointer hover:text-[#FFD700] transition-colors" />
          <Linkedin size={13} className="text-[#555] cursor-pointer hover:text-[#FFD700] transition-colors" />
        </div>
      </div>

      {/* ── NAVBAR ────────────────────────────────────────────────────── */}
      <nav
        className="bg-[#111] flex items-center justify-between px-12 border-b border-[#1A1A1A]"
        style={{ height: 78 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="text-white text-[22px] font-semibold tracking-tight">NOVA</span>
          <span className="w-[7px] h-[7px] rounded-sm bg-[#FFD700] inline-block" />
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-[13px] transition-colors ${
                item === 'Gallery'
                  ? 'text-[#FFD700] font-semibold'
                  : 'text-[#AAA] hover:text-white font-normal'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA button */}
        <button className="bg-[#FFD700] text-black text-[13px] font-bold px-[22px] py-[11px] hover:bg-yellow-400 transition-colors">
          Get Free Quote
        </button>
      </nav>

      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1440&q=80"
          alt="Portfolio hero"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/33 to-black/80" />

        {/* Breadcrumb */}
        <span className="absolute top-11 left-[120px] text-[#FFD700] text-[12px]">
          Home&nbsp; ›&nbsp; Gallery
        </span>

        {/* Hero content */}
        <div className="absolute left-[120px] top-[155px] flex flex-col gap-4 max-w-[700px]">
          <h1 className="text-white text-[62px] font-bold leading-none">Our Portfolio</h1>
          <div className="w-[72px] h-[5px] bg-[#FFD700]" />
          <p className="text-[#CCC] text-[15px] leading-relaxed max-w-[580px]">
            Explore our award-winning projects in residential, commercial and industrial
            construction across the region
          </p>
        </div>
      </div>

      {/* ── FILTER BAR ────────────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] border-y border-[#1A1A1A] flex items-center justify-center gap-3 h-[72px]">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-5 py-2.5 text-[12px] transition-colors ${
              activeFilter === tab
                ? 'bg-[#FFD700] text-black font-bold'
                : 'bg-[#111] text-[#AAA] font-normal border border-[#2A2A2A] hover:border-[#FFD700] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── MAIN GALLERY GRID ─────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] p-10 px-12 flex flex-col gap-4">

        {/* Row 1: Large left + 2 stacked right */}
        <div className="flex gap-4 h-[500px]">
          <ProjectCard
            {...MAIN_GRID_ROW1.featured}
            className="flex-[2] rounded-none"
          />
          <div className="flex-1 flex flex-col gap-4">
            {MAIN_GRID_ROW1.stack.map((p) => (
              <ProjectCard key={p.name + '1'} {...p} className="flex-1 rounded-none" />
            ))}
          </div>
        </div>

        {/* Row 2: Large left + 2 stacked right */}
        <div className="flex gap-4 h-[500px]">
          <ProjectCard
            {...MAIN_GRID_ROW2.featured}
            className="flex-[2] rounded-none"
          />
          <div className="flex-1 flex flex-col gap-4">
            {MAIN_GRID_ROW2.stack.map((p) => (
              <ProjectCard key={p.name + '2'} {...p} className="flex-1 rounded-none" />
            ))}
          </div>
        </div>

        {/* Row 3: 2 big images + right mini-grid (2×3) */}
        <div className="flex gap-4 h-[500px]">
          {MAIN_GRID_ROW3.big.map((p) => (
            <ProjectCard key={p.name + p.img} {...p} className="flex-[2] rounded-none" />
          ))}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {MAIN_GRID_ROW3.grid.map((p, i) => (
              <ProjectCard key={i} {...p} className="rounded-none" labelSize="sm" />
            ))}
          </div>
        </div>

        {/* Row 4: 3 equal cards (shorter) */}
        <div className="flex gap-4 h-[300px]">
          {MAIN_GRID_ROW4.map((p) => (
            <ProjectCard key={p.name} {...p} className="flex-1 rounded-none" labelSize="sm" />
          ))}
        </div>
      </div>

      {/* ── MORE GALLERY GRID ─────────────────────────────────────────── */}
      <div className="bg-[#0A0A0A] px-[120px] py-20 flex flex-col gap-12">

        {/* Section header */}
        <div className="flex flex-col gap-4">
          <span className="text-[#FFD700] text-[13px] font-bold tracking-[3px] uppercase">
            More Projects
          </span>
          <h2 className="text-white text-[36px] font-extrabold">Explore Our Full Portfolio</h2>
          <div className="w-12 h-[3px] bg-[#FFD700] rounded-sm" />
        </div>

        {/* More row 1: 3 equal cards */}
        <div className="flex gap-4 h-[280px]">
          {MORE_ROW1.map((p) => (
            <MoreProjectCard key={p.name} {...p} className="flex-1" />
          ))}
        </div>

        {/* More row 2: 2 equal cards */}
        <div className="flex gap-4 h-[360px]">
          {MORE_ROW2.map((p) => (
            <MoreProjectCard key={p.name} {...p} className="flex-1" />
          ))}
        </div>

        {/* More row 3: 3 equal cards */}
        <div className="flex gap-4 h-[380px]">
          {MORE_ROW3.map((p) => (
            <MoreProjectCard key={p.name} {...p} className="flex-1" />
          ))}
        </div>
      </div>

      {/* ── LOAD MORE SECTION ─────────────────────────────────────────── */}
      <div className="bg-[#111] px-[120px] py-16 flex flex-col items-center gap-8">
        <p className="text-[#888] text-[14px] font-medium">
          Showing {loadedCount} of {totalProjects} Projects
        </p>

        {/* Progress bar */}
        <div className="w-[300px] h-1 bg-[#1F1F1F] rounded-sm overflow-hidden">
          <div
            className="h-full bg-[#FFD700] rounded-sm transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {loadedCount < totalProjects ? (
          <button
            onClick={handleLoadMore}
            className="border-2 border-[#FFD700] text-[#FFD700] text-[14px] font-bold px-9 py-3.5 rounded-sm tracking-[1px] hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            Load More Projects
          </button>
        ) : (
          <p className="text-[#555] text-[13px]">All projects loaded</p>
        )}
      </div>

      {/* ── CTA SECTION ───────────────────────────────────────────────── */}
      <div className="relative h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1440&q=80"
          alt="CTA background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/94 to-black/73" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-[120px]">
          <h2 className="text-white text-[44px] font-extrabold text-center">
            Ready to Build Your Vision?
          </h2>
          <div className="w-14 h-[3px] bg-[#FFD700] rounded-sm" />
          <p className="text-[#CCC] text-[16px] text-center max-w-[560px] leading-relaxed">
            Join hundreds of satisfied clients who trusted Nova Solutions with their dream projects.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#FFD700] text-black text-[15px] font-bold px-10 py-4 rounded-sm hover:bg-yellow-400 transition-colors">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white text-[15px] font-bold px-10 py-4 rounded-sm hover:bg-white hover:text-black transition-colors">
              View Our Services
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F]">

        {/* Main footer columns */}
        <div className="px-[120px] py-16 grid grid-cols-4 gap-[60px]">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-white text-[22px] font-black tracking-tight">NOVA</span>
              <span className="w-2 h-2 rounded-sm bg-[#FFD700] inline-block" />
            </div>
            <p className="text-[#888] text-[13px] leading-[1.7] max-w-[240px]">
              Building excellence through innovation and precision. Your trusted construction
              partner since 2005.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, key: 'ig' },
                { Icon: Facebook, key: 'fb' },
                { Icon: Linkedin, key: 'li' },
              ].map(({ Icon, key }) => (
                <button
                  key={key}
                  className="w-9 h-9 bg-[#1F1F1F] rounded-sm flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors group"
                >
                  <Icon size={16} className="text-[#888] group-hover:text-black" />
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-[14px] font-bold">Our Services</h4>
            <div className="w-8 h-0.5 bg-[#FFD700] rounded-sm" />
            <div className="flex flex-col gap-5">
              {FOOTER_SERVICES.map((s) => (
                <a key={s} href="#" className="text-[#888] text-[13px] hover:text-[#FFD700] transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-[14px] font-bold">Company</h4>
            <div className="w-8 h-0.5 bg-[#FFD700] rounded-sm" />
            <div className="flex flex-col gap-5">
              {FOOTER_COMPANY.map(({ label, active }) => (
                <a
                  key={label}
                  href="#"
                  className={`text-[13px] transition-colors ${
                    active ? 'text-[#FFD700] font-semibold' : 'text-[#888] hover:text-[#FFD700]'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white text-[14px] font-bold">Contact Us</h4>
            <div className="w-8 h-0.5 bg-[#FFD700] rounded-sm" />
            <div className="flex flex-col gap-5">
              {[
                { Icon: MapPin, text: '123 Builder Ave, New York, NY' },
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'info@novasolutions.com' },
                { Icon: Timer, text: 'Mon–Fri: 8:00 AM – 6:00 PM' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={14} className="text-[#FFD700] mt-0.5 shrink-0" />
                  <span className="text-[#888] text-[13px]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="bg-[#060606] border-t border-[#1F1F1F] px-[120px] py-5 flex items-center justify-between">
          <span className="text-[#555] text-[13px]">
            © 2026 Nova Solutions. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-[#555] text-[13px] hover:text-[#888] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
