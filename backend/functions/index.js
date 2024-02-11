/** 
const accountSid = "****************************";
const authToken = "****************************";
const client = require("twilio")(accountSid, authToken);
*/
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getFirestore, collection, query, where, getDocs } =require( "firebase-admin/firestore");
app.use(cors());

const admin = require("firebase-admin");
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const razorpay = new Razorpay({
  key_id: "rzp_test_2E3CGjPItUa2Ee",
  key_secret: "W9SnUEGR1KjlCyJhxw8ibejD",
});

app.get("/", (req, res) => {
  res.send("NK2 BACKEND v3");
});
let amount;

app.post("/razorpay", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const q = query(collection(db, "events"), where("id", "==", res.body.id));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  try {
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
  } catch (e) {
    console.log("cant get order id");
  }
});
/** 
app.post("/verification", (req, res) => {
  try {
    const secret = "2234172";

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
      console.log("request is legit");
      if (req.body.payload.payment.entity?.notes?.app !== "isApp") {
        try {
          client.messages
            .create({
              from: "whatsapp:+14155238886",

              // body
              body: `Hey ${
                req.body.payload.payment.entity?.notes?.username
              }, Welcome to _*Nakshatra23*_!\nYour registration for the event *${
                req.body.payload.payment.entity?.notes?.eventname
              }* has been processed succesfully your registration ID is *${
                req.body.payload.payment.entity?.notes?.userid +
                req.body.payload.payment.entity?.notes?.eventid
              }*\nWe are excited to see you soon !`,
              // body

              mediaUrl: "https://upcdn.io/W142hhQ/raw/msgbanner.jpg",
              to: `whatsapp:+91${req.body.payload.payment.entity?.notes?.whatsapp}`,
            })
            .then((message) => console.log(message.sid));
        } catch (e) {
          console.log("wtspFail" + e);
        }

        try {
          db.collection("Events")
            .doc(req.body.payload.payment.entity?.notes?.eventid)
            .update({
              spots: admin.firestore.FieldValue.increment(-1),
            });
        } catch (e) {
          console.log("Failed to update spots: " + e);
        }

        try {
          db.collection("users")
            .doc(req.body.payload.payment.entity?.notes?.userid)
            .update({
              registered: admin.firestore.FieldValue.arrayUnion(
                req.body.payload.payment.entity.notes.eventid
              ),
            });
        } catch (e) {
          console.log("failedToAdduserEvent: " + e);
        }

        try {
          if (req.body.payload.payment.entity.notes?.referral !== "nor") {
            db.collection("users")
              .where(
                "refcode",
                "==",
                req.body.payload.payment.entity.notes?.referral
              )
              .get()
              .then((docu) => {
                docu.forEach((_doc) => {
                  if (_doc.exists) {
                    db.collection("users")
                      .doc(_doc.data().uid)
                      .update({
                        refcount: admin.firestore.FieldValue.increment(1),
                      });
                  }
                });
              });
          }
        } catch (e) {
          console.log(e);
        }

        try {
          console.log(req.body.payload.payment.entity?.notes);
          db.collection("Registrations")
            .doc(
              `${req.body.payload.payment.entity?.notes.userid}${req.body.payload.payment.entity?.notes.eventid}`
            )
            .set({
              eventid: req.body.payload.payment.entity?.notes.eventid,
              eventname: req.body.payload.payment.entity?.notes.eventname,
              userid: req.body.payload.payment.entity?.notes.userid,
              username: req.body.payload.payment.entity?.notes.username,
              refcode: req.body.payload.payment.entity?.notes.referral,
              payment_id: req.body.payload.payment.entity?.id,
              order_id: req.body.payload.payment.entity?.order_id,
              method: req.body.payload.payment.entity?.method,
              amount: req.body.payload.payment.entity?.notes.amount,
              team: req.body.payload.payment.entity?.notes.team,
              whatsapp: req.body.payload.payment.entity?.notes.whatsapp,
            });
        } catch (e) {
          console.log("addingFail: " + e);
        }
      }
      try {
        db.collection("EventRegs")
          .doc(req.body.payload.payment.entity?.notes.eventid)
          .update({
            registrations: admin.firestore.FieldValue.arrayUnion(
              req.body.payload.payment.entity.notes.userid
            ),
          });
      } catch (e) {
        console.log("eventRegPushFail: " + e);
      }
    } else {
      console.log("invalid");
    }
    console.log(req.body.payload.payment.entity?.notes);
    res.json({ status: "ok" });
  } catch (e) {
    console.log("Verification fail");
  }
});
*/
app.listen(1748, () => {
  console.log("Listening on port 1748");
});

exports.app = functions.https.onRequest(app);
