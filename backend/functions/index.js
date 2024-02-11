const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");


// Initialize Firebase Admin SDK
admin.initializeApp({
  apiKey: "AIzaSyAsSfJbJUxNflxSvGXS1Uzkv7ZU5jv0P8M",
  authDomain: "nakshatra-9c45c.firebaseapp.com",
  projectId: "nakshatra-9c45c",
  storageBucket: "nakshatra-9c45c.appspot.com",
  messagingSenderId: "203297675242",
  appId: "1:203297675242:web:c8cbef31c9890871324493",
  measurementId: "G-8MQPTG1Y07"
});

const db = admin.firestore();
const razorpay = new Razorpay({
  key_id: "rzp_test_2E3CGjPItUa2Ee",
  key_secret: "W9SnUEGR1KjlCyJhxw8ibejD",
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
