import {Icon} from 'astro-icon';

export const oneCall: (
  | { titleOneCall: string }
  | { subtitleOneCall: string }
  | { subtitle: string }
  | { title: string; content: { icon: Icon; text: string }[] }
  | { video: { src: string; alt: string } }
)[] = [
  { titleOneCall: 'One Call Does It All!' },
  { subtitleOneCall: '#1 in Exterior Remodeling' },

  {
    title: 'Roofing',
    content: [
      {
        icon: 'mdi:home-roof',
        text: "Our expert roofers install every roof according to the manufacturer's exact specifications, ensuring lasting performance and protecting your home's structural integrity.",
      },
    ],
  },

  {
    title: 'Siding',
    content: [
      {
        icon: 'ic:twotone-house-siding',
        text: "From traditional vinyl to insulated and James Hardie fiber cement siding, we offer durable, energy-efficient siding solutions tailored to your home's style.",
      },
    ],
  },

  {
    title: 'Gutters',
    content: [
      {
        icon: 'flowbite:filter-outline',
        text: "We custom-fit 5″ and 6″ seamless gutters to your home to manage water runoff effectively and offer optional gutter guard installations for added protection.",
      },
    ],
  },

  {
    title: 'Windows & Doors',
    content: [
      {
        icon: 'flowbite:open-door-outline',
        text: "Upgrade your home with energy-efficient windows and doors available in a variety of colors and styles. We handle everything from removal to installation.",
      },
    ],
  },

  {
    title: 'Porches & Decks',
    content: [
      {
        icon: 'game-icons:home-garage',
        text: "Transform your outdoor living area with custom-built porches and decks designed to enhance comfort, style, and functionality.",
      },
    ],
  },

  {
    title: 'Interiors',
    content: [
      {
        icon: 'mdi:home-theater',
        text: "We provide full-service interior work including framing, drywall, insulation, painting, and finishing to bring your indoor spaces to life.",
      },
    ],
  },

  {
    video: {
      src: 'https://www.youtube.com/watch?v=hADWcALv8z8&ab_channel=IsaMarcial', // asegúrate que la ruta exista en tu proyecto Astro
      alt: 'Nova Solutions team at work showcasing various remodeling services',
    },
  },
];