import { useEffect } from 'react';
import { Box } from '@mui/material';
import ServiceHero from '@/components/sections/service/ServiceHero';
import ServiceContentSection from '@/components/sections/service/ServiceContentSection';
import ServiceTrustCards from '@/components/sections/service/ServiceTrustCards';
import ServiceRelated from '@/components/sections/service/ServiceRelated';
import ServiceExploreMore from '@/components/sections/service/ServiceExploreMore';

export default function ServicePage({ data, category = 'Services' }) {
  const { seo, hero, sections = [], related = [] } = data;

  useEffect(() => {
    if (seo?.title) document.title = seo.title;
    if (seo?.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = seo.description;
    }
    if (seo?.keywords) {
      let meta = document.querySelector('meta[name="keywords"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'keywords';
        document.head.appendChild(meta);
      }
      meta.content = seo.keywords;
    }
  }, [seo]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#0D0D0D' }}>
      <ServiceHero hero={hero} />
      {sections.map((section, i) => (
        <ServiceContentSection
          key={section.heading}
          heading={section.heading}
          body={section.body}
          image={section.image}
          imagePos={section.imagePos}
          bullets={section.bullets}
          certificates={section.certificates}
          index={i}
        />
      ))}
      <ServiceTrustCards />
      {related.length > 0 && <ServiceRelated related={related} category={category} />}
      <ServiceExploreMore />
    </Box>
  );
}
