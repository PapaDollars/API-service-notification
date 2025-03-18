// email-verification-service/services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const sendVerificationEmail = async (email, code) => {

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_NOTIFY_USER,
        pass: process.env.EMAIL_NOTIFY_PASSWORD,
      }
  });
  
  const mailOptions = {
    from: {
      name: "Kairos notify",
      address: process.env.EMAIL_NOTIFY_USER,
    },
    to: email,
    subject: 'Vérification de votre adresse G-mail',
    text: "Ce ci est votre code de vérification unique",
    html: `<p>Votre code de vérification unique est : <h2>${code}</h2></p>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    } else {
      console.log('E-mail envoyé avec succès ');
    }
  });
};
