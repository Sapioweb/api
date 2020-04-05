import express, { Express, json, Request, Response, urlencoded } from 'express';
import { exceptionHandler } from "./modules/exceptionHandler";
import { Exception } from "./modules/exception";
import { Exceptions } from "./enums";
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
    this.app.all('*', (_req: Request, _res: Response, next) => next(new Exception({
      code: 404,
      message: Exceptions.NOT_FOUND
    })));
    this.app.use('/v2', v2ApiRoutes);
  };

  private mountExceptionHandler = () => {
    this.app.use(exceptionHandler);
  }
}
