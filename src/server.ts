import express, { Router } from 'express'
import { Request, Response, Application } from 'express'
// import userRouter from './routes/user'
// import taskRouter from "./routes/task"
// const app: Application = express()

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)
// app.get('/', (req: Request, res: Response) => {
//     res.send('Test')
// })

//export default app

export class App {
    private app: Application
    port: any
    routers: Router[]

    constructor(routers: Router[], port: any) {
        this.app = express()
        this.routers = routers
        this.port = port
        this.init()
    }

    private init() {
        this.middlewaresSetup()
        this.routesSetup()
    }

    private middlewaresSetup(): void {
        this.routers.forEach((router: Router) => this.app.use(router))
    }

    private routesSetup() {
        this.app.use(express.json())
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log('Server is up on port', this.port)
        }).on('error', (e: Error) => {
            console.log('Error while starting the server: ', e.message)
        })
    }
}