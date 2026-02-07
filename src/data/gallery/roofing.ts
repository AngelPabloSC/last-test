// Definimos las interfaces para los tipos de datos
interface RoofingProjectItem {
    id: number;
    title: string;
    description: string;
    alt: string;
    image: string;
    date: string;
  }
  
  interface RoofingGallery {
    title: string;
    items: RoofingProjectItem[];
  }
  
  // Ahora representamos los datos como un arreglo de objetos de tipo RoofingGallery
  const roofingGallery: RoofingGallery[] = [
    {
      title: "Roofing Gallery",
      items: [
        {
          id: 1,
          title: "Roofing Project 1",
          description: "A beautiful roofing project completed in 2023.",
          alt: "Roofing Project 1",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg",
          date: "2023-01-15",
        },
        {
          id: 2,
          title: "Roofing Project 2",
          description: "A stunning roofing project completed in 2022.",
          alt: "Roofing Project 2",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744406636/banner2_pilov2.jpg",
          date: "2022-05-20",
        },
        {
          id: 3,
          title: "Roofing Project 3",
          description: "An impressive roofing project completed in 2021.",
          alt: "Roofing Project 3",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744252247/banner1_akffxu.jpg",
          date: "2021-08-10",
        },
        {
          id: 4,
          title: "Roofing Project 4",
          description: "A remarkable roofing project completed in 2020.",
          alt: "Roofing Project 4",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1745560117/20240826_135948_sdecgt.jpg",
          date: "2020-11-25",
        },
        {
          id: 5,
          title: "Roofing Project 5",
          description: "A fantastic roofing project completed in 2019.",
          alt: "Roofing Project 5",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744735272/Dynamic-Restoration-Mitigation-Services_bhbqva.jpg",
          date: "2019-03-30",
        },
      ],
    },
  ];
  
  export default roofingGallery;