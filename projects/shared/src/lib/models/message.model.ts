export interface MessageDetail {
    id?: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    isDeleted: boolean;
    updatedAt: Date;
}