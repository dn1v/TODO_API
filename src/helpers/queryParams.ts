import { Request } from "express"

export const filterAndSortParams = (req: Request) => {
    let sort = {}
    let where: {authorId?: string, done?: boolean} = {}
    if (req.query.authorId && typeof req.query.authorId === 'string') where.authorId = req.query.authorId
    if (req.query.done && typeof req.query.done === 'boolean') where.done = req.query.done
    if (req.query.sortBy && typeof req.query.sortBy === 'string') {
            const sortKeyValue = req.query.sortBy.split("_")
            const key = sortKeyValue[0]
            const value = sortKeyValue[1]
            sort = { [key]: value === "asc" ? 'asc' : 'desc' }  
    }

    return { sort, where }
}