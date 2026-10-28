export interface User {
    role: "user" | "admin";
    name: string;
    surname: string;
    username: string;
    email: string;
    about: string | null;
    lastTimeOnline: Date;
    logoUrl: string | null;
    phoneNumber: string | null;
}

export interface GetUserResponse {
    success: boolean;
    user?: User;
}

export interface GetUserCountResponse {
    success: boolean;
    total?: {
        total: number;
        onlineTotal: number;
    };
}