export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    lastTimeOnline: Date;
    logoUrl: string;
    username: string;
}

export interface GetUserResponse {
    success: boolean;
    user: User;
}