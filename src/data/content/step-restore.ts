export const stepsRespote: (
    | { titleSteps: string }
    | { title: string; steps: { step: string; text: string }[] }
    | { image: { src: string; alt: string } }
  )[] = [
    { titleSteps: 'STEPS PROCESS TO A RESTORED HOME' },
    {
      title: 'Work With the Right Team',
      steps: [
        {
          step: '1',
          text: 'Contact Nova Solutions for your FREE inspection and consultation.',
        },
        {
          step: '2',
          text: 'We have experience with the insurance claim process and are accredited with the BBB.',
        },
      ],
    },
    {
      title: 'We’ll Assess Damages / Needs',
      steps: [
        {
          step: '1',
          text: 'We will do a complete damage assessment of your property.',
        },
        {
          step: '2',
          text: 'We’ll take photos of the damage.',
        },
      ],
    },
    {
      title: 'We’ll Help You Work With Insurance',
      steps: [
        {
          step: '7',
          text: 'We will meet with your adjuster and will discuss all damages found.',
        },
        {
          step: '8',
          text: 'We’re here to help you sort out the insurance paperwork as well.',
        },
      ],
    },
    {
      title: 'We’ll Finalize Material Details & Build',
      steps: [
        {
          step: '7',
          text: 'You’ll select the materials and colors you love.',
        },
        {
          step: '8',
          text: 'We’ll set up and complete your project with our experienced crew',
        },
      ],
    },
    {
      title: 'Job Completion',
      steps: [
        {
          step: '1',
          text: 'A trained professional will complete a final inspection upon completion to ensure satisfaction.',
        },
        {
          step: '2',
          text: 'Payment is made upon completion.',
        },
        {
          step: '3',
          text: 'Financing is also available!',
        },
      ],
    },
    {
      image: {
        src: 'https://res.cloudinary.com/driyxelzh/image/upload/v1744940052/20231124_164824_pbq8zx.jpg',
        alt: 'roofing1',
      },
    },
  ];