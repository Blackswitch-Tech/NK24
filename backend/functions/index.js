const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");
app.use(cors());
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

exports.razorpayFunction = functions.https.onRequest(async (req, res) => {
  // Set CORS headers for all responses
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(204).send('');
    return;
  }

  // Ensure handling POST request
  if (req.method !== "POST") {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const path = req.path || '/';
  if (path === "/razorpay") {
    // Your Razorpay logic here
    let amount;
    try {
      const eventsSnapshot = await db.collection('events').get();
      eventsSnapshot.forEach((doc) => {
        if (doc.data().id === req.body.id) {
          amount = doc.data().regfee;
        }
      });

      if (amount) {
        const response = await razorpay.orders.create({
          currency: "INR",
          receipt: shortid.generate(),
          payment_capture: 1,
          amount: amount,
        });
        res.json({
          id: response.id,
          currency: "INR",
          amount: response.amount,
        });
      } else {
        res.status(404).send('Event not found');
      }
    } catch (e) {
      console.error("Error creating Razorpay order:", e);
      res.status(500).send("Unable to create order.");
    }
  } else {
    res.status(404).send('Not Found');
  }
});