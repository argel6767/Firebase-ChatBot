const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { logger } = functions;

const db = admin.firestore();

exports.addUser = functions.https.onCall(async (data, context) => {
  try {
    const { userId } = data;

    if (!userId) {
        throw new functions.https.HttpsError('invalid-argument', 'User ID is required.');
    }

    // Create a new document with no fields under the chats collection
    const userRef = db.collection('chats');
    await admin.firestore().add(userId);

    return { message: 'User added to chat successfully!' };
} catch (error) {
    console.error('Error adding user to chat:', error);
    throw new functions.https.HttpsError('internal', 'Something went wrong!');
}
});