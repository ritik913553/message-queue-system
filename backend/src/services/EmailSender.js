import nodemailer from "nodemailer";

import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })



export const sendEmail = async (to, subject, htmlContent) => {
  console.log("Sending email to:", to);
  console.log("Email subject:", subject);
  console.log("Email configuration loaded from .env file", process.env.EMAIL_USER);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
