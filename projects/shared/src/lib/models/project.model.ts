export interface Project {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    link: string;
    github: string;
    categories: ProjectType[];
    createdAt?: Date;
    updatedAt?: Date;
}

export const ProjectCategories = ['All', 'Web Apps', 'UI Components', 'Full Stack', 'Backend POC', 'Others'] as const;

export type ProjectType = typeof ProjectCategories[number];