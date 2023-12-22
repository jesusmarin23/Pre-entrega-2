const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(fs.readFileSync('../bdFirebase/segundaentrega-af399-firebase-adminsdk-2ddvt-03fab53308.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//exporto la db para poder usarla en server.js
module.exports = db;