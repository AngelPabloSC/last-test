import { useState, useEffect } from 'react'
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  Shield,
  Circle,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const TOC_LINKS = [
  { id: 'privacy-policy',      label: 'Privacy Policy' },
  { id: 'data-collection',     label: 'Data Collection' },
  { id: 'safety-privacy',      label: 'Safety & Privacy' },
  { id: 'cookies',             label: 'Cookies' },
  { id: 'third-party',         label: 'Third Party Sites' },
  { id: 'amendments',          label: 'Amendments' },
  { id: 'contact-info',        label: 'Contact Information' },
]

const NUMBERED_ITEMS = [
  {
    number: '1.',
    title: 'Information We Collect',
    text: 'We collect information you provide directly to us, such as when you request a quote, contact us for support, or otherwise communicate with us. This includes your name, email address, phone number, and home address for service estimates.',
  },
  {
    number: '2.',
    title: 'How We Use Your Information',
    text: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.',
  },
  {
    number: '3.',
    title: 'Information Sharing',
    text: 'We do not share your personal information with third parties except as described in this policy. We may share your information with vendors and service providers who assist in our operations and service delivery.',
  },
  {
    number: '4.',
    title: 'Data Retention',
    text: 'We retain your information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. You may request deletion of your data at any time.',
  },
  {
    number: '5.',
    title: 'Your Rights',
    text: 'You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the unsubscribe instructions included in those messages.',
  },
  {
    number: '6.',
    title: 'Security Measures',
    text: 'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no security system is impenetrable.',
  },
]

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Roofing', 'Roof Repair', 'Siding', 'Gutters', 'Reviews', 'About']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-[#0A0A0A]'
      } border-b border-[#1F1F1F]`}
    >
      <div className="max-w-[1440px] mx-auto px-20 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#FFD700] flex items-center justify-center">
            <span className="text-[#0A0A0A] font-black text-xs leading-none">NS</span>
          </div>
          <span className="text-white font-bold text-sm tracking-wide uppercase">
            Nova Solutions
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#9CA3AF] text-sm font-medium hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#"
          className="h-9 px-5 bg-[#FFD700] text-[#0A0A0A] text-sm font-bold rounded-lg flex items-center hover:bg-[#FFC200] transition-colors"
        >
          Get a Quote
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-[#0A0A0A] border-b border-[#1F1F1F]">
      <div className="max-w-[1440px] mx-auto px-20 py-16 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <a href="#" className="text-[#6B7280] text-sm hover:text-white transition-colors">
            Home
          </a>
          <ChevronRight size={14} className="text-[#3F3F3F]" />
          <span className="text-white text-sm">Privacy Policy & Terms</span>
        </div>

        {/* Title */}
        <h1 className="text-white text-[52px] font-black leading-tight mb-3">
          Privacy Policy & Terms
        </h1>

        {/* Yellow accent */}
        <div className="w-10 h-[3px] rounded-full bg-[#FFD700] mb-5" />

        {/* Subtitle */}
        <p className="text-[#9CA3AF] text-base leading-relaxed max-w-xl">
          Learn how Nova Solutions collects, uses, and protects your personal information when you use our services.
        </p>
      </div>
    </section>
  )
}

// ─── Sidebar TOC ──────────────────────────────────────────────────────────────
function Sidebar({ activeSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside className="w-[200px] flex-shrink-0">
      <div className="sticky top-24 flex flex-col gap-0">
        {/* Label */}
        <p className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest mb-3">
          Contents
        </p>

        {/* Divider */}
        <div className="h-px bg-[#1F1F1F] mb-3" />

        {/* Yellow accent dot */}
        <div className="w-px h-2 bg-[#FFD700] mb-4 ml-0.5" />

        {/* Links */}
        <nav className="flex flex-col gap-0.5">
          {TOC_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-left text-sm py-2 pl-3 border-l-2 transition-all ${
                activeSection === id
                  ? 'border-[#FFD700] text-[#FFD700] font-semibold'
                  : 'border-transparent text-[#6B7280] hover:text-white hover:border-[#3F3F3F]'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Contact box */}
        <div className="mt-8 p-4 bg-[#111111] border border-[#1F1F1F] rounded-xl flex flex-col gap-3">
          <p className="text-white text-xs font-semibold">Questions?</p>
          <p className="text-[#6B7280] text-xs leading-relaxed">
            Contact our team if you have any concerns about your privacy.
          </p>
          <a
            href="mailto:privacy@novasolutions.com"
            className="text-[#FFD700] text-xs font-semibold flex items-center gap-1.5 hover:underline"
          >
            <Mail size={11} />
            privacy@novasolutions.com
          </a>
        </div>
      </div>
    </aside>
  )
}

// ─── Section Block ────────────────────────────────────────────────────────────
function SectionBlock({ id, title, children }) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-28">
      <div className="flex items-center gap-3">
        <div className="w-0.5 h-5 rounded-sm bg-[#FFD700]" />
        <h2 className="text-white text-xl font-bold">{title}</h2>
      </div>
      <div className="flex flex-col gap-3 text-[#9CA3AF] text-[15px] leading-[1.8]">
        {children}
      </div>
    </section>
  )
}

