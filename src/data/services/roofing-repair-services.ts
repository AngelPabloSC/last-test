import type { ServicePageData } from "../../types/service-page";
import { LinkServicesRoofingRepair } from "./roofing-repair";

export const hailDamageData: ServicePageData = {
  title: "Hail Damage Roof Repair Capital Region | Emergency Service - Nova Solutions",
  description: "Expert hail damage roof repair in Albany. Nova Solutions provides fast, professional storm damage assessment and repair. Insurance claims assistance available!",
  keywords: "hail damage, roof repair, storm damage, Albany, Nova Solutions",
  
  sectionInfoHeading: "Hail Damage Repair",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Roofing Repair", href: "/Roofing-Repair" },
    { label: "Hail Damage" }
  ],
  
  hero: {
    heading: "Expert Hail Damage Roof Repair in Albany",
    content: `Hail storms can cause serious damage to your roof. At <strong>Nova Solutions</strong>, we specialize in hail damage assessment and repair. Our experienced team works with your insurance company to ensure your roof is restored quickly and properly.`,
    showCertificates: true
  },
  
  sections: [
    {
      heading: "Professional Hail Damage Assessment",
      content: `Our certified inspectors identify all hail damage, document it thoroughly for insurance claims, and provide expert repair services. We handle everything from minor repairs to complete roof replacement, ensuring your Albany home is protected.`,
      image: "https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg",
      imageAlt: "Hail Damage Repair",
      imagePosition: "right"
    }
  ],
  
  relatedServices: {
    title: "Related Roofing Repair Services",
    services: LinkServicesRoofingRepair.map(s => ({ name: s.title, href: s.path }))
  },
  
  showTrustOur: true,
  showMoreServices: true
};

export const roofInspectionData: ServicePageData = {
  title: "Professional Roof Inspection Albany | Free Estimates - Nova Solutions",
  description: "Get a thorough roof inspection in Albany from Nova Solutions. Our certified inspectors identify problems early. Free estimates available!",
  keywords: "roof inspection, roof assessment, Albany, Nova Solutions",
  
  sectionInfoHeading: "Roof Inspection",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Roofing Repair", href: "/Roofing-Repair" },
    { label: "Roof Inspection" }
  ],
  
  hero: {
    heading: "Comprehensive Roof Inspections in Albany",
    content: `Protect your investment with professional roof inspections from <strong>Nova Solutions</strong>. Our certified inspectors thoroughly examine your roof, identify potential problems, and provide detailed reports with recommendations.`,
    showCertificates: true
  },
  
  sections: [
    {
      heading: "Why Regular Roof Inspections Matter",
      content: `Regular inspections catch small problems before they become expensive repairs. Our Albany roof inspection service includes checking for leaks, damaged shingles, flashing issues, and more. We provide honest assessments and fair pricing.`,
      image: "https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg",
      imageAlt: "Roof Inspection",
      imagePosition: "right"
    }
  ],
  
  relatedServices: {
    title: "Related Roofing Repair Services",
    services: LinkServicesRoofingRepair.map(s => ({ name: s.title, href: s.path }))
  },
  
  showTrustOur: true,
  showMoreServices: true
};

export const roofLeakData: ServicePageData = {
  title: "Roof Leak Repair Albany | Emergency Service - Nova Solutions",
  description: "Fast roof leak repair in Albany. Nova Solutions provides emergency leak detection and repair services. Available 24/7 for urgent repairs!",
  keywords: "roof leak, leak repair, emergency roofing, Albany, Nova Solutions",
  
  sectionInfoHeading: "Roof Leak Repair",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Roofing Repair", href: "/Roofing-Repair" },
    { label: "Roof Leak" }
  ],
  
  hero: {
    heading: "Fast, Reliable Roof Leak Repair in Albany",
    content: `Don't let a roof leak damage your home. <strong>Nova Solutions</strong> provides fast, professional roof leak detection and repair services in Albany. Our experienced team finds the source and fixes it right the first time.`,
    showCertificates: true
  },
  
  sections: [
    {
      heading: "Expert Leak Detection and Repair",
      content: `Roof leaks can be tricky to find and fix. Our Albany roofing experts use advanced techniques to locate leaks and provide lasting repairs. We work quickly to prevent water damage to your home's interior.`,
      image: "https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg",
      imageAlt: "Roof Leak Repair",
      imagePosition: "right"
    }
  ],
  
  relatedServices: {
    title: "Related Roofing Repair Services",
    services: LinkServicesRoofingRepair.map(s => ({ name: s.title, href: s.path }))
  },
  
  showTrustOur: true,
  showMoreServices: true
};

export const stormDamageData: ServicePageData = {
  title: "Storm Damage Roof Repair Albany | Insurance Claims - Nova Solutions",
  description: "Expert storm damage roof repair in Albany. Nova Solutions handles wind, hail, and weather damage. We work with insurance companies. Call now!",
  keywords: "storm damage, roof repair, wind damage, Albany, Nova Solutions",
  
  sectionInfoHeading: "Storm Damage Repair",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Roofing Repair", href: "/Roofing-Repair" },
    { label: "Storm Damage" }
  ],
  
  hero: {
    heading: "Professional Storm Damage Roof Repair in Albany",
    content: `Albany weather can be harsh on roofs. <strong>Nova Solutions</strong> specializes in storm damage repair, from wind-blown shingles to hail damage. We work directly with your insurance company to make the process smooth and stress-free.`,
    showCertificates: true
  },
  
  sections: [
    {
      heading: "Complete Storm Damage Restoration",
      content: `Our storm damage experts assess all damage, document it for insurance, and restore your roof to perfect condition. We handle everything from emergency tarping to complete roof replacement, protecting your Albany home.`,
      image: "https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg",
      imageAlt: "Storm Damage Repair",
      imagePosition: "right"
    }
  ],
  
  relatedServices: {
    title: "Related Roofing Repair Services",
    services: LinkServicesRoofingRepair.map(s => ({ name: s.title, href: s.path }))
  },
  
  showTrustOur: true,
  showMoreServices: true
};

export const roofingRepairIndexData: ServicePageData = {
  title: "Roof Repair Services in Albany - Nova Solutions",
  description: "Expert roof repair in Albany. Nova Solutions handles leaks, storm damage, hail damage, and all roofing repairs. Fast service, quality workmanship. Call now!",
  keywords: "roof repair, roof leak, storm damage, hail damage, Albany, Nova Solutions",
  
  sectionInfoHeading: "Roof Repair Services",
  
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Roofing Repair" }
  ],
  
  hero: {
    heading: "Expert Roof Repair Services in Albany",
    content: `When your roof needs repair, trust <strong>Nova Solutions</strong> for fast, professional service. We handle everything from minor leaks to major storm damage. Our experienced team provides honest assessments and quality repairs that last.`,
    showCertificates: true
  },
  
  sections: [
    {
      heading: "Complete Roof Repair Solutions",
      content: `Our Albany roof repair services include leak detection and repair, storm damage restoration, hail damage assessment, emergency repairs, and preventive maintenance. We work with your insurance company and provide transparent pricing. Trust our certified roofing experts to protect your home.`,
      image: "https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg",
      imageAlt: "Roof Repair",
      imagePosition: "right"
    }
  ],
  
  relatedServices: {
    title: "Related Roofing Repair Services",
    services: LinkServicesRoofingRepair.map(s => ({ name: s.title, href: s.path }))
  },
  
  showTrustOur: true,
  showMoreServices: true
};
