import { Request } from "express"

export const pagination = (req: Request) => {
    let take: number | undefined, skip: number | undefined = undefined
    if (req.query.limit && typeof req.query.limit === 'string') take = parseInt(req.query.limit, 10)
    if (req.query.skip && typeof req.query.skip === 'string') skip = parseInt(req.params.skip, 10)

    return { take, skip }
}