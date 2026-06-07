export interface Skill {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    link: string;
    createdAt?: Date;
    updatedAt?: Date;
}