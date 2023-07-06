import { User } from "@prisma/client"
import { UserNonSensitiveData } from "./noSensitiveData.interface"

export interface UserValidationReturn {
    user: UserNonSensitiveData,
    token: string
}