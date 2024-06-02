const admin = require('firebase-admin');
admin.initializeApp();

const {addMessage} = require('./api/addmessage');

exports.addMessage = addMessage;
