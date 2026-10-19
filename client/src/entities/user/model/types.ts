export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    lastTimeOnline: Date;
    logoUrl: string;
}