/*const accountSid = "****************************";
const authToken = "****************************";
const client = require("twilio")(accountSid, authToken);
*/
require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");

const admin = require("firebase-admin");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const firebaseConfig = {
  type: "service_account",
  project_id: "nakshatra-9c45c",
  private_key_id: "42dc0b1ed0e8293b994c36b64e8de5c7a04ef275",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDP2tcP0AB0kuDf\nyMD7qz71oJzIHv42WSQBbPEomIqiw0kEp2qA3Tm6QfFST8gN5UjFsm3cYJvdgIIx\nwTX/kkMriCkjnUA0kb6LqtlOBu6x0DJLdwhnTDHXxq+74BzllNPNtnUPn6TL8u/F\nQm1n4phV1WTDiPR28aL0TQAsZTfQ1/NWegHzQvywsOOFTVY+uBpNjTG2JmwMrB9z\n8b7CTvWxoCv9YTJ9iJVct5b130zpfAbLg7Tho9MyIrvPbO6sIajMTurgBHo2CcXv\nqs4cVvudsVt7cGjUwdt0byDPiRKhb3ZH+T66ixfXjQPmJYqTvcVrDVWanvSbe/zo\nWrBtnna/AgMBAAECggEAWaymHVXVZHXb2+B+VfXPL2SwT2yDq4nwzUalkqihI1CS\nZ5YdDmSjW7bIeQUfn9McfuKYoDvz8u/W+8VKWS1OmnDfotRcl3GLnjFDGHVINOHI\nWSONNhe650d6mNk7TldTu8wsm+V50V3J0TZ0Ah5SL7Hli7DCG7DrZ2/zE7RFjO1e\n5kKIqJkOdjv4OfXBXP9Kok7i7RBePrjAqDFvOpf92ifTHgnjrxFKGLwy3lxYzRcJ\n0MshS2+5PRCW2yHZgjHeGxZ2PbHU4IIVUT+xg99Zqnc2t4KQPTwhBIuzTHhLEbDH\nKR10E0DrQyfkBjSBxEOx51LGTVzISGOWWL90yaThtQKBgQDzLzGhWcoILHu8nTnC\njMUsbQ2AlG+qRS6W5+8HrQFFyo6GBuZg2tR098H4t9IOJbWI0/MF6HZLgmqy16Pr\nt4z4E0FXsRRrve5e6TTfEigXH42dW7FvNlsEvmR9qGAKnv2vZlXHQExU3CtqCG6E\nCbjMEBIOSdqFIp0Ltmsq1y7GMwKBgQDazwPUXAQPzF6PrThyYf/4buD3jOTDNYCN\n1JnZ8hzb31uXMmLYnd1MbcHh0Sye5IQ0D1wdV5gCVcgWsknkCi9c/Il/+BnXLDhz\nFjlIUlT6brZohkpGS5EmltpNrkc58WpCQOL3Q+AYrsziypn5ydw2A10MTwhfHB80\nvE5+kwfJRQKBgGlz5p6kNAK1X3bb6wcdSgdIxtkiBQYd9+UCcFmwwOOFwaYG6fHI\nEuch5OA4vgLagUzzM+g09M8rn58r+W4m6x9MIkKnjEZoVyybDg1Jb08PpLY+48Np\nG7ED6sm+sN8KMNHVm47KqA8IZl8Vhu8E1DjRIzNE/VhMOTOyB+jM5QCXAoGBAKW0\n4VGR3gGY5IQqyvTVAuVCE11mdljfy9udhmZn1TMulE6M+g7SfyXCeXJq1z/+D6Dd\ngQU3sQcTr9SAcTUiAXyKRBeF7QvnkViXHAqJT5HZBotiKB3UXLi8xdbOhWJ8Udyb\nB0f7P1tyBfg7NyDUntDI+063C7/7rCZj9Y4mC1+BAoGAZJFqy0cnbkC3XTLXNwVz\nCWiczELV0aDLxQPKKK/n+ZDs7Arnj6cwTgJ9tOqv2gPfSNV2kb2UcYSstXmILEmP\nngiK0P5beQuC1raFHDX+Ta6dptuxVV+gtTFritdjVFg5/6Y3d5CUv1Q073P8OfnG\nlmmMlk/NwCNoWmL9L7lUDT0=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-t0t7y@nakshatra-9c45c.iam.gserviceaccount.com",
  client_id: "117342825850411420267",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-t0t7y%40nakshatra-9c45c.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});
const db = admin.firestore();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.use(cors());

// Alternative: To allow specific origins, replace '*' with an array of origins
// app.use(cors({
//   origin: ['http://example1.com', 'http://example2.com'],
// }));



app.get("/", (req, res) => {
  res.send("NK23 BACKEND v3");
});
let amount;
// No need to call cors() here again as it's already applied to all routes using app.use(cors());
app.post("/razorpay", async (req, res) => {
  const dataforevents = {
    "NK-70": "100",
    "NK-45": "1",
    "NK-71": "150",
    "NK-68": "80",
    "NK-53": "30",
    "NK-57": "1",
    "NK-24": "200",
    "NK-48": "100",
    "NK-44": "200",
    "NK-30": "100",
    "NK-03": "300",
    "NK-58": "150",
    "NK-49": "50",
    "NK-62": "60",
    "NK-10": "500",
    "NK-04": "40",
    "NK-65": "1",
    "NK-32": "30",
    "NK-59": "100",
    "NK-31": "50",
    "NK-19": "100",
    "NK-36": "30",
    "NK-43": "100",
    "NK-02": "30",
    "NK-74": "299",
    "NK-05": "2000",
    "NK-47": "40",
    "NK-54": "500",
    "NK-21": "80",
    "NK-60": "299",
    "NK-46": "100",
    "NK-26": "80",
    "NK-14": "30",
    "NK-34": "300",
    "NK-12": "50",
    "NK-40": "100",
    "NK-72": "100",
    "NK-06": "80",
    "NK-37": "30",
    "NK-41": "50",
    "NK-51": "50",
    "NK-67": "100",
    "NK-70": "100",
    "NK-61": "1",
    "NK-38": "50",
    "NK-50": "50",
    "NK-28": "75",
    "NK-22": "30",
    "NK-39": "80",
    "NK-73": "100",
    "NK-17": "500",
    "NK-27": "100",
    "NK-23": "600",
    "NK-18": "80",
    "NK-29": "80",
    "NK-55": "100",
    "NK-66": "500",
    "NK-11": "50",
    "NK-08": "30",
    "NK-13": "50",
    "NK-56": "50",
    "NK-33": "250",
    "NK-09": "100",
    "NK-35": "30",
    "NK-25": "400",
    "NK-63": "1",
    "NK-16": "100",
    "NK-64": "100",
    "NK-07": "200",
    "NK-52": "50",
    "NK-42": "30",
    "NK-15": "50",
  };
  console.log(req.body.id)
  try {
    const response = await razorpay.orders.create({
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
      amount: parseInt(dataforevents[req.body.id])*100, // Ensure amount is in the smallest currency unit (e.g., paise for INR)
    });
    res.json({
      id: response.id,
      currency: "INR",
      amount: response.amount,
    });
  } catch (e) {
    console.error("Error creating order:", e);
    res.status(500).send("Error creating order");
  }
});

// L

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

app.listen(1748, () => {
  console.log("Listening on port 1748");
});

exports.app = functions.region("asia-south1").https.onRequest(app);
