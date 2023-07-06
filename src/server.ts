import express, { Express, Request, Response } from 'express';
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