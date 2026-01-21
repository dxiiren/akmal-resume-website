import type { Resume } from '~/types/resume'

export const resumeData: Resume = {
  contact: {
    name: 'Akmal Suhaimi',
    title: 'Backend Engineer',
    location: '43000, Kajang, Selangor',
    phone: '(+60) 19-535-7250',
    email: 'mhdakmal875@gmail.com',
    linkedin: 'https://www.linkedin.com/in/akmal-suhaimi',
    website: 'https://www.akmalsuhaimi.com',
    image: '/images/profile.jpg',
    github: 'https://github.com/dxiiren',
    whatsapp: 'https://wa.me/60195357250?text=Hi%20Akmal%20!',
  },

  // Brand identity
  tagline: "I build. I solve. I don't stop.",

  roles: [
    'Backend Engineer',
    'Problem Solver',
    'System Architect',
    'API Specialist',
  ],

  stats: [
    { value: '4', label: 'Years Experience', suffix: '+' },
    { value: '50K', label: 'Daily Transactions', suffix: '+' },
    { value: '99.9', label: 'Uptime', suffix: '%' },
    { value: '5', label: 'API Integrations', suffix: '+' },
  ],

  terminalSnippet: {
    language: 'php',
    code: `<?php

class AkmalSuhaimi extends BackendEngineer
{
    public string $mindset = 'growth';
    public bool $lovesCleanCode = true;

    public function solve(Problem $problem): Solution
    {
        while (!$problem->isSolved()) {
            $this->analyze($problem);
            $this->build();
            $this->iterate();
        }

        return new Solution('Done. Next challenge?');
    }
}`,
  },

  aboutMe: {
    pillars: [
      {
        title: 'The Builder',
        icon: 'Hammer',
        description: 'I turn complex requirements into clean, maintainable systems. From database schemas to API architectures, I craft solutions that scale—all backed by 85%+ test coverage.',
      },
      {
        title: 'The Problem Solver',
        icon: 'Puzzle',
        description: "When queries take minutes, I make them take seconds. When systems crash, I find out why. Every bug is a puzzle I'm determined to solve.",
      },
      {
        title: 'The Learner',
        icon: 'BookOpen',
        description: "Tech evolves fast, and so do I. Currently diving deeper into system design, cloud architecture, and pursuing my Bachelor's while working full-time.",
      },
    ],
    funFacts: [
      { icon: 'Dumbbell', text: 'Gym enthusiast - consistency builds strength' },
      { icon: 'Gamepad2', text: 'Gamer at heart - strategy feeds creativity' },
      { icon: 'Book', text: 'Self-improvement reader - always leveling up' },
      { icon: 'Users', text: 'Family first - my why behind the work' },
    ],
  },

  summary: 'I reduced a 95% data mismatch problem to near-zero at YoPrint and optimized queries from 1+ minute to under 2 seconds at Biztory. Backend Engineer with 4+ years building production systems that handle 50K+ daily transactions at 99.9% uptime.',

  education: [
    {
      degree: 'Master of Business Administration (MBA)',
      institution: 'To Be Determined',
      location: 'Malaysia',
      period: '2028',
      status: 'planned',
    },
    {
      degree: 'Bachelor of Business Administration (Honours)',
      institution: 'Innovative University College (IUC)',
      location: 'Petaling Jaya, Selangor',
      period: 'Oct 2025 – Present',
      status: 'ongoing',
      expectedCompletion: 'Dec 2027',
      link: 'https://innovative.edu.my/',
      logo: '/images/logos/iuc.png',
    },
    {
      degree: 'Diploma in Computer Science',
      institution: 'Mara University of Technology (UiTM)',
      location: 'Kuala Terengganu, Terengganu',
      period: 'Sept 2020 – Feb 2023',
      cgpa: '3.86',
      status: 'completed',
      link: 'https://www.uitm.edu.my/en/',
      logo: '/images/logos/uitm.png',
    },
  ],

  skills: [
    {
      category: 'Languages',
      skills: ['PHP', 'JavaScript', 'Python', 'SQL', 'GraphQL'],
    },
    {
      category: 'Back-End',
      skills: ['Laravel', 'CodeIgniter', 'WordPress'],
    },
    {
      category: 'Front-End',
      skills: ['Vue.js', 'Nuxt.js', 'Alpine.js', 'Livewire', 'Tailwind CSS', 'Bootstrap', 'jQuery'],
    },
    {
      category: 'Database',
      skills: ['MySQL (RDBMS)', 'SQLite (RDBMS)', 'DynamoDB (NoSQL)', 'Firebase (NoSQL)'],
    },
    {
      category: 'AWS Services',
      skills: ['SNS', 'SQS', 'ECS', 'S3', 'CloudWatch', 'SES', 'CodeCommit', 'CodePipeline', 'Lambda'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'GitHub', 'GitLab', 'Docker', 'CI/CD Pipelines', 'Postman', 'Jira', 'Forge', 'Vapor'],
    },
    {
      category: 'Testing',
      skills: ['Test-Driven Development (TDD)', 'PHPUnit', 'Web Application Testing', 'Unit Testing'],
    },
    {
      category: 'API Integration',
      skills: ['SenangPay', 'MyInvois LHDN', 'Storecove (Peppol)', 'TikTok Shop', 'Lazada', 'Shopee', 'Bravonet', 'Google Calendar', 'Zoom', 'Shopify'],
    },
    {
      category: 'Soft Skills',
      skills: ['Problem-solving', 'Analytical thinking', 'Communication', 'Team collaboration', 'Technical documentation', 'Project management'],
    },
  ],

  experience: [
    {
      title: 'Backend Engineer',
      company: 'Yoprint Software Sdn Bhd',
      period: 'Jun 2025 – Present',
      location: 'Claymont, Delaware, United States',
      workMode: 'Remote',
      impactMetric: '95% data mismatch reduction',
      link: 'https://www.yoprint.com/',
      logo: '/images/logos/yoprint.png',
      achievements: [
        'Architected and delivered a custom Shopify integration as part of YoPrint\'s core backend workflows, enabling real-time synchronization of orders, fulfilment, invoicing, and payments while eliminating manual operational handling and reducing data mismatches by 95%',
        'Introduced test-driven development practices to safeguard critical business logic and edge cases, achieving 85% test coverage and reducing regression defects by 25% as new backend features were introduced',
        'Maintained and stabilized existing backend systems by fixing production bugs, refactoring legacy logic, and cleaning up obsolete or redundant code, improving overall codebase readability, maintainability, and long-term system reliability',
        'Contributed to the implementation of a standardized factory and seeder framework to support shared development and validation workflows, reducing environment setup time by 70% and improving testing consistency across the backend team',
      ],
    },
    {
      title: 'Backend Developer',
      company: 'Biztory Cloud Sdn Bhd',
      duration: '1 Year 4 Months',
      period: 'Feb 2024 – May 2025',
      location: 'Puchong, Selangor',
      workMode: 'Remote',
      impactMetric: '50K+ daily transactions',
      link: 'https://biztory.com.my/',
      logo: '/images/logos/biztory.png',
      achievements: [
        'Joined during an ongoing migration from monolithic architecture to microservices and contributed by analysing service dependencies and refining service boundaries, supporting the decoupling of 5 core services and reducing technical debt by 40% while improving long-term maintainability',
        'Engineered third-party API integrations for E-Invoice and e-commerce platforms, processing over 50,000 transactions daily and reducing manual processing time by 30% through optimized webhook handling',
        'Optimized MySQL database queries handling millions of records, reducing execution time from over 1 minute to under 2 seconds and enabling significantly faster data retrieval for reporting and operational features',
        'Supported platform reliability and scalability by contributing to cloud infrastructure operations, maintaining 99.9% uptime for more than 3,000 active users across production workloads',
        'Established backend SOPs and coding standards and coordinated sprint planning using Jira, reducing troubleshooting time by 50% and delivering 90% of planned features on schedule',
      ],
    },
    {
      title: 'On-the-Job Training (K-Youth Program – Khazanah Nasional)',
      company: 'Ean Label Sdn Bhd',
      duration: '4 Months',
      period: 'Oct 2023 – Jan 2024',
      location: 'Kepong, Kuala Lumpur',
      workMode: 'On-site',
      impactMetric: '30% productivity increase',
      link: 'https://eanlabel.com.my/',
      logo: '/images/logos/eanlabel.png',
      achievements: [
        'Analysed operational inefficiencies in internal workflows and supported the integration of a CRM module into the existing system, improving task tracking and increasing productivity for operational teams by 30%',
        'Contributed to the reengineering of a SaaS product by improving backend structure and system usability, supporting better scalability and contributing to a 20% increase in user engagement',
        'Identified data flow and process logic issues during testing cycles and worked with the team to resolve them, resulting in smoother deployments and more consistent system behaviour after release',
        'Documented system setup processes and module usage to support onboarding and knowledge transfer, reducing reliance on ad hoc guidance and improving delivery clarity for subsequent team members',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'Appvolusi Sdn Bhd',
      duration: '1 Year',
      period: 'Sept 2022 – Sept 2023',
      location: 'Kajang, Selangor',
      workMode: 'Hybrid',
      impactMetric: '60% faster deployments',
      link: 'https://appvolusi.com/',
      logo: '/images/logos/appvolusi.png',
      achievements: [
        'Constructed server-side logic for healthcare custom platform, delivering custom reporting modules with performance analytics that reduced manual reporting time by 45% and improved decision-making with real-time operational and clinical data',
        'Programmed RESTful APIs with Laravel supporting front-end personalization and user segmentation, enabling targeted content delivery that increased user engagement by 20% across web and mobile applications',
        'Mentored 3 junior developers on REST API design, database modeling, and serverless deployments, elevating team code quality and accelerating sprint velocity by 20% through structured knowledge sharing',
        'Deployed scalable Laravel services using Laravel Forge and Vapor with integrated CI/CD automation, reducing deployment time by 60% and ensuring zero-downtime releases for time-sensitive campaigns',
      ],
    },
  ],

  projects: [
    {
      name: 'MyInvois LHDN E-Invoicing Integration',
      year: '2025',
      type: 'Integration',
      impactMetric: '10K+ monthly invoices',
      technologies: ['PHP', 'Laravel', 'LHDN API', 'Peppol', 'XML Processing'],
      achievements: [
        'Integrated back-end APIs with Malaysia\'s LHDN e-Invoicing system ensuring compliance with government regulations, processing 10,000+ invoices monthly with 99.5% success rate',
        'Streamlined invoicing workflow reducing submission time by 50% and eliminating manual data entry errors',
      ],
      link: 'https://sdk.myinvois.hasil.gov.my/api/',
    },
    {
      name: 'Jom Say Heart Healthcare Platform',
      year: '2023',
      type: 'Platform',
      impactMetric: '200+ practitioners served',
      technologies: ['Laravel', 'MySQL', 'RESTful API', 'Google Calendar API', 'Web Application Testing'],
      achievements: [
        'Designed comprehensive patient management system with appointment scheduling, data storage integration, and secure patient record handling, serving 200+ healthcare practitioners',
        'Implemented automated appointment reminders and calendar synchronization, reducing no-show rates by 35%',
      ],
      link: 'https://www.jomsayheart.com/',
    },
    {
      name: 'Resitku Receipt Management System',
      year: '2022',
      type: 'System',
      impactMetric: '40% faster data entry',
      technologies: ['Laravel', 'Bootstrap', 'MySQL', 'MVC Architecture'],
      achievements: [
        'Built web application for receipt management and financial reporting using MVC design pattern, generating automated profit/loss reports for small business owners',
        'Created responsive user interface with intuitive admin dashboard, reducing data entry time by 40%',
      ],
      link: 'https://resitku.com/',
    },
  ],

  certifications: [
    {
      name: 'Create a Website Using WordPress: Free Hosting & Sub-domain',
      provider: 'Coursera',
      year: '2023',
      link: 'https://www.coursera.org/account/accomplishments/verify/28ZSXREXU8VS',
      logo: '/images/logos/coursera.png',
    },
    {
      name: 'Build a Full Website using WordPress',
      provider: 'Coursera',
      year: '2023',
      link: 'https://www.coursera.org/account/accomplishments/verify/FZTS6FQRWBRT',
      logo: '/images/logos/coursera.png',
    },
    {
      name: 'Python Programming Bootcamp',
      provider: 'Khazanah Youth Development Program',
      year: '2023',
      link: 'https://drive.google.com/file/d/18MPYOgnXR_gyHKEbU-FWKdmPM97qawcj/view',
      logo: '/images/logos/khazanah.png',
    },
    {
      name: 'Master Laravel 11 & PHP: From Beginner to Advanced',
      provider: 'Udemy',
      year: '2025',
      link: 'https://www.udemy.com/certificate/UC-bfe04238-90d0-4d22-974a-d89ec269192a/',
      logo: '/images/logos/udemy.png',
    },
    {
      name: 'Vue Developer Bootcamp',
      provider: 'Udemy',
      year: '2025',
      link: 'https://www.udemy.com/certificate/UC-25a1f000-a45a-4b93-8181-2fcd3ccc7dea/',
      logo: '/images/logos/udemy.png',
    },
  ],

  testimonials: [
    {
      quote: "Akmal is one of my student in K-Youth Python programming bootcamp. He has that ease-to-work-with kind of developer trait as he practices satisfactory developer best practices, maintaining good script documentation and he really understand the workflow of his work. Not only that, personality wise he understands the point of view of his stakeholders in delivering solutions, that kind of a developer who understand a problem technical-wise and also within business context. I would recommend him to any hiring employers out there as he has shown remarkable competencies in Python, web application and data analysis skills. Wishing him the very best in his career journey!",
      author: 'Zahid Hamidi, PMP',
      role: 'Subsurface Data Scientist | Digital Energy Mentor',
      relationship: "was Akmal's teacher",
      date: 'October 5, 2023',
      linkedinUrl: 'https://www.linkedin.com/in/zahid-hamidi',
    },
  ],
}
