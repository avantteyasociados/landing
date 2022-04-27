'use strict';
const functions = require("firebase-functions");

const admin = require('Firebase-admin');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config()gmail.pass;

admin.initializeApp();

var goMail = function (message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: gmailEmail,
      pass: gmailPassword
    }
  });

  const mailOptions ={
    from: gmailEmail,
    to: 'esanchez@facturas.gt',
    subject:'Hello',
    text: '!' + message,
    html: '!' + message
  };
  const getDeliveryStatus = function (error, info){
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s',
     info.messageId);
  };

  transporter.sendMail(mailOPtions, getDeliveryStatus);
};

exports.onDataAdded = functions.database.ref('/emails/sessionId').onCreate(function (snap, context){
  const createdData = snap.val();
  var text = createdData.mail;
  goMail(text);
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
