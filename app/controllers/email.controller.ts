import { Exception } from "../modules/exception";
import { NextFunction, Request, Response } from "express";
import mailgun, { Mailgun } from 'mailgun-js';
import { validateEmail } from "../modules/validateEmail";
import { Exceptions } from "../enums";
import { config } from "dotenv";

class EmailController {
  private mg: Mailgun;

  constructor() {
    config();

    const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = process.env;

    if (!MAILGUN_DOMAIN || !MAILGUN_API_KEY) {
      throw new Exception({code: 400, message: Exceptions.MAILGUN_CONFIGURATION})
    }

    this.mg = mailgun({
      apiKey: MAILGUN_API_KEY,
      domain: MAILGUN_DOMAIN
    });
  }

  send = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {to, subject, text} = req.body;

      if (!validateEmail(to) || !to) {
        return next(new Exception({code: 400, message: Exceptions.INVALID_EMAIL}))
      }

      if (!text) {
        return next(new Exception({code: 400, message: Exceptions.EMAIL_TEXT_REQUIRED}))
      }

      const mailResponse = await this.mg.messages().send({
        from: 'Andreas Beasley <andreas@sapioweb.com>',
        to,
        subject,
        text
      });

      return res.json({
        success: true,
        message: mailResponse.message
      });
    } catch (e) {
      return next(new Exception({code: 400, message: e.message}));
    }
  }
}

export const emailController = new EmailController();
