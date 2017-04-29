import * as nodemailer from 'nodemailer';
import logger from './logger';

const fromName = process.env.FROM_EMAIL_NAME;
const fromEmail = process.env.FROM_EMAIL_ADDRESS;
const fromPass = process.env.FROM_EMAIL_PASSWORD;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromEmail,
        pass: fromPass
    }
});

export async function sendMail(recipients: string[], subject: string, text: string, html: string) {
  let mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: recipients.join(','),
      subject,
      text,
      html
  };

  let info = await transporter.sendMail(mailOptions);
  logger.info('Message %s sent: %s', info.messageId, info.response);
}