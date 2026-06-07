// import type { HeroSection } from 'shared';
// import { Project } from 'shared';

// export const ProfileData: HeroSection = {
//     isActive: true,
//     eyebrow: 'Full Stack Developer | .NET Core | SQL | C# | Angular | Azure',
//     headline: 'Building modern, polished portfolio experiences with Angular.',
//     subhead: 'Create a professional portfolio UI with dark glassmorphism, subtle motion, and clean section navigation.',
//     ctaLabel: 'Get in Touch',
//     ctaPath: '/contact',
//     location: 'India',
//     portfolioImageUrl: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     navLinks: [
//         {
//             id: 'home',
//             label: 'Home',
//             path: '/',
//         },
//         {
//             id: 'skills',
//             label: 'Skills',
//             path: '/skills',
//         },
//         {
//             id: 'projects',
//             label: 'Projects',
//             path: '/projects'
//         },
//         {
//             id: 'contact',
//             label: 'Contact',
//             path: '/contact'
//         }
//     ],
//     socialLinks: [
//         {
//             name: 'LinkedIn',
//             icon: 'L',
//             url: 'https://www.linkedin.com/in/anik-dakua',
//             socialType: 'LinkedIn'
//         },
//         {
//             name: 'GitHub',
//             icon: 'GIT',
//             url: 'https://github.com/test03',
//             socialType: 'GitHub'
//         },
//         {
//             name: 'Email',
//             icon: 'M',
//             url: 'test@gmail.com',
//             socialType: 'Email'
//         }
//     ],
//     techStacks: [
//         { name: 'C#', icon: 'C#', category: 'Language' },
//         { name: '.NET', icon: 'NET', category: 'Backend' },
//         { name: 'TypeScript', icon: 'TS', category: 'Language' },
//         { name: 'Angular', icon: 'A', category: 'Framework' },
//         { name: 'Microsoft Azure', icon: 'AZ', category: 'Cloud' }
//     ],
//     skillCategories: [
//         {
//             title: 'Backend & APIs',
//             items: [
//                 { name: '.NET', icon: 'NET', category: 'Framework' },
//                 { name: 'REST API', icon: 'REST', category: 'Framework' },
//                 { name: 'Azure Functions', icon: 'F', category: 'Framework' },
//                 { name: 'Microsoft SQL Server', icon: 'SQL', category: 'Db' },
//             ],
//         },
//         {
//             title: 'Frontend Development',
//             items: [
//                 { name: 'Angular', icon: 'A', category: 'Framework' },
//                 { name: 'TypeScript', icon: 'TS', category: 'Language' },
//                 { name: 'Tailwind CSS', icon: 'TSS', category: 'Framework' },
//             ],
//         },
//         {
//             title: 'Tools & Others',
//             items: [
//                 { name: 'Git & GitHub', icon: 'GIT', category: 'Tool' },
//                 { name: 'Microsoft Azure', icon: 'AZ', category: 'Cloud' },
//                 { name: 'Google Cloud Platform', icon: 'GCP', category: 'Cloud' },
//                 { name: 'Amazon Web Service', icon: 'AWS', category: 'Cloud' },
//                 { name: 'GitHub Copilot', icon: 'CO', category: 'Tool' },
//             ],
//         }
//     ],
//     updatedAt: new Date(),
//     displayName: 'gsgd',
//     email: 'sfsg',
//     createdAt: new Date(),
//     isDeleted: false
// };
// export const ProfileData2: HeroSection = {
//     isActive: false,
//     eyebrow: ' Angular | Azure',
//     headline: 'Building modern, polished portfolio experiences with Angular.',
//     subhead: 'Create a professional portfolio UI .',
//     ctaLabel: 'Get in Touch',
//     ctaPath: '/contact',
//     location: 'India',
//     portfolioImageUrl: 'https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     navLinks: [
//         {
//             id: 'home',
//             label: 'Home',
//             path: '/',
//         },
//         {
//             id: 'skills',
//             label: 'Skills',
//             path: '/skills',
//         },
//         {
//             id: 'projects',
//             label: 'Projects',
//             path: '/projects'
//         },
//         {
//             id: 'contact',
//             label: 'Contact',
//             path: '/contact'
//         }
//     ],
//     socialLinks: [
//         {
//             name: 'LinkedIn',
//             icon: 'L',
//             url: 'https://www.linkedin.com/in/',
//             socialType: 'LinkedIn'
//         },
//         {
//             name: 'GitHub',
//             icon: 'GIT',
//             url: 'https://github.com/',
//             socialType: 'GitHub'
//         },
//         {
//             name: 'Email',
//             icon: 'M',
//             url: 'test@gmail.com',
//             socialType: 'Email'
//         }
//     ],
//     techStacks: [
//         { name: 'C#', icon: 'C#', category: 'Language' },
//         { name: '.NET', icon: 'NET', category: 'Backend' },
//         { name: 'TypeScript', icon: 'TS', category: 'Language' },
//         { name: 'Angular', icon: 'A', category: 'Framework' },
//         { name: 'Microsoft Azure', icon: 'AZ', category: 'Cloud' }
//     ],
//     skillCategories: [
//         {
//             title: 'Backend & APIs',
//             items: [
//                 { name: '.NET', icon: 'NET', category: 'Framework' },
//                 { name: 'REST API', icon: 'REST', category: 'Framework' },
//                 { name: 'Azure Functions', icon: 'F', category: 'Framework' },
//                 { name: 'Microsoft SQL Server', icon: 'SQL', category: 'Db' },
//             ],
//         },
//         {
//             title: 'Frontend Development',
//             items: [
//                 { name: 'Angular', icon: 'A', category: 'Framework' },
//                 { name: 'TypeScript', icon: 'TS', category: 'Language' },
//                 { name: 'Tailwind CSS', icon: 'TSS', category: 'Framework' },
//             ],
//         },
//         {
//             title: 'Tools & Others',
//             items: [
//                 { name: 'Git & GitHub', icon: 'GIT', category: 'Tool' },
//                 { name: 'Microsoft Azure', icon: 'AZ', category: 'Cloud' },
//                 { name: 'Google Cloud Platform', icon: 'GCP', category: 'Cloud' },
//                 { name: 'Amazon Web Service', icon: 'AWS', category: 'Cloud' },
//                 { name: 'GitHub Copilot', icon: 'CO', category: 'Tool' },
//             ],
//         }
//     ],
//     updatedAt: new Date(),
//     displayName: 'gsgd',
//     email: 'sfsg',
//     createdAt: new Date(),
//     isDeleted: false
// };

