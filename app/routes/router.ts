import { Request, Response, Router } from "express";
import { emailRouter } from "./email";

const v2ApiRoutes = Router();

v2ApiRoutes.get('/', (_req: Request, res: Response) => res.send('SAPIOWEB API v2'));
v2ApiRoutes.use('/email', emailRouter);

export { v2ApiRoutes };
