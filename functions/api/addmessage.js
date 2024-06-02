const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { logger } = functions;

exports.addMessage = functions.https.onCall(async (data, context) => {
    try {
        logger.log("Recevied messsage request data:", data);

        if (!data.text || !data.userId) {
            logger.log("Required fields (text or userId) are missing");
            throw new functions.https.HttpsError (
                "invalid argument",
                "Required fields (text or userId)"
            );
        }


        const { text, userId} = data;
        const messageData = {
            text,
            userId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };

        const messageRef = await admin
            .firestore()
            .collection("chats")
            .doc(userId)
            .collection("messages")
            .add(messageData);
        logger.log("Message added successfully, message ID:", messageRef.id);

        return { status: "success", messageId: messageRef.id };
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