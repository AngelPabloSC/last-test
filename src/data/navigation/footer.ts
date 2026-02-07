export const footer: (
    | { type: 'contact'; tile: string; number: string; direction: string }
    | { type: 'offices'; tile: string; offices: { direction: string; link: string }[] }
    | { type: 'section'; title: string; icon: string; services: { name: string; link: string }[] }
  )[] = [
    {
      type: 'contact',
      tile: 'Roofing',
      number: '+1 518-598-5156',
      direction: ""
    },
    // {
    //   type: 'offices',
    //   tile: 'OFFICES',
    //   offices: [
    //     { direction: "Owensboro, KY", link: "" },
    //   ]
    // },
    {
      type: 'section',
      title: 'Roofing',
      icon: "",
      services: [

        { name: 'Roff Installation', link: '/Roofing/Roof-installation' },
        { name: 'Asphalt shingle', link: '/Roofing/Asphalt-Single' },
        { name: 'insurance Claims', link: '/Roofing/Insurance-Claims' },
        { name: 'Metal Roofing', link: '/Roofing/Metal-Roofing' },
        { name: 'Commercial', link: '/Roofing/Commercial' },
      ]
    },
    {
      type: 'section',
      title: 'Roof Repair',
      icon: "",
      services: [
        { name: 'Roff Inspection', link: '/Roofing-Repair/Roof-Inspection' },
        { name: 'Storm Damage', link: '/Roofing-Repair/Storm-Damage' },
        { name: 'Hail Damage', link: '/Roofing-Repair/Hail-Damage' },
        { name: 'Roof Leak', link: '/Roofing-Repair/Roof-Leak' },
      ]
    },
    {
      type: 'section',
      title: 'Services',
      icon: "",
      services: [
        { name: "Roofing", link: "/Roofing" },
        { name: "Roof Repair'", link: "Roofing-Repair" },
        { name: "Siding", link: "/Siding" },
        { name: "Gutters", link: "/Gutters" },
    
      ]
    },
    {
      type: 'section',
      title: 'Company',
      icon: "",
      services: [
        { name: "About", link: "/About" },
        { name: "Contact us", link: "/About/Contact-us" },
        { name: "Gallery", link: "/About/Gallery" },
      ]
    },
  ];