const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const templates = require('../templates/template');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('email');
});

// router.post('/send-email', (req, res, next) => {
//   const { email, subject, message } = req.body;
//   res.render('message', { email, subject, message })
// });

router.post('/send-email', (req, res, next) => {
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAILACC,
      pass: process.env.EMAILPASS,
    }
  });
  transporter.sendMail({
    from: 'yandygonzalez@gmail.com',
    to: email, 
    subject: subject, 
    html: templates.templateExample(message),
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});

module.exports = router;
