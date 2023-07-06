export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    tokens: string[],
    createdAt?: Date,
    updatedAt?: Date
}