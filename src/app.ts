import express from 'express';
import { router } from './routes';

class App {
    public exprss: express.Application;

    constructor(){
        this.exprss = express();


        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
       this.exprss.use(express.json());
    }

    private routes(): void {
        this.exprss.use(router);
    }
}

export const app = new App().exprss;