// Definimos las interfaces para los tipos de datos
interface GuttersItem {
    id: number;
    title: string;
    description: string;
    alt: string;
    image: string;
    date: string;
  }
  
  interface GuttersGallery {
    title: string;
    items: GuttersItem[];
  }
  
  // Ahora representamos los datos como un arreglo de objetos de tipo GuttersGallery
  const guttersGallery: GuttersGallery[] = [
    {
      title: "Gutters Gallery",
      items: [
        {
          id: 1,
          title: "Gutters Project 1",
          description: "A seamless gutters installation project completed in 2023.",
          alt: "Gutters Project 1",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg",
          date: "2023-04-20",
        },
        {
          id: 2,
          title: "Gutters Project 2",
          description: "A custom gutters replacement project completed in 2022.",
          alt: "Gutters Project 2",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744406636/banner2_pilov2.jpg",
          date: "2022-07-15",
        },
        {
          id: 3,
          title: "Gutters Project 3",
          description: "An efficient gutters cleaning and installation project completed in 2021.",
          alt: "Gutters Project 3",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744252247/banner1_akffxu.jpg",
          date: "2021-09-30",
        },
        {
          id: 4,
          title: "Gutters Project 4",
          description: "A high-quality gutters installation project completed in 2020.",
          alt: "Gutters Project 4",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1745560117/20240826_135948_sdecgt.jpg",
          date: "2020-06-18",
        },
        {
          id: 5,
          title: "Gutters Project 5",
          description: "A premium gutters installation project completed in 2019.",
          alt: "Gutters Project 5",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744735272/Dynamic-Restoration-Mitigation-Services_bhbqva.jpg",
          date: "2019-05-12",
        },
      ],
    },
  ];
  
  export default guttersGallery;