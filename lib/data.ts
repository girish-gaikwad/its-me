import { IProject } from '@/types';

export const GENERAL_INFO = {
    name: 'Girish Gaikwad',
    email: 'girishgaikwad2055@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Girish, I am reaching out to you because...',

    Role: 'FullStack Dev',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/girish-gaikwad' },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/girish-gaikwad-0777172b0/',
    },
    { name: 'X', url: 'https://x.com/Girish_gaikwad_' },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'Javascript',
            icon: '/logo/js.png',
        },
        {
            name: 'Typescript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Frammer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'SASS',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Nest.js',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Prisma',
            icon: '/logo/prisma.png',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Elastica',
        slug: 'elastica',
        techStack: [
            'React',
            'next.js',
            'zustand',
            'Tailwind CSS',
            'Framer Motion',
            'debouncing',
            'Api Integration',
            'MongoDB',
        ],
        thumbnail: '/projects/thumbnail/elastica.png',
        longThumbnail: '/projects/thumbnail/elastica.png',
        // longThumbnail: '/projects/long/elastica.jpg',
        images: [
            '/projects/images/elastica-1.png',
            '/projects/images/elastica-2.png',
            '/projects/images/elastica-3.png',
            '/projects/images/elastica-4.png',
        ],
        liveUrl: 'https://www.elasticastore.in/',
        year: 2025,
        description: `Elastica is an e-commerce platform specialized in eco-friendly rubber products, featuring a comprehensive catalog of sustainable materials and environmentally conscious manufacturing solutions. The site offers seamless product browsing, efficient cart management, and secure checkout processes, catering to both retail and wholesale customers seeking green alternatives.`,
        role: `As the sole developer, I:\n- Completed the entire project within 24 days from concept to deployment\n- Built a responsive frontend using React, zustand, next.js, and Tailwind CSS\n- Implemented product filtering and search functionality for easy catalog navigation\n- Created an intuitive shopping cart and checkout process\n`,
    },

    {
        title: 'Saptabhumi',
        slug: 'saptabhumi',
        techStack: ['Next.js', 'Tailwind CSS', 'shadcn', 'MongoDB'],
        thumbnail: '/projects/thumbnail/sapthabhumi.png',
        longThumbnail: '/projects/thumbnail/sapthabhumi.png',
        // longThumbnail: '/projects/long/devLinks.jpg',
        images: [
            '/projects/images/sapthabhumi-1.png',
            '/projects/images/sapthabhumi-2.png',
            '/projects/images/sapthabhumi-3.png',
            '/projects/images/sapthabhumi-4.png',
        ],
        // sourceCode: 'https://github.com/Tajmirul/devsLink',
        liveUrl: 'https://saptabhumi.vercel.app/',
        year: 2024,
        description:
            'Saptabhumi is a modern marketplace platform connecting artisans with customers, showcasing handcrafted products and traditional artworks. Built with Next.js and Tailwind CSS, the platform features a responsive design, real-time product updates, and seamless user experience. The marketplace includes advanced filtering, secure payment integration, and an intuitive vendor dashboard for artisans to manage their products and orders.',
        role: `As the frontend developer, I:\n- Implemented responsive UI components using Next.js and Tailwind CSS\n- Created an intuitive product listing and search functionality\n- Integrated shadcn components for consistent design language\n- Built a performant shopping cart system with MongoDB integration`,
    },

    {
        title: 'GlobalXport',
        slug: 'globalxport',
        techStack: [
            'Next.js',
            'Tailwind CSS',
            'shadcn',
            'MongoDB',
            'next-ai',
            'openai',
            'grok',
            'google-generative-ai',
        ],
        thumbnail: '/projects/thumbnail/globalxport.png',
        longThumbnail: '/projects/thumbnail/globalxport.png',
        // longThumbnail: '/projects/thumbnail/sapthabhumi.png',
        images: [
            '/projects/images/gx-1.png',
            '/projects/images/gx-2.png',
            '/projects/images/gx-3.png',
            '/projects/images/gx-4.png',
            '/projects/images/gx-5.png',
        ],
        // sourceCode: 'https://github.com/car/cae',
        liveUrl: 'https://globalexport.vercel.app/',
        year: 2025,
        description:
            "GlobalXport is an innovative startup focused on streamlining customs department operations through AI integration. Built with Next.js and advanced AI technologies, the platform offers intelligent document processing, automated customs clearance workflows, and real-time tracking capabilities. The system leverages multiple AI models including Grok, and Google's Generative AI to enhance decision-making and expedite customs procedures.",
        role: `As a fullstack developer, I:\n- Developed end-to-end features using Next.js, Tailwind CSS, and MongoDB\n- Implemented AI integration with multiple models for document processing\n- Created responsive dashboards for customs officials and traders\n- Built RESTful APIs for seamless data flow between frontend and backend\n- Deployed and maintained the application on cloud infrastructure`,
    },
    {
        title: 'Eqrev',
        slug: 'eqrev',
        techStack: [
            'Tailwind CSS',
            'node.js',
            'express',
            'hero UI',
            'Bigquery',
            'Next.js',
            'google cloude',
        ],
        thumbnail: '/projects/thumbnail/eqrev.png',
        longThumbnail: '/projects/thumbnail/eqrev.png',
        // longThumbnail: '/projects/thumbnail/globalxport.png',
        images: [
            '/projects/images/eqrev-1.png',
            '/projects/images/eqrev-2.png',
            '/projects/images/eqrev-3.png',
            '/projects/images/eqrev-4.png',
        ],
        // sourceCode: 'https://github.com/car/cae',
        liveUrl: 'https://globalexport.vercel.app/',
        year: 2025,
        description:
            'Eqrev is a digital marketing platform specializing in quick commerce solutions. The application focuses on data-driven marketing strategies by collecting and analyzing relevant e-commerce data. Built with Node.js and Google Cloud technologies, the platform provides comprehensive analytics and automated data collection capabilities for marketing insights.',
        role: `As a backend developer, I:\n- Developed data collection scripts and APIs using Node.js and Express\n- Implemented BigQuery integration for large-scale data analytics\n- Created automated data processing pipelines for e-commerce metrics\n- Built efficient data storage and retrieval systems\n- Deployed and maintained backend services on Google Cloud Platform`,
    },
    {
        title: 'Govern AI',
        slug: 'governai',
        techStack: [
            'React',
            'Next.js',
            'Tailwind CSS',
            'shadcn/ui',
            'react-bits',
            'next-themes',
        ],
        thumbnail: '/projects/thumbnail/govern-ai.png',
        longThumbnail: '/projects/thumbnail/govern-ai.png',
        // longThumbnail: '/projects/thumbnail/eqrev.png',
        images: ['/projects/images/govern-ai.png'],
        // sourceCode: 'https://github.com/car/cae',
        liveUrl: 'https://governai.vercel.app/',
        year: 2025,
        description:
            'Govern AI is a futuristic design concept showcasing modern UI/UX principles for AI governance platforms. This freelance project features a sleek, minimalist interface with dynamic animations and responsive layouts. Built with React and Next.js, the design incorporates cutting-edge components from shadcn/ui and custom theme implementations for an immersive user experience.',
        role: `As a frontend developer, I:\n- Designed and implemented a modern, responsive UI using React and Next.js\n- Created custom animations and interactive elements with react-bits\n- Developed a comprehensive dark/light theme system using next-themes\n- Built reusable component library with shadcn/ui integration\n- Optimized performance and accessibility across all device types`,
    },
    {
        title: 'Emtax',
        slug: 'Emtax',
        techStack: ['React', 'node.js', 'express', 'squalize', 'mysql'],
        thumbnail: '/projects/thumbnail/emtax.png',
        longThumbnail: '/projects/thumbnail/emtax.png',
        // longThumbnail: '/projects/thumbnail/eqrev.png',
        images: [
            '/projects/images/emtax-1.png',
            '/projects/images/emtax-2.png',
            '/projects/images/emtax-3.png',
            '/projects/images/emtax-4.png',
        ],
        // sourceCode: 'https://github.com/car/cae',
        liveUrl: 'https://emtax.vercel.app/taxCode',
        year: 2024,
        description:
            'Emtax is a comprehensive tax documentation management system developed for businesses in the Emirates. The platform streamlines the process of handling tax-related documents, providing efficient document management and automated calculations. Built with React for the frontend and Node.js/Express for the backend, it offers a robust solution for tax compliance and documentation.',
        role: `As a fullstack developer, I:\n- Developed RESTful APIs using Node.js and Express for tax document processing\n- Implemented a MySQL database with Sequelize ORM for efficient data management\n- Created an intuitive frontend interface using React for document uploads and management\n- Built automated tax calculation features and document validation systems\n- Integrated secure authentication and authorization mechanisms`,
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Backend Developer (Intern)',
        company: 'QuickCommerce (Startup)',
        duration: 'Feb 2025 - Present',
    },
    {
        title: 'FullStack Developer (Intern)',
        company: "Crayon'd",
        duration: 'Aug 2024 - Feb 2025',
    },
];