// export const featuredProjects: Project[] = [
//     {
//         id: 'proj-1',
//         title: 'E-Commerce Platform',
//         description: 'A modern shopping platform with live inventory, secure checkout, and admin analytics dashboards.',
//         imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
//         tags: ['Angular', 'Firebase', 'Tailwind'],
//         link: 'https://example.com/ecommerce',
//         github: 'https://github.com/example/ecommerce-platform',
//         categories: [   ],
//         createdAt: new Date(2025, 8, 12),
//     },
//     {
//         id: 'proj-2',
//         title: 'Task Management Dashboard',
//         description: 'A collaboration dashboard for planning, tracking, and organizing team workflows in real time.',
//         imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
//         tags: ['Angular', 'RxJS', 'API'],
//         link: 'https://example.com/task-dashboard',
//         github: 'https://github.com/example/task-dashboard',
//         categories: ['Web Apps'],
//         createdAt: new Date(2025, 10, 4),
//     },
//     {
//         id: 'proj-3',
//         title: 'Component Library',
//         description: 'A reusable design system with accessible UI components, dark mode support, and visual consistency.',
//         imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
//         tags: ['Angular', 'Design System', 'UI'],
//         link: 'https://example.com/component-library',
//         github: 'https://github.com/example/component-library',
//         categories: ['UI Components'],
//         createdAt: new Date(2025, 6, 19),
//     },
//     {
//         id: 'proj-4',
//         title: 'Portfolio Landing Page',
//         description: 'A high-performance marketing landing page with animations, smooth scrolling, and conversion focus.',
//         imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
//         tags: ['Tailwind CSS', 'Responsive', 'Animations'],
//         link: 'https://example.com/portfolio',
//         github: 'https://github.com/example/portfolio-landing',
//         categories: ['Web Apps'],
//         createdAt: new Date(2025, 3, 2),
//     },
// ];
