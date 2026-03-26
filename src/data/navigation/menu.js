// Navigation menu data for Nova Solutions
export const headerMenu = [
    {
        name: 'Home',
        link: '/',
        showArrow: false,

    },
    {
        name: 'Roofing',
        link: '/Roofing',
        showArrow: true,
        children: [
          
            { name: 'Roof Installation', link: '/Roofing/Roof-installation' },
            { name: 'Asphalt shingle', link: '/Roofing/Asphalt-Single' },
            {
                name: 'insurance Claims', link: '/Roofing/Insurance-Claims',
                children: [
                    
                    { name: 'Roof Inspection', link: '/Roofing-Repair/Roof-Inspection' },
                    { name: 'Storm Damage', link: '/Roofing-Repair/Storm-Damage' },
                    { name: 'Hail Damage', link: '/Roofing-Repair/Hail-Damage' },
                ],
            },
            { name: 'Metal ', link: '/Roofing/Metal-Roofing' },
            { name: 'Commercial', link: '/Roofing/Commercial' },
            {
                name: 'Roof Repair',
                link: '/Roofing-Repair',
                children: [
                
                    { name: 'Roof Inspection', link: '/Roofing-Repair/Roof-Inspection' },

                ],
            },
        ],
    },
   

    {
        name: 'Siding',
        link: '/Siding',
        showArrow: true,
        children: [
    
            { name: 'Vinyl Siding', link: '/Siding/Vinyl-Siding' },
            { name: 'Siding Replacement', link: '/Siding/Siding-Replacement' },
            { name: 'fiber Cement Siding', link: '/Siding/fiber-Cement-Siding' },
        ],
    },
    {
        name: 'Gutters',
        link: '/Gutters',
        showArrow: true,
        children: [
    
            {
                name: 'Gutter Guards',
                link: '/Gutters/Gutter-Guards',
                children: [
                    { name: 'Gutter Protection', link: '/Gutters/Gutter-Guards/Gutter-Protection' },
                    { name: 'Leaf Filters', link: '/Gutters/Gutter-Guards/Leaf-Filters' },
                    { name: 'Leaf Guards', link: '/Gutters/Gutter-Guards/Leaf-Guards' },
                    { name: 'Gutter Covers', link: '/Gutters/Gutter-Guards/Gutter-Covers' },
                    { name: 'Gutter Cap', link: '/Gutters/Gutter-Guards/Gutter-Cap' },
                ],
            },
            { name: 'Gutter Replacement', link: '/Gutters/Gutter-Replacement' },
            { name: 'Gutter Repairs', link: '/Gutters/Gutter-Repairs' },
        ],
    },
     {
        name: 'Reviews',
        link: '/Reviews',
        showArrow: true,
        children: [
            { name: 'Leave a Review', link: '/Leave-Review' },
        ],
    },
    {
        name: 'About',
        link: '/About',
        showArrow: true,
        children: [{ name: 'Contact us', link: '/About/Contact-us' }],
    },
];
