const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");
const admin = require("firebase-admin");

admin.initializeApp();

const client = new vision.ImageAnnotatorClient();

exports.annotateImage = functions.region("asia-northeast3").https
    .onCall(async (data) => {
      if (!admin.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "annotateImage must be called while authenticated."
        );
      }

      try {
        return await client.annotateImage(JSON.parse(data));
      } catch (e) {
        throw new functions.https.HttpsError(
            "internal", e.message, e.detail
        );
      }
    });
