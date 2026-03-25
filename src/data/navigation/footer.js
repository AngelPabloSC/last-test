// Footer data structure
export const footer = [
    {
        type: 'contact',
        tile: 'Contact Us',
        number: '+1 518-598-5156',
        direction: '520 Warren St, Albany NY',
    },
    {
        type: 'offices',
        tile: 'Our Offices',
        offices: [
            {
                direction: 'Albany, NY',
                link: '/offices/albany',
            },
            {
                direction: 'New York, NY',
                link: '/offices/new-york',
            },
        ],
    },
    {
        type: 'section',
        title: 'Services',
        icon: 'mdi:cog',
        services: [
            {
                name: 'Web Development',
                link: '/services/web-development',
            },
            {
                name: 'Mobile Apps',
                link: '/services/mobile-apps',
            },
            {
                name: 'Cloud Solutions',
                link: '/services/cloud-solutions',
            },
            {
                name: 'Consulting',
                link: '/services/consulting',
            },
        ],
    },
    {
        type: 'section',
        title: 'Company',
        icon: 'mdi:office-building',
        services: [
            {
                name: 'About Us',
                link: '/about',
            },
            {
                name: 'Careers',
                link: '/careers',
            },
            {
                name: 'Blog',
                link: '/blog',
            },
        ],
    },
];
