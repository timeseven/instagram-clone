import nodemailer from "nodemailer";
import { ISendEmail } from "../config/interface";

export const sendEmail = async (data: ISendEmail) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Instagram by even" <${process.env.MAIL_ID}>`, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <33afe0da-1ce3-16e4-5691-f3c51bdcb985@gmail.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
