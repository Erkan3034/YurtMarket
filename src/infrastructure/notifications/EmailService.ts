import nodemailer from "nodemailer";
import { logger } from "../../shared/utils/logger";

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async send(payload: SendEmailPayload) {
    await this.transporter.sendMail({
      from: `"Yurt Market" <${process.env.SMTP_USER}>`,
      ...payload,
    });
    logger.info("Email sent", { to: payload.to, subject: payload.subject });
  }
}

