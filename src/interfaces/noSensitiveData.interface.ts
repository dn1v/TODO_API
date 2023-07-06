export class UserNonSensitiveData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || ''
        this.firstName = obj && obj.firstName || ''
        this.lastName = obj && obj.lastName || ''
        this.email = obj && obj.email || ''
        this.createdAt = obj && obj.createdAt || new Date()
        this.updatedAt = obj && obj.updatedAt || new Date()
    }
}

