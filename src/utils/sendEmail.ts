import path from 'path';
import { ISendEmailOptions } from '../types/interface';
import ejs from 'ejs';
import nodemail from 'nodemailer';
import { ENV } from '../config/env';

const transporter = nodemail.createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: true,
  auth: {
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: ISendEmailOptions) => {
  try {
    const template = path.join(__dirname, `templates/${templateName}.ejs`);
    console.log(template);
    const html = await ejs.renderFile(template, templateData);
    await transporter.sendMail({
      from: ENV.SMTP_USER,
      to: to,
      subject: subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
