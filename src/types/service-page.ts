export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ListItem {
  title: string;
  description: string;
}

export interface ContentSection {
  heading: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  list?: ListItem[];
}

export interface HeroSection {
  heading: string;
  content: string;
  showCertificates?: boolean;
}

export interface RelatedService {
  title: string;
  services: Array<{
    title: string;
    path: string;
    icon: string;
  }>;
}

export interface ServicePageData {
  // SEO Meta
  title: string;
  description: string;
  keywords?: string;
  
  // Page Header
  sectionInfoHeading: string;
  breadcrumbs: BreadcrumbItem[];
  
  // Hero Section
  hero: HeroSection;
  
  // Content Sections
  sections: ContentSection[];
  
  // Related Services
  relatedServices?: RelatedService;
  
  // Show common components
  showTrustOur?: boolean;
  showMoreServices?: boolean;
}
