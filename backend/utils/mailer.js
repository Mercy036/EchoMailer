import nodemailer from 'nodemailer';
import { User } from '../models/user.models.js';

export async function sendMailFromUser(fromEmail, to, subject, text, html) {
  try {
    const user = await User.findOne({ email: fromEmail });
    if (!user) throw new Error('Sender email not found in database');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user.email,
        pass: user.appPassword,
      },
    });

    await transporter.sendMail({
      from: `"${user.email}" <${user.email}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent from ${user.email} to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}