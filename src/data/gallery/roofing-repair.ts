// Definimos las interfaces para los tipos de datos
interface RoofingRepairItem {
    id: number;
    title: string;
    description: string;
    alt: string;
    image: string;
    date: string;
  }
  
  interface RoofingRepairGallery {
    title: string;
    items: RoofingRepairItem[];
  }
  
  // Ahora representamos los datos como un arreglo de objetos de tipo RoofingRepairGallery
  const roofingRepairGallery: RoofingRepairGallery[] = [
    {
      title: "Roofing Repair Gallery",
      items: [
        {
          id: 1,
          title: "Roofing Repair 1",
          description: "A detailed roofing repair project completed in 2023.",
          alt: "Roofing Repair 1",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg",
          date: "2023-03-15",
        },
        {
          id: 2,
          title: "Roofing Repair 2",
          description: "A critical roofing repair completed in 2022.",
          alt: "Roofing Repair 2",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744406636/banner2_pilov2.jpg",
          date: "2022-06-18",
        },
        {
          id: 3,
          title: "Roofing Repair 3",
          description: "An emergency roofing repair completed in 2021.",
          alt: "Roofing Repair 3",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744252247/banner1_akffxu.jpg",
          date: "2021-09-20",
        },
        {
          id: 4,
          title: "Roofing Repair 4",
          description: "A comprehensive roofing repair project completed in 2020.",
          alt: "Roofing Repair 4",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1745560117/20240826_135948_sdecgt.jpg",
          date: "2020-12-10",
        },
        {
          id: 5,
          title: "Roofing Repair 5",
          description: "A quick roofing repair project completed in 2019.",
          alt: "Roofing Repair 5",
          image: "https://res.cloudinary.com/driyxelzh/image/upload/v1744735272/Dynamic-Restoration-Mitigation-Services_bhbqva.jpg",
          date: "2019-04-25",
        },
      ],
    },
  ];
  
  export default roofingRepairGallery;