// Definimos las interfaces para los tipos de datos
interface SidingItem {
    id: number;
    title: string;
    description: string;
    alt: string;
    image: string;
    date: string;
  }
  
  interface SidingGallery {
    title: string;
    items: SidingItem[];
  }
  
  // Ahora representamos los datos como un arreglo de objetos de tipo SidingGallery
  const sidingGallery: SidingGallery[] = [
    {
      title: "Siding Gallery",
      items: [
        {
          id: 1,
          title: "Siding Project 1",
          description: "A beautiful siding project completed in 2023.",
          alt: "Siding Project 1",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg",
          date: "2023-02-15",
        },
        {
          id: 2,
          title: "Siding Project 2",
          description: "A modern siding installation project completed in 2022.",
          alt: "Siding Project 2",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744406636/banner2_pilov2.jpg",
          date: "2022-07-30",
        },
        {
          id: 3,
          title: "Siding Project 3",
          description: "An eco-friendly siding project completed in 2021.",
          alt: "Siding Project 3",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744252247/banner1_akffxu.jpg",
          date: "2021-11-18",
        },
        {
          id: 4,
          title: "Siding Project 4",
          description: "A durable siding project completed in 2020.",
          alt: "Siding Project 4",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1745560117/20240826_135948_sdecgt.jpg",
          date: "2020-09-15",
        },
        {
          id: 5,
          title: "Siding Project 5",
          description: "A stylish siding project completed in 2019.",
          alt: "Siding Project 5",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744735272/Dynamic-Restoration-Mitigation-Services_bhbqva.jpg",
          date: "2019-05-10",
        },
      ],
    },
  ];
  
  export default sidingGallery;