// ─── Numbered Item ────────────────────────────────────────────────────────────
function NumberedItem({ number, title, text }) {
  return (
    <div className="flex gap-5 p-6 bg-[#111111] border border-[#1F1F1F] rounded-xl hover:border-[#2A2A2A] transition-colors">
      <span className="text-[#FFD700] font-black text-lg leading-tight flex-shrink-0 w-6">
        {number}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

// ─── Main Content ─────────────────────────────────────────────────────────────
function MainContent() {
  return (
    <div className="flex flex-col gap-14">

      {/* 1. Privacy Policy */}
      <SectionBlock id="privacy-policy" title="Privacy Policy">
        <p>
          Nova Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our home improvement services.
        </p>
        <p>
          Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes to this policy at any time and for any reason. We will alert you about changes by updating the "Last Updated" date of this policy.
        </p>
        <p>
          This policy does not apply to the third-party online/mobile store from which you install our application or make payments, including any in-game virtual items, which may also collect and use data about you.
        </p>
      </SectionBlock>

      {/* 2. Your Privacy Matters */}
      <SectionBlock id="data-collection" title="Your Privacy Matters">
        <p>
          We collect information that you voluntarily provide to us when you request a service estimate, register for an account, express an interest in obtaining information about us or our products and services, or otherwise contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the services you use. The personal information we collect may include the following: name, phone number, email address, mailing address, job title, and service preferences.
        </p>
        <p>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </p>
        <p>
          We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, and other technical information.
        </p>
      </SectionBlock>

      {/* 3. Safety & Privacy */}
      <SectionBlock id="safety-privacy" title="Safety & Privacy">
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
        </p>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this policy will require us to keep your personal information for longer than 2 years.
        </p>
        <p>
          When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible, then we will securely store your personal information and isolate it from any further processing until deletion is possible.
        </p>
      </SectionBlock>

      {/* 4. Cookies */}
      <SectionBlock id="cookies" title="Cookies">
        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
        </p>
        <ul className="flex flex-col gap-2 pl-4">
          {[
            'Essential cookies – necessary for the website to function properly.',
            'Performance cookies – help us understand how visitors interact with our website.',
            'Functional cookies – remember your preferences and settings.',
            'Targeting cookies – used to deliver relevant advertisements.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Circle size={5} className="text-[#FFD700] flex-shrink-0 mt-2" fill="#FFD700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, please note that some parts of this site may become inaccessible or not function properly.
        </p>
      </SectionBlock>

      {/* 5. Third Party Sites */}
      <SectionBlock id="third-party" title="Third Party Sites">
        <p>
          Our website may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
        </p>
        <p>
          When you leave our website, we encourage you to read the privacy policy of every website you visit. We use the following third-party services that may collect information about your use of our services: Google Analytics, Google Maps API, and payment processors.
        </p>
      </SectionBlock>

      {/* 6. Amendments */}
      <SectionBlock id="amendments" title="Amendments to This Policy">
        <p>
          We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
        </p>
        <p>
          If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
        </p>

        {/* Divider with label */}
        <div className="flex items-center gap-4 my-4">
          <div className="h-px flex-1 bg-[#1F1F1F]" />
          <span className="text-[#4B5563] text-xs uppercase tracking-widest">Details</span>
          <div className="h-px flex-1 bg-[#1F1F1F]" />
        </div>

        {/* Numbered items */}
        <div className="flex flex-col gap-3 mt-2">
          {NUMBERED_ITEMS.map((item) => (
            <NumberedItem key={item.number} {...item} />
          ))}
        </div>
      </SectionBlock>

      {/* 7. Contact Information */}
      <SectionBlock id="contact-info" title="Contact Information">
        <p>
          If you have questions or comments about this policy, you may contact our Data Privacy Officer by email at{' '}
          <a href="mailto:privacy@novasolutions.com" className="text-[#FFD700] hover:underline">
            privacy@novasolutions.com
          </a>
          , or by post to:
        </p>
        <div className="p-5 bg-[#111111] border border-[#1F1F1F] rounded-xl flex flex-col gap-1.5 text-sm">
          <p className="text-white font-semibold">Nova Solutions</p>
          <p className="text-[#9CA3AF]">Attn: Data Privacy Officer</p>
          <p className="text-[#9CA3AF]">Capital Region, New York</p>
          <a href="tel:+15185550196" className="text-[#FFD700] hover:underline mt-1 flex items-center gap-2">
            <Phone size={13} />
            +1 (518) 555-0196
          </a>
        </div>
        <p className="text-[#6B7280] text-sm italic">
          Last Updated: December 12, 2024
        </p>
      </SectionBlock>

    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] mt-20">
      <div className="max-w-[1440px] mx-auto px-20 flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
          <span className="text-[#6B7280] text-sm">
            © 2024 Nova Solutions. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Sitemap', href: '#' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[#4B5563] text-sm hover:text-[#9CA3AF] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Active Section Hook ──────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })

    return () => observers.forEach((obs) => obs?.disconnect())
  }, [ids])

  return active
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPrivacyPage() {
  const activeSection = useActiveSection(TOC_LINKS.map((t) => t.id))

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-[Inter,sans-serif]">
      <Navbar />
      <Hero />

      {/* Two-column layout */}
      <div className="max-w-[1440px] mx-auto px-20 py-20">
        <div className="flex gap-20">
          <Sidebar activeSection={activeSection} />
          <main className="flex-1 min-w-0">
            <MainContent />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
