import { Router } from "express";
import { emailController } from "../../controllers";

const emailRouter = Router();

emailRouter.post('/send', emailController.send);

export { emailRouter }
