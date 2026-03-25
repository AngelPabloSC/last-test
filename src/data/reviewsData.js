export const TRUST_ITEMS = [
  'Trusted Home Experts',
  'Reliable Installations',
  'Local Remodelers',
  'BBB Accredited',
];

export const STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '5+', label: 'Years of Excellence' },
  { value: '4.5/5', label: 'Average Rating' },
  { value: '100%', label: 'Satisfaction Rate' },
];

export const REVIEW_FILTERS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'roof', label: 'Roofing' },
  { id: 'siding', label: 'Siding' },
  { id: 'gutter', label: 'Gutters' },
  { id: 'storm', label: 'Storm Damage' },
];

export const REVIEWS = [
  {
    id: 1, name: 'Michael R.', location: 'Albany, NY', service: 'Roofing', rating: 5, date: '2 weeks ago',
    text: '"Nova Solutions did an outstanding job replacing our entire roof. The crew arrived on time every day, kept the job site clean, and finished ahead of schedule. The quality of materials and workmanship is top-notch. Our new roof looks absolutely amazing and we couldn\'t be happier!"',
    featured: true, category: 'roof',
  },
  {
    id: 2, name: 'Jennifer M.', location: 'Troy, NY', service: 'Siding', rating: 5, date: '1 month ago',
    text: '"Had our entire home re-sided and it looks brand new. Professional team, clean work, and excellent communication throughout the project. Would highly recommend Nova Solutions to anyone looking for quality exterior work."',
    featured: false, category: 'siding',
  },
  {
    id: 3, name: 'Robert K.', location: 'Schenectady, NY', service: 'Gutters', rating: 5, date: '3 weeks ago',
    text: '"Got new gutters installed and the difference is night and day. Water no longer pools near the foundation. The team was fast, professional, and left the property spotless. Great experience from start to finish."',
    featured: false, category: 'gutter',
  },
  {
    id: 4, name: 'Patricia L.', location: 'Saratoga, NY', service: 'Storm Damage', rating: 5, date: '5 weeks ago',
    text: '"After a severe storm damaged our roof, Nova Solutions responded quickly and handled everything from the insurance claim to the final repair. Stress-free process and excellent results. Truly a company that cares."',
    featured: false, category: 'storm',
  },
  {
    id: 5, name: 'David H.', location: 'Clifton Park, NY', service: 'Roofing', rating: 5, date: '2 months ago',
    text: '"Best contractor experience we\'ve ever had. Fair pricing, transparent communication, and the crew treated our home like it was their own. The new roof adds so much curb appeal to the house."',
    featured: false, category: 'roof',
  },
  {
    id: 6, name: 'Susan T.', location: 'Latham, NY', service: 'Siding', rating: 5, date: '6 weeks ago',
    text: '"From the initial consultation to the final walkthrough, everything was handled professionally. The siding looks incredible and the color consultation was a great added touch. Neighbors keep asking who did the work!"',
    featured: false, category: 'siding',
  },
];

export const GOOGLE_REVIEWS = [
  {
    id: 'g1', initial: 'S', avatarColor: '#4285F4', name: 'Sarah M.', date: '3 weeks ago', rating: 5,
    text: '"Nova Solutions transformed our entire home exterior. From the initial consultation to the final walkthrough, every step was professional and transparent. Our new roof, siding, and gutters look absolutely incredible. The team was on time, clean, and communication was outstanding. 10/10 would recommend to anyone!"',
  },
  {
    id: 'g2', initial: 'J', avatarColor: '#EA4335', name: 'James K.', date: '1 month ago', rating: 5,
    text: '"Exceptional craftsmanship on our roof replacement. They finished 2 days ahead of schedule and the cleanup was spotless. Highly recommend Nova Solutions!"',
  },
  {
    id: 'g3', initial: 'M', avatarColor: '#34A853', name: 'Maria L.', date: '2 months ago', rating: 5,
    text: '"Our gutters and siding look brand new. The crew was respectful of our property and left everything cleaner than they found it. Best contractor we have ever hired."',
  },
  {
    id: 'g4', initial: 'R', avatarColor: '#FBBC05', name: 'Robert T.', date: '6 weeks ago', rating: 5,
    text: '"Fast, reliable, and honest. Got 3 quotes and Nova was not the cheapest but definitely the best value. The quality of materials and workmanship is outstanding."',
  },
  {
    id: 'g5', initial: 'A', avatarColor: '#4285F4', name: 'Amanda R.', date: '4 months ago', rating: 5,
    text: '"We had our entire roof replaced after storm damage and Nova Solutions handled everything from insurance claim to final inspection. Stress-free process, beautiful result, and the crew was incredibly professional throughout."',
  },
  {
    id: 'g6', initial: 'D', avatarColor: '#EA4335', name: 'David C.', date: '5 weeks ago', rating: 5,
    text: '"From the moment they arrived to the last nail, everything was handled with care. The siding installation is flawless and the color consultation helped us pick the perfect match. Neighbors keep asking who did it!"',
  },
];

export const PLATFORMS = [
  { name: 'Google', rating: '4.8', reviews: '247 reviews', color: '#4285F4', badge: 'Top Rated' },
  { name: 'BBB', rating: 'A+', reviews: 'Accredited Business', color: '#00599C', badge: 'Accredited' },
  { name: 'HomeAdvisor', rating: '4.9', reviews: '189 reviews', color: '#F5821F', badge: 'Elite Service' },
];
