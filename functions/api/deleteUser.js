const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { logger } = functions;

const db = admin.firestore();

exports.deleteUser = functions.https.onCall(async(data, context) => {
    try {
        const { userId } = data;
        if (!userId) {
            throw new functions.https.HttpsError("invalid-argument", "User ID is required.");
        }

        const userRef = db.collection("chats");
        await admin.firestore().doc(userId).delete();

        return { message: "User deleted successfully! "};

    }
    catch(error) {
        logger.error("Error adding message:", error);
        throw new functions.https.HttpsError (
            "unknown",
            "An error occured while adding the message",
            error.message
        );
    }
});