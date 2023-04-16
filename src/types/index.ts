export interface User {
    id?: number; // pk auto_increment
    name: string;
    email: string;
    password?: string;
    _created?: string | Date;
}

export interface Chirp {
    id?: number; // pk auto_increment
    userid: number; // fk refs User.id
    content: string;
    location?: string;
    _created?: string | Date;
}