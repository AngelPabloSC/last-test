// Definimos las interfaces para los tipos de datos
interface WindowsItem {
    id: number;
    title: string;
    description: string;
    alt: string;
    image: string;
    date: string;
  }
  
  interface WindowsGallery {
    title: string;
    items: WindowsItem[];
  }
  
  // Ahora representamos los datos como un arreglo de objetos de tipo WindowsGallery
  const windowsGallery: WindowsGallery[] = [
    {
      title: "Windows Gallery",
      items: [
        {
          id: 1,
          title: "Window Project 1",
          description: "A beautiful window installation project completed in 2023.",
          alt: "Window Project 1",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg",
          date: "2023-03-15",
        },
        {
          id: 2,
          title: "Window Project 2",
          description: "A modern window replacement project completed in 2022.",
          alt: "Window Project 2",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744406636/banner2_pilov2.jpg",
          date: "2022-08-25",
        },
        {
          id: 3,
          title: "Window Project 3",
          description: "An energy-efficient window installation project completed in 2021.",
          alt: "Window Project 3",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744252247/banner1_akffxu.jpg",
          date: "2021-06-10",
        },
        {
          id: 4,
          title: "Window Project 4",
          description: "A custom window design project completed in 2020.",
          alt: "Window Project 4",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1745560117/20240826_135948_sdecgt.jpg",
          date: "2020-12-05",
        },
        {
          id: 5,
          title: "Window Project 5",
          description: "A premium window project completed in 2019.",
          alt: "Window Project 5",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744735272/Dynamic-Restoration-Mitigation-Services_bhbqva.jpg",
          date: "2019-04-17",
        },
      ],
    },
  ];
  
  export default windowsGallery;