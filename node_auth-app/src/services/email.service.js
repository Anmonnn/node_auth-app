import nodemailer from 'nodemailer';
import 'dotenv/config.js';

// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=alivonesconfirmation@gmail.com
// SMTP_PASSWORD=pifzmjnycasklqjq

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
// send mail with defined transport object
const send = ({ email, subject, html }) => {
  // from: process.env.SMTP_USER, // sender address
  // to: "bar@example.com, baz@example.com", // list of receivers
  console.log('email problem', email)

  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
}


// console.log("Email is sent");

function sendActivationEmail(email, token) {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`
  const html = `
  <h1>Activate account<h1>
  <a href="${href}">${href}</a>
  `

  return send({
    email, html, subject: 'Activate'
  })
}

export const emailService = {
  sendActivationEmail,
  send
}
