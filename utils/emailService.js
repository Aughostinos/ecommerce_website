import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
  },
  tls: {
      rejectUnauthorized: false
  }
});

export const sendResetEmail = async (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'augusitnos.nabil@gmail.com',
    subject: 'Password Reset',
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

    await transporter.sendMail(mailOptions);
};
