export interface NavLink {
    id: string;
    label: string;
    path: string;
}

export interface HeroSection {
    id?: string;
    isActive: boolean;
    eyebrow: string;
    headline: string;
    displayName: string;
    email: string;
    subhead: string;
    ctaLabel: string;
    location: string;
    ctaPath: string;
    portfolioImageUrl: string | null;
    navLinks: NavLink[];
    socialLinks: SocialLink[];
    techStacks: TechStackItem[];
    skillCategories: SkillCategory[];
    isDeleted: boolean; // soft removal
    createdAt: Date;
    updatedAt: Date;
}

export const SocialTypes = ["LinkedIn", "GitHub", "Email", "Website"] as const;

export type SocialType = typeof SocialTypes[number];

export interface SocialLink {
    name: string;
    icon: string;
    url: string;
    socialType: SocialType;
}

export interface TechStackItem {
    name: string;
    icon: string;
    category: string;
}

export interface SkillItem {
    name: string;
    icon: string;
    category: string;
}

export interface SkillCategory {
    title: string;
    items: SkillItem[];
}
