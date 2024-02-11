const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

require('dotenv').config();
// Initialize Firebase Admin SDK
admin.initializeApp({
  

  
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  });


const db = admin.firestore();
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Configure CORS and body-parser
// Automatically allow cross-origin requests
app.use(bodyParser.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send("NK2 BACKEND v3");
});

let amount;
app.options("/razorpay", (req, res) => {  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).send("");
});
app.post("/razorpay", async (req, res) => {
  await db.collection('events').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().id === req.body.id) {
        amount = doc.data().regfee;
      }
    });
  });

  try {
    const response = await razorpay.orders.create({
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
      amount: amount,
    });
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.json({
      id: response.id,
      currency: "INR",
      amount: response.amount,
    });
  } catch (e) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    console.error("Error creating Razorpay order:", e);
    res.status(500).send("Unable to create order.");
  }
});

// Listen to the App Engine-specified port, or 8080 otherwise
const port = process.env.PORT || 1748;
app.listen(1748, () => {
  console.log(`Listening on port ${port}`);
});

exports.app = functions.region("asia-south1").https.onRequest(app);
