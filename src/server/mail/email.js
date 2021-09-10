import nodemailer from 'nodemailer';
import passwordResetTemplate from './emails/passwordReset.js';
import newUserTemplate from './emails/newUser.js';
import welcomeEmail from './emails/welcomeEmail.js';

import key from '../config/mailer.json';

async function send(email, message, subject) {
  let transporter = nodemailer.createTransport({
    host  : 'smtp.gmail.com',
    port  : 465,
    secure: true,
    auth  : {
      type         : 'OAuth2',
      user         : 'admin@checkyourhabit.com',
      serviceClient: key.client_id,
      privateKey   : key.private_key
    }
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from   : 'admin@checkyourhabit.com',
      to     : email,
      subject: subject,
      text   : 'This is an html email. Please open with HTML viewer',
      html   : message
    });
  } catch (err) {
    console.error(err);
  }
}


function passwordReset(emailTo, token) {
  let message = passwordResetTemplate(token);

  send(emailTo, message, 'Password Reset');
}

function newUserEmail(emailTo, name) {
  send('admin@checkyourhabit.com', newUserTemplate(emailTo, name), 'New User');

  send(emailTo, welcomeEmail(name), 'Welcome to CheckYourHabit');
}

function feedbackEmail(content, name, email) {
  send('admin@checkyourhabit.com', `${content}`, `New feedback from ${name} (${email})`);
}

export {
  passwordReset,
  newUserEmail,
  feedbackEmail
};
