import express, { Express, json, urlencoded } from 'express';
import { exceptionHandler } from "./modules/exceptionHandler";
import { v2ApiRoutes } from "./routes/router";
import cors from 'cors';

export class Server {
  app: Express;

  constructor() {
    this.app = express();
    this.mountBodyParser();
    this.mountCors();
    this.mountRoutes();
    this.mountExceptionHandler();
  }

  private mountCors = () => {
    this.app.use(cors())
  };

  private mountBodyParser = () => {
    this.app.use(urlencoded({extended: true}));
    this.app.use(json());
  };

  private mountRoutes = () => {
    this.app.use('/v2', v2ApiRoutes);
  };

  private mountExceptionHandler = () => {
    this.app.use(exceptionHandler);
  }
}
