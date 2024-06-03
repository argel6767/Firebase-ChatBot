const admin = require('firebase-admin');
admin.initializeApp();

const {addMessage} = require('./api/addmessage');

const {addUser} = require("./api/addUser");

const {deleteUser} = require("./api/deleteUser");

exports.addMessage = addMessage;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
