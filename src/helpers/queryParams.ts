import { Request } from "express"

export const filterAndSortParams = (req: Request) => {
    let sort = {}
    let where: {authorId?: string, done?: boolean} = {}
    //if (req.user.authorId && typeof req.user.authorId === 'string') where.authorId = req.user.authorId
    if (req.query.done && typeof req.query.done === 'boolean') where.done = req.query.done
    if (req.query.sortBy && typeof req.query.sortBy === 'string') {
            const sortKeyValue = req.query.sortBy.split("_")
            const key = sortKeyValue[0]
            const value = sortKeyValue[1]
            sort = { [key]: value === "asc" ? 'asc' : 'desc' }  
    }

    return { sort, where }
}