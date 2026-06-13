export interface Project {
    id?: string;
    isActive: boolean;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    liveLink: string;
    githubLink: string;
    categories: ProjectType[];
    isDeleted: boolean; // soft removal
    createdAt: Date;
    updatedAt: Date;
}

export const ProjectCategories = ['All', 'Web Apps', 'UI Components', 'Full Stack', 'Backend', 'Others'] as const;

export type ProjectType = typeof ProjectCategories[number];