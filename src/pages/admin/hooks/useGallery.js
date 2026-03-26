import { useState, useEffect, useCallback } from 'react';

// Mock data based on the provided GalleryPage.jsx model
const MOCK_GALLERY = [
  { id: 1, name: 'Skyline Tower Complex', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', featured: true, visible: true },
  { id: 2, name: 'Riverside Residences', category: 'Residential', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80', featured: false, visible: true },
  { id: 3, name: 'Metro Industrial Park', category: 'Industrial', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', featured: false, visible: true },
  { id: 4, name: 'Heritage Loft Conversion', category: 'Interior Design', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', featured: true, visible: true },
  { id: 5, name: 'Harbor Bridge Plaza', category: 'Commercial', img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80', featured: false, visible: true },
  { id: 6, name: 'Green Meadows Estate', category: 'Residential', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', featured: false, visible: false },
  { id: 7, name: 'Tech Campus Hub', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', featured: false, visible: true },
  { id: 8, name: 'Hillside Villa', category: 'Residential', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', featured: true, visible: true },
];

export const useGallery = ({ status = 'all', search = '' } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      let filtered = [...MOCK_GALLERY];

      // Filter by category
      if (status !== 'all') {
        const categoryMap = {
          'new': 'New',
          'residential': 'Residential',
          'commercial': 'Commercial',
          'industrial': 'Industrial',
          'interior': 'Interior Design',
        };
        const targetCategory = categoryMap[status] || status;
        filtered = filtered.filter(item => item.category.toLowerCase().includes(targetCategory.toLowerCase()));
      }

      // Filter by search
      if (search) {
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      setData(filtered);
      
      // Generate summary for metrics
      const categories = ['Residential', 'Commercial', 'Industrial', 'Interior Design'];
      const summaryData = categories.map(cat => ({
        status: cat,
        count: MOCK_GALLERY.filter(item => item.category === cat).length
      }));
      summaryData.push({ status: 'Total', count: MOCK_GALLERY.length });
      summaryData.push({ status: 'Visible', count: MOCK_GALLERY.filter(i => i.visible).length });
      
      setSummary(summaryData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [status, search]);

  const refreshGallery = useCallback(() => {
    setLoading(true);
    // Logic to re-fetch
  }, []);

  const deleteProject = useCallback(async (id) => {
    // Mock delete logic
    console.log('Mock Delete:', id);
    return { code: 'OK', message: 'Project deleted successfully' };
  }, []);

  const saveProject = useCallback(async (projectData) => {
    // Mock save logic
    console.log('Mock Create Project:', projectData);
    return { code: 'OK', message: 'Project created successfully', data: { ...projectData, id: Math.floor(Math.random() * 1000) } };
  }, []);

  const updateProject = useCallback(async (id, projectData) => {
    // Mock update logic
    console.log('Mock Update Project:', id, projectData);
    return { code: 'OK', message: 'Project updated successfully', data: { ...projectData, id } };
  }, []);

  const getProjectById = useCallback((id) => {
    return MOCK_GALLERY.find(p => String(p.id) === String(id));
  }, []);

  return {
    galleryData: { data, summary },
    loading,
    refreshGallery,
    deleteProject,
    saveProject,
    updateProject,
    getProjectById
  };
};
