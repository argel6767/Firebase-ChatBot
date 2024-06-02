const admin = require('firebase-admin');
admin.initializeApp();

const {addMessage} = require('./api/addmessage');

const {addUser} = require("./api/addUser");

exports.addMessage = addMessage;
exports.addUser = addUser;
