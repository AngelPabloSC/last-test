// ─── Images ──────────────────────────────────────────────────────────────────
const IMGS = {
    roofing1: 'https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg',
    roofing2: 'https://res.cloudinary.com/driyxelzh/image/upload/v1745296100/GAF-Layer-lock-Dynamic-Restoration_hodwla.jpg',
    roofing3: 'https://res.cloudinary.com/driyxelzh/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1747000399/20240823_165042_tp8wio.jpg',
    metal1: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747003748/20230526_115959_wjngnd.jpg',
    metal2: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747004020/20230523_183557_x0dx2b.jpg',
    commercial: 'https://res.cloudinary.com/driyxelzh/image/upload/v1746726983/20230324_140406_cyhhcn.jpg',
    siding1: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747070060/20240522_161015_ftpq6k.jpg',
    siding2: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747069858/imageSiding_qwmkof.png',
    gutter1: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747070702/Parts_of_a_gutter_filwvb.png',
    gutter2: 'https://res.cloudinary.com/driyxelzh/image/upload/v1747071759/gutters_cap_rpjfjv.jpg',
    gutter3: 'https://res.cloudinary.com/driyxelzh/image/upload/v1746726327/IMG-20250505-WA0045_uslnfr.jpg',
    heroBg: 'https://images.unsplash.com/photo-1602193069473-0c78775ec7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOFING
// ─────────────────────────────────────────────────────────────────────────────
export const ROOFING = {
    seo: {
        title: 'Roofing in Capital Region | Nova Solutions',
        description: 'Looking for reliable roofing in Capital Region? Nova Solutions offers expert roof repair, replacement, and installation using high-quality materials.',
        keywords: 'roofing Capital Region, roof repair, roof replacement, roof installation, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing'],
        badgeText: "Capital Region's #1 Roofing Contractor",
        headline: 'Trusted Roofing Company in Capital Region',
    },
    sections: [
        {
            heading: 'Capital Region Roofing Contractors for Your Home',
            body: 'It takes a balance of professional training and strong work ethic to successfully complete a roofing project. At Nova Solutions, our Capital Region roofing contractors have the experience and skill required to repair or replace your roof flawlessly. We work exclusively with the highest quality roofing materials and are fully trained in the proper installation of shingles from top-rated brands.',
            image: IMGS.roofing1,
            imagePos: 1,
        },
        {
            heading: 'What You Can Look Forward To',
            body: "Let us show you why we're the trusted choice for roofing in Capital Region. Contact us today to schedule your free inspection!",
            image: IMGS.roofing2,
            imagePos: -1,
            bullets: [
                'Safety – Resilient against wind, combustion, and collapse',
                'Weather resistant – Precision-based shingle placement',
                'Style – Multiple colors, textures, and materials',
                'Energy efficiency – Insulation against extreme weather',
                'Durability – High-grade shingles for any condition',
                'Customer service – Your satisfaction is our top priority',
            ],
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'Full roof installations and replacements.' },
        { title: 'Roof Installation', path: '/Roofing/Roof-installation', desc: 'Expert new-build roofing.' },
        { title: 'Asphalt & Metal Roofing', path: '/Roofing/Asphalt-Single', desc: 'Premium shingles and metal systems.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'We work with all major insurers.' },
        { title: 'Commercial Roofing', path: '/Roofing/Commercial', desc: 'Flat and low-slope commercial roofing.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const ASPHALT_SHINGLE = {
    seo: {
        title: 'Asphalt Shingle Roofing Services in Capital Region',
        description: 'Nova Solutions offers expert Asphalt Shingle Roofing services in Capital Region. Free estimate!',
        keywords: 'asphalt shingle roofing, roof repair Capital Region, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing', 'Asphalt Shingle'],
        badgeText: 'Asphalt Shingle Specialists',
        headline: 'Asphalt Shingles Roofing Services in Capital Region',
    },
    sections: [
        {
            heading: 'Trusted Asphalt Shingle Roofing in Capital Region – Affordable & Reliable',
            body: 'With years of hands-on experience, Nova Solutions stands out as your reliable roofing partner. Our master roofers are dedicated to completing every project efficiently, affordably, and to your complete satisfaction. Call us today at +1 518-598-5156 for a free, no-obligation estimate.',
            image: IMGS.roofing3,
            imagePos: 1,
        },
        {
            heading: 'What to Expect from Our Expert Capital Region Roofing Installers',
            image: IMGS.roofing2,
            imagePos: -1,
            bullets: [
                'Safety First – Built with resilience in mind',
                'Leak-Resistant Installation – Precise shingle placement',
                'Stylish Options – Wide selection of colors and materials',
                'Energy Efficiency – Reduce energy costs year-round',
                'Long-Lasting Durability – High-grade shingles for storms and hail',
                'Outstanding Customer Service – We care about your satisfaction',
            ],
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'All our roofing services.' },
        { title: 'Metal Roofing', path: '/Roofing/Metal-Roofing', desc: 'Stone-coated steel systems.' },
        { title: 'Roof Installation', path: '/Roofing/Roof-installation', desc: 'Expert roof installations.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Storm damage claim help.' },
        { title: 'Commercial Roofing', path: '/Roofing/Commercial', desc: 'Commercial roofing solutions.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const METAL_ROOFING = {
    seo: {
        title: 'Metal Roofing in Capital Region | Nova Solutions',
        description: 'Upgrade your home with long-lasting stone-coated metal roofing in Capital Region. Free inspection!',
        keywords: 'metal roofing Capital Region, stone-coated steel, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing', 'Metal Roofing'],
        badgeText: 'Stone-Coated Steel Roof Experts',
        headline: 'Metal Roofing in Capital Region – Built to Last',
    },
    sections: [
        {
            heading: 'Trusted Metal Roofing Installers in Capital Region',
            body: 'A long-lasting metal roof starts with two critical elements: premium materials and expert installation. At Nova Solutions, we use only high-quality stone-coated steel shingles that combine elegance with unbeatable strength.',
            image: IMGS.metal1,
            imagePos: 1,
        },
        {
            heading: 'Why Capital Region Homeowners Choose Nova Solutions for Metal Roofing',
            body: "At Nova Solutions, we install stone-coated metal roofs that deliver powerful benefits designed to withstand Capital Region's unpredictable weather.",
            image: IMGS.roofing2,
            imagePos: -1,
            bullets: [
                'Energy Efficiency – Reflect UV rays and reduce heat absorption',
                'Extreme Durability – Lasts 5 to 10× longer than asphalt shingles',
                'Unmatched Safety – Superior fire, wind, and storm protection',
                'Weather Resistance – Holds strong against hail and wind gusts',
                'Curb Appeal – Timeless stone-coated shingle style',
                'Customer-First Service – Focused on your satisfaction',
            ],
        },
        {
            heading: 'Why Capital Region Homeowners Trust Nova Solutions for Metal Roofing',
            body: "We've successfully installed dozens of high-performance metal roofs across Capital Region. Ready to get started? Call us at +1 518-598-5156 for your free inspection.",
            image: IMGS.metal2,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'All our roofing services.' },
        { title: 'Asphalt Shingle', path: '/Roofing/Asphalt-Single', desc: 'Premium asphalt shingles.' },
        { title: 'Roof Installation', path: '/Roofing/Roof-installation', desc: 'Expert roof installations.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Storm damage claim help.' },
        { title: 'Commercial Roofing', path: '/Roofing/Commercial', desc: 'Commercial roofing solutions.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const COMMERCIAL_ROOFING = {
    seo: {
        title: 'Commercial Roofing in Capital Region | Nova Solutions',
        description: 'Get expert commercial roofing in Capital Region from Nova Solutions. Flat, TPO, EDPM, metal, and asphalt. Schedule your inspection!',
        keywords: 'commercial roofing Capital Region, flat roofing, TPO, EDPM, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing', 'Commercial'],
        badgeText: 'Commercial Roofing Specialists',
        headline: 'Capital Region Commercial Roofing – Reliable Solutions for Your Business',
    },
    sections: [
        {
            heading: "Capital Region's Trusted Commercial Roofing Company",
            body: "At Nova Solutions, we're the commercial roofing company businesses in Capital Region trust. Our team delivers top-tier service and long-lasting roofing solutions — so you can focus on running your business, not fixing your roof.",
            image: IMGS.commercial,
            imagePos: 1,
        },
        {
            heading: 'What to Expect from Our Expert Capital Region Roofing Installers',
            image: IMGS.roofing2,
            imagePos: -1,
            bullets: [
                'EDPM and TPO roofing solutions – For flat and commercial roofs',
                'Asphalt roofing systems – For businesses and pitched roofs',
                'Metal roofing options – Including stone-coated shingles and standing seam',
                'Durable flat roofing – Cost-effective commercial solutions',
                'Elegant installations – Slate, natural shake, and tile options',
            ],
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'All our roofing services.' },
        { title: 'Metal Roofing', path: '/Roofing/Metal-Roofing', desc: 'Stone-coated steel systems.' },
        { title: 'Roof Installation', path: '/Roofing/Roof-installation', desc: 'Expert roof installations.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Storm damage claim help.' },
        { title: 'Asphalt Shingle', path: '/Roofing/Asphalt-Single', desc: 'Residential shingles.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const ROOF_INSTALLATION = {
    seo: {
        title: 'Roof Installation in Capital Region | Nova Solutions',
        description: 'Expert roof installation in Capital Region. Top-quality roofing with premium materials and exceptional service.',
        keywords: 'roof installation Capital Region, roofing contractors, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing', 'Installation'],
        badgeText: 'Top-Rated Roof Installation Team',
        headline: 'Top-Rated Roof Installation Team in Capital Region',
    },
    sections: [
        {
            heading: 'Why Choose Nova Solutions for Your Capital Region Roof Installation?',
            body: 'With years of hands-on experience in Capital Region, our roofing installers know exactly what it takes to deliver roofs that stand the test of time. We combine top-tier materials with meticulous installation techniques to ensure your new roof performs flawlessly for decades.',
            image: IMGS.roofing3,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'All our roofing services.' },
        { title: 'Asphalt Shingle', path: '/Roofing/Asphalt-Single', desc: 'Asphalt shingle options.' },
        { title: 'Metal Roofing', path: '/Roofing/Metal-Roofing', desc: 'Stone-coated steel systems.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Storm damage claim help.' },
        { title: 'Commercial Roofing', path: '/Roofing/Commercial', desc: 'Commercial roofing.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const INSURANCE_CLAIMS = {
    seo: {
        title: 'Roofing Insurance Claims in Capital Region | Nova Solutions',
        description: 'Nova Solutions specializes in roofing insurance claims in Capital Region. 5+ years helping homeowners navigate storm damage claims.',
        keywords: 'roofing insurance claims Capital Region, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing', 'Insurance Claims'],
        badgeText: '5+ Years of Insurance Claim Experience',
        headline: 'Capital Region Roofing Insurance Claims',
    },
    sections: [
        {
            heading: 'We Handle Your Claim From Start to Finish',
            body: 'With over 5 years in business and team members boasting more than 7 years of experience in construction and restoration, Nova Solutions is your trusted partner for roofing insurance claims in Capital Region. Every member of our team is committed to delivering the highest quality service, workmanship, and customer care.',
            image: IMGS.roofing2,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Roofing', path: '/Roofing', desc: 'All our roofing services.' },
        { title: 'Roof Repair', path: '/Roofing-Repair', desc: 'Storm and hail damage repair.' },
        { title: 'Metal Roofing', path: '/Roofing/Metal-Roofing', desc: 'Stone-coated steel systems.' },
        { title: 'Asphalt Shingle', path: '/Roofing/Asphalt-Single', desc: 'Quality asphalt shingles.' },
        { title: 'Commercial Roofing', path: '/Roofing/Commercial', desc: 'Commercial roofing.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOFING REPAIR
// ─────────────────────────────────────────────────────────────────────────────
export const ROOFING_REPAIR = {
    seo: {
        title: 'Roof Repair Services in Albany | Nova Solutions',
        description: 'Expert roof repair in Albany. Nova Solutions handles leaks, storm damage, hail damage, and all roofing repairs. Call now!',
        keywords: 'roof repair, roof leak, storm damage, hail damage, Albany, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing Repair'],
        badgeText: 'Fast & Professional Roof Repair',
        headline: 'Expert Roof Repair Services in Albany',
    },
    sections: [
        {
            heading: 'Complete Roof Repair Solutions',
            body: 'Our Albany roof repair services include leak detection and repair, storm damage restoration, hail damage assessment, emergency repairs, and preventive maintenance. We work with your insurance company and provide transparent pricing.',
            image: IMGS.commercial,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Hail Damage', path: '/Roofing-Repair/Hail-Damage', desc: 'Specialized hail damage repair.' },
        { title: 'Roof Inspection', path: '/Roofing-Repair/Roof-Inspection', desc: 'Thorough roof inspections.' },
        { title: 'Roof Leak', path: '/Roofing-Repair/Roof-Leak', desc: 'Fast leak detection and repair.' },
        { title: 'Storm Damage', path: '/Roofing-Repair/Storm-Damage', desc: 'Storm damage restoration.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Full roofing services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const HAIL_DAMAGE = {
    seo: {
        title: 'Hail Damage Roof Repair Capital Region | Nova Solutions',
        description: 'Expert hail damage roof repair in Albany. Fast assessment and insurance assistance.',
        keywords: 'hail damage, roof repair, storm damage, Albany, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing Repair', 'Hail Damage'],
        badgeText: 'Emergency Hail Damage Repair',
        headline: 'Expert Hail Damage Roof Repair in Albany',
    },
    sections: [
        {
            heading: 'Professional Hail Damage Assessment',
            body: 'Our certified inspectors identify all hail damage, document it thoroughly for insurance claims, and provide expert repair services. We handle everything from minor repairs to complete roof replacement.',
            image: IMGS.commercial,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Storm Damage', path: '/Roofing-Repair/Storm-Damage', desc: 'Wind and storm repair.' },
        { title: 'Roof Inspection', path: '/Roofing-Repair/Roof-Inspection', desc: 'Free roof inspection.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Insurance claim help.' },
        { title: 'Roof Leak', path: '/Roofing-Repair/Roof-Leak', desc: 'Leak detection and repair.' },
        { title: 'Roofing Repair', path: '/Roofing-Repair', desc: 'All repair services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const ROOF_INSPECTION = {
    seo: {
        title: 'Professional Roof Inspection Albany | Free Estimates | Nova Solutions',
        description: 'Thorough roof inspection in Albany from Nova Solutions. Free estimates available!',
        keywords: 'roof inspection, roof assessment, Albany, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing Repair', 'Roof Inspection'],
        badgeText: 'Certified Roof Inspectors',
        headline: 'Comprehensive Roof Inspections in Albany',
    },
    sections: [
        {
            heading: 'Why Regular Roof Inspections Matter',
            body: 'Regular inspections catch small problems before they become expensive repairs. Our Albany roof inspection service includes checking for leaks, damaged shingles, flashing issues, and more. We provide honest assessments and fair pricing.',
            image: IMGS.commercial,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Hail Damage', path: '/Roofing-Repair/Hail-Damage', desc: 'Hail damage repair.' },
        { title: 'Storm Damage', path: '/Roofing-Repair/Storm-Damage', desc: 'Storm damage restoration.' },
        { title: 'Roof Leak', path: '/Roofing-Repair/Roof-Leak', desc: 'Leak repair services.' },
        { title: 'Roofing Repair', path: '/Roofing-Repair', desc: 'All repair services.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Claim assistance.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const ROOF_LEAK = {
    seo: {
        title: 'Roof Leak Repair Albany | Emergency Service | Nova Solutions',
        description: 'Fast roof leak repair in Albany. Available for emergency repairs!',
        keywords: 'roof leak, leak repair, emergency roofing, Albany, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing Repair', 'Roof Leak'],
        badgeText: 'Fast Emergency Leak Repair',
        headline: 'Fast, Reliable Roof Leak Repair in Albany',
    },
    sections: [
        {
            heading: 'Expert Leak Detection and Repair',
            body: 'Roof leaks can be tricky to find and fix. Our Albany roofing experts use advanced techniques to locate leaks and provide lasting repairs. We work quickly to prevent water damage to your home.',
            image: IMGS.commercial,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Roof Inspection', path: '/Roofing-Repair/Roof-Inspection', desc: 'Preventive inspections.' },
        { title: 'Hail Damage', path: '/Roofing-Repair/Hail-Damage', desc: 'Hail damage repair.' },
        { title: 'Storm Damage', path: '/Roofing-Repair/Storm-Damage', desc: 'Storm restoration.' },
        { title: 'Roofing Repair', path: '/Roofing-Repair', desc: 'All repair services.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Claim assistance.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const STORM_DAMAGE = {
    seo: {
        title: 'Storm Damage Roof Repair Albany | Insurance Claims | Nova Solutions',
        description: 'Expert storm damage roof repair in Albany. We work with insurance companies. Call now!',
        keywords: 'storm damage, roof repair, wind damage, Albany, Nova Solutions',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Roofing Repair', 'Storm Damage'],
        badgeText: 'Storm Damage Specialists',
        headline: 'Professional Storm Damage Roof Repair in Albany',
    },
    sections: [
        {
            heading: 'Complete Storm Damage Restoration',
            body: 'Our storm damage experts assess all damage, document it for insurance, and restore your roof to perfect condition. We handle everything from emergency tarping to complete roof replacement.',
            image: IMGS.commercial,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Hail Damage', path: '/Roofing-Repair/Hail-Damage', desc: 'Hail damage repair.' },
        { title: 'Roof Inspection', path: '/Roofing-Repair/Roof-Inspection', desc: 'Free inspection.' },
        { title: 'Insurance Claims', path: '/Roofing/Insurance-Claims', desc: 'Claim assistance.' },
        { title: 'Roof Leak', path: '/Roofing-Repair/Roof-Leak', desc: 'Leak repair.' },
        { title: 'Roofing Repair', path: '/Roofing-Repair', desc: 'All repair services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDING
// ─────────────────────────────────────────────────────────────────────────────
export const SIDING = {
    seo: {
        title: 'Siding Installation & Repair in Albany | Nova Solution',
        description: 'Professional siding services in Albany. Vinyl, fiber cement, and siding replacement. Free estimates!',
        keywords: 'siding installation, siding repair, vinyl siding, fiber cement, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Siding'],
        badgeText: "Albany's Top Siding Contractor",
        headline: 'Professional Siding Services in Albany',
    },
    sections: [
        {
            heading: 'Why Choose Nova Solution for Siding?',
            body: 'Our siding experts use premium materials and proven installation techniques. We offer a wide selection of colors and styles to match your home. Trust Albany\'s top-rated siding contractor for quality workmanship and exceptional customer service.',
            image: IMGS.siding1,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Vinyl Siding', path: '/Siding/Vinyl-Siding', desc: 'Affordable vinyl options.' },
        { title: 'Siding Replacement', path: '/Siding/Siding-Replacement', desc: 'Complete siding replacement.' },
        { title: 'Fiber Cement Siding', path: '/Siding/fiber-Cement-Siding', desc: 'James Hardie installations.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Professional roofing services.' },
        { title: 'Gutters', path: '/Gutters', desc: 'Gutter installation and repair.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const VINYL_SIDING = {
    seo: {
        title: 'Vinyl Siding Installation in Albany | Nova Solution',
        description: 'Expert vinyl siding installation in Albany. Affordable, reliable, top brands. Free estimate!',
        keywords: 'vinyl siding, siding installation, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Siding', 'Vinyl Siding'],
        badgeText: 'Vinyl Siding Specialists',
        headline: 'Albany Vinyl Siding',
    },
    sections: [
        {
            heading: 'Vinyl Siding Contractor',
            body: 'Our team at Nova Solution delivers great siding services in Albany. The siding we work with is the longest lasting quality, with the most reliable guarantee available. Call us today at +1 518-598-5156 to work with a top-rated siding installer.',
            image: IMGS.siding1,
            imagePos: 1,
        },
        {
            heading: 'Our Siding Services Include',
            body: "Let us show you why we're the trusted choice for Siding in Albany. Contact us today to schedule your free inspection!",
            image: IMGS.siding2,
            imagePos: -1,
            bullets: [
                'Budget-friendly vinyl siding installation',
                'Dependable vinyl siding repair',
                'Huge selection of siding available – Vinyl and insulated siding',
                'Brand-name replacement siding – Including James Hardie',
            ],
        },
    ],
    related: [
        { title: 'Siding', path: '/Siding', desc: 'All siding services.' },
        { title: 'Siding Replacement', path: '/Siding/Siding-Replacement', desc: 'Complete replacement.' },
        { title: 'Fiber Cement Siding', path: '/Siding/fiber-Cement-Siding', desc: 'Premium fiber cement.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Gutters', path: '/Gutters', desc: 'Gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const FIBER_CEMENT_SIDING = {
    seo: {
        title: 'Fiber Cement Siding Albany | James Hardie | Nova Solution',
        description: 'Premium fiber cement siding installation in Albany. James Hardie and top brands. Free estimates!',
        keywords: 'fiber cement siding, James Hardie, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Siding', 'Fiber Cement Siding'],
        badgeText: 'James Hardie Certified Installer',
        headline: 'Premium Fiber Cement Siding in Albany',
    },
    sections: [
        {
            heading: 'Why Choose Fiber Cement Siding?',
            body: "Fiber cement siding offers unmatched durability, fire resistance, and low maintenance. Unlike vinyl, it won't warp, crack, or fade. Our expert installers ensure proper installation for maximum performance and longevity.",
            image: IMGS.siding1,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Siding', path: '/Siding', desc: 'All siding services.' },
        { title: 'Vinyl Siding', path: '/Siding/Vinyl-Siding', desc: 'Vinyl siding options.' },
        { title: 'Siding Replacement', path: '/Siding/Siding-Replacement', desc: 'Complete replacement.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Gutters', path: '/Gutters', desc: 'Gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const SIDING_REPLACEMENT = {
    seo: {
        title: 'Siding Replacement Albany | Expert Installation | Nova Solution',
        description: 'Professional siding replacement in Albany. Premium materials, expert team. Transform your home!',
        keywords: 'siding replacement, siding installation, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Siding', 'Siding Replacement'],
        badgeText: 'Complete Siding Replacement',
        headline: 'Complete Siding Replacement in Albany',
    },
    sections: [
        {
            heading: 'Expert Siding Replacement Services',
            body: 'Our siding replacement process is thorough and professional. We remove old siding, inspect and repair any underlying issues, and install your new siding with precision. The result is a home that looks stunning and is protected for decades.',
            image: IMGS.siding1,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Siding', path: '/Siding', desc: 'All siding services.' },
        { title: 'Vinyl Siding', path: '/Siding/Vinyl-Siding', desc: 'Vinyl options.' },
        { title: 'Fiber Cement Siding', path: '/Siding/fiber-Cement-Siding', desc: 'James Hardie.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Gutters', path: '/Gutters', desc: 'Gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// GUTTERS
// ─────────────────────────────────────────────────────────────────────────────
export const GUTTERS = {
    seo: {
        title: 'Gutter Installation & Repair in Albany | Nova Solution',
        description: 'Affordable gutter repair and installation in Albany. Vinyl, aluminum, and seamless gutters plus guards. Free quote!',
        keywords: 'gutter installation, gutter repair, Albany, seamless gutters, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters'],
        badgeText: 'Albany Gutter Experts – 5+ Years',
        headline: 'Gutter Services for Albany Homeowners',
    },
    sections: [
        {
            heading: 'Our Gutter Services Include',
            body: "Let us show you why we're the trusted choice for Gutters in Albany. Contact us today to schedule your free inspection!",
            image: IMGS.gutter1,
            imagePos: -1,
            bullets: [
                'Affordable and fast gutter repair – For leaks and damage',
                'Installation of high-performance gutter and leaf guards',
                'Complete gutter replacement – Vinyl, aluminum, and seamless',
                'Custom-fit gutter solutions – For long-term home protection',
                'No-hassle inspections – Transparent, competitive quotes',
            ],
        },
    ],
    related: [
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'Leaf protection systems.' },
        { title: 'Gutter Repairs', path: '/Gutters/Gutter-Repairs', desc: 'Fast gutter repairs.' },
        { title: 'Gutter Replacement', path: '/Gutters/Gutter-Replacement', desc: 'Seamless replacements.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Siding', path: '/Siding', desc: 'Siding services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_GUARDS = {
    seo: {
        title: 'Gutter Guards Albany | Leaf Protection | Nova Solution',
        description: 'Professional gutter guard installation in Albany. Premium leaf guards, caps, and protection systems.',
        keywords: 'gutter guards, leaf guards, gutter protection, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards'],
        badgeText: 'Maintenance-Free Gutter Systems',
        headline: 'Premium Gutter Guard Systems in Albany',
    },
    sections: [
        {
            heading: 'The Best Gutter Protection for Albany Homes',
            body: 'We install industry-leading gutter guard systems designed for Albany\'s climate. From heavy rain to autumn leaves, our solutions keep your gutters clear.',
            image: IMGS.gutter2,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Gutter Cap', path: '/Gutters/Gutter-Guards/Gutter-Cap', desc: 'Premium gutter caps.' },
        { title: 'Gutter Covers', path: '/Gutters/Gutter-Guards/Gutter-Covers', desc: 'Durable covers.' },
        { title: 'Leaf Filters', path: '/Gutters/Gutter-Guards/Leaf-Filters', desc: 'Micro-mesh leaf filters.' },
        { title: 'Leaf Guards', path: '/Gutters/Gutter-Guards/Leaf-Guards', desc: 'Professional leaf guards.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_CAP = {
    seo: {
        title: 'Gutter Cap Installation | Nova Solution Albany',
        description: 'Protect your home with maintenance-free gutter caps from Nova Solution in Albany.',
        keywords: 'gutter cap, gutter guards, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards', 'Gutter Cap'],
        badgeText: 'Zero-Maintenance Gutter Caps',
        headline: 'Why Choose Gutter Guards from Nova Solution in Albany',
    },
    sections: [
        {
            heading: 'Trusted Gutter Guard Installers in Greater Albany',
            body: 'Say goodbye to clogged gutters and constant maintenance. Our gutter guard systems are designed for performance and built to last. Fast service at a price you\'ll love.',
            image: IMGS.gutter2,
            imagePos: 1,
        },
        {
            heading: 'Our Gutter Services Include',
            body: "Let us show you why we're the trusted choice for Gutter Guards in Albany. Contact us today to schedule your free inspection!",
            image: IMGS.gutter1,
            imagePos: -1,
            bullets: [
                'No more cleaning – Enjoy maintenance-free gutters all year',
                'Protect your home from water damage – With efficient flow control',
                'Quick, professional installation – Less disruption and lower cost',
                'Custom-fit solutions – Blend perfectly with your home exterior',
                'All-metal construction – Long-lasting performance and durability',
            ],
        },
    ],
    related: [
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'All protection systems.' },
        { title: 'Gutter Covers', path: '/Gutters/Gutter-Guards/Gutter-Covers', desc: 'Durable covers.' },
        { title: 'Leaf Filters', path: '/Gutters/Gutter-Guards/Leaf-Filters', desc: 'Micro-mesh filters.' },
        { title: 'Gutter Repairs', path: '/Gutters/Gutter-Repairs', desc: 'Fast gutter repairs.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_COVERS = {
    seo: {
        title: 'Gutter Covers Albany | Professional Installation | Nova Solution',
        description: 'Premium gutter covers in Albany from Nova Solution. Free estimates!',
        keywords: 'gutter covers, gutter protection, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards', 'Gutter Covers'],
        badgeText: 'Professional Gutter Cover Installation',
        headline: 'Professional Gutter Cover Installation in Albany',
    },
    sections: [
        {
            heading: 'Why Choose Our Gutter Covers?',
            body: "Our gutter covers are engineered for Albany's climate, handling heavy rain, snow, and falling leaves with ease. Premium materials and proven installation techniques ensure flawless performance.",
            image: IMGS.gutter2,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Gutter Cap', path: '/Gutters/Gutter-Guards/Gutter-Cap', desc: 'Premium gutter caps.' },
        { title: 'Leaf Filters', path: '/Gutters/Gutter-Guards/Leaf-Filters', desc: 'Micro-mesh filters.' },
        { title: 'Leaf Guards', path: '/Gutters/Gutter-Guards/Leaf-Guards', desc: 'Leaf guard systems.' },
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'All protection.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_PROTECTION = {
    seo: {
        title: 'Gutter Protection Albany | Keep Gutters Clean | Nova Solution',
        description: 'Professional gutter protection systems in Albany. Expert installation to keep gutters debris-free.',
        keywords: 'gutter protection, gutter guards, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards', 'Gutter Protection'],
        badgeText: 'Advanced Gutter Protection Systems',
        headline: 'Complete Gutter Protection for Albany Homes',
    },
    sections: [
        {
            heading: 'The Best Gutter Protection in Albany',
            body: "We install industry-leading gutter protection systems designed to handle everything Albany weather throws at them. From heavy downpours to autumn leaves, our solutions keep your gutters clear.",
            image: IMGS.gutter3,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'All guard systems.' },
        { title: 'Leaf Filters', path: '/Gutters/Gutter-Guards/Leaf-Filters', desc: 'Micro-mesh filters.' },
        { title: 'Gutter Cap', path: '/Gutters/Gutter-Guards/Gutter-Cap', desc: 'Gutter cap systems.' },
        { title: 'Gutter Covers', path: '/Gutters/Gutter-Guards/Gutter-Covers', desc: 'Gutter covers.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const LEAF_FILTERS = {
    seo: {
        title: 'Leaf Filters Albany | Gutter Protection | Nova Solution',
        description: 'Install premium leaf filters in Albany with Nova Solution. Professional installation, free estimates!',
        keywords: 'leaf filters, gutter guards, leaf protection, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards', 'Leaf Filters'],
        badgeText: 'Micro-Mesh Leaf Filter Technology',
        headline: 'Premium Leaf Filter Installation in Albany',
    },
    sections: [
        {
            heading: 'Advanced Leaf Filter Technology',
            body: 'Our leaf filters use state-of-the-art micro-mesh design to keep out leaves, pine needles, shingle grit, and other debris. Water flows through effortlessly while everything else stays out.',
            image: IMGS.gutter2,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Leaf Guards', path: '/Gutters/Gutter-Guards/Leaf-Guards', desc: 'Leaf guard systems.' },
        { title: 'Gutter Covers', path: '/Gutters/Gutter-Guards/Gutter-Covers', desc: 'Gutter covers.' },
        { title: 'Gutter Cap', path: '/Gutters/Gutter-Guards/Gutter-Cap', desc: 'Gutter caps.' },
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'All protection.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const LEAF_GUARDS = {
    seo: {
        title: 'Leaf Guards Albany | Professional Installation | Nova Solution',
        description: 'Protect your gutters with professional leaf guards from Nova Solution in Albany. Free estimate!',
        keywords: 'leaf guards, gutter protection, Albany, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Guards', 'Leaf Guards'],
        badgeText: 'Durable Leaf Guard Systems',
        headline: 'Professional Leaf Guard Installation in Albany',
    },
    sections: [
        {
            heading: 'Why Albany Homeowners Choose Our Leaf Guards',
            body: "Our leaf guard systems are built to last, with durable construction that stands up to Albany's toughest weather. Fast, professional installation that pays for itself by protecting your home.",
            image: IMGS.gutter3,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Leaf Filters', path: '/Gutters/Gutter-Guards/Leaf-Filters', desc: 'Micro-mesh filters.' },
        { title: 'Gutter Covers', path: '/Gutters/Gutter-Guards/Gutter-Covers', desc: 'Gutter covers.' },
        { title: 'Gutter Cap', path: '/Gutters/Gutter-Guards/Gutter-Cap', desc: 'Gutter caps.' },
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'All protection.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_REPAIRS = {
    seo: {
        title: 'Albany Gutter Repair Services | Nova Solution – Fast & Affordable',
        description: 'Reliable gutter repair in Albany, NY. Fast, affordable gutter repairs, installation, and guards. Free estimate!',
        keywords: 'gutter repair Albany, gutter installation, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Repairs'],
        badgeText: '5+ Years Gutter Repair Experience',
        headline: 'Professional Gutter Repair Company in Albany, NY',
    },
    sections: [
        {
            heading: 'Why Choose Nova Solution for Gutter Repairs in Albany?',
            body: 'Our team understands the unique weather challenges Albany homeowners face. We use durable materials and proven repair techniques to ensure your system performs flawlessly. Fast turnaround, competitive pricing, and workmanship you can trust.',
            image: IMGS.gutter3,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Gutter Replacement', path: '/Gutters/Gutter-Replacement', desc: 'Full replacement.' },
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'Protection systems.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Siding', path: '/Siding', desc: 'Siding services.' },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
export const GUTTER_REPLACEMENT = {
    seo: {
        title: 'Gutter Replacement Albany | Seamless Gutters | Nova Solution',
        description: 'Need gutter replacement in Albany? Seamless gutters, gutter guards, and complete systems. Free estimates!',
        keywords: 'gutter replacement Albany, seamless gutters, Nova Solution',
    },
    hero: {
        image: IMGS.heroBg,
        breadcrumb: ['Home', 'Gutters', 'Gutter Replacement'],
        badgeText: 'Seamless Gutter Replacement Experts',
        headline: 'Professional Gutter Replacement Services in Albany',
    },
    sections: [
        {
            heading: 'Why Replace Your Gutters with Nova Solution?',
            body: 'Old, damaged gutters can cause serious problems — from foundation damage to basement flooding. Our replacement service gives you a fresh start with a modern, efficient gutter system. Seamless gutters that eliminate leaks, custom colors, and optional guards.',
            image: IMGS.gutter3,
            imagePos: 1,
        },
    ],
    related: [
        { title: 'Gutter Repairs', path: '/Gutters/Gutter-Repairs', desc: 'Fast repairs.' },
        { title: 'Gutter Guards', path: '/Gutters/Gutter-Guards', desc: 'Protection systems.' },
        { title: 'Gutters', path: '/Gutters', desc: 'All gutter services.' },
        { title: 'Roofing', path: '/Roofing', desc: 'Roofing services.' },
        { title: 'Siding', path: '/Siding', desc: 'Siding services.' },
    ],
};
