import { User } from "@prisma/client"

export interface UserValidationReturn {
    user: User,
    token: string
}