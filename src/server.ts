import express, { Express, NextFunction, Request, Response } from 'express';
import { AppRouters } from './routes/appRouter';

class App {

    private app: Express;
    private routes: AppRouters[]
    
    constructor(routes: AppRouters[]) {
        this.app = express();
        this.routes = routes
        this.initializeMiddlewares();
        this.initializeRoutes();

    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(function(req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            next();
         })
    }

    private initializeRoutes() {
        this.routes.forEach((route: AppRouters) => this.app.use(route.registerRoutes()))
        this.app.get('/', this.handleRootRequest);
    }

    private handleRootRequest(req: Request, res: Response) {
        res.send('Test');
    }

    public start(port: string | number) {
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}

export default App