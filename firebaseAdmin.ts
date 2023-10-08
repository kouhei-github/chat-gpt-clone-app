import admin from "firebase-admin"

if(admin.apps.length === 0){
  admin.initializeApp({
    credential: admin.credential.cert("./firebase-admin.json")
  });
}

const adminDb = admin.firestore()
export { adminDb }
