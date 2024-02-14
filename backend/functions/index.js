require("dotenv").config();
const accountSid = process.env.SSID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const shortid = require("shortid");
const bodyParser = require("body-parser");
const cors = require("cors");

const admin = require("firebase-admin");
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get("/", async (req, res) => {
  res.send("NK23 BACKEND v3");
  const eventRef = db.collection("events").doc("NK-03");

  const doc = await eventRef.get();
  console.log(doc);
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
  console.log(req.body.id);
  try {
    const response = await razorpay.orders.create({
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
      amount: parseInt(dataforevents[req.body.id]) * 100, // Ensure amount is in the smallest currency unit (e.g., paise for INR)
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


app.post("/verify", async (req, res) => {
  if (
    validatePaymentVerification(
      {
        order_id: req.body.data.order_id,
        payment_id: req.body.data.payment_id,
      },
      req.body.data.sign,
      "W9SnUEGR1KjlCyJhxw8ibejD"
    )
  ) {
    const notes = req.body.data.notes; // Centralized reference for ease of access

    // Send WhatsApp message

    // Update slots left for the event
    const eventRef = db.collection("events").where("id", "==", notes.eventid);

    try {
      const querySnapshot = await eventRef.get();

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        let currentSlots = doc.data().slots_left;
        let newSlots = parseInt(currentSlots, 10) - 1;

        if (!isNaN(newSlots)) {
          // Convert newSlots back to a string and update the document
          await db.collection("events").doc(doc.id).update({
            slots_left: newSlots.toString(),
          });
          console.log(
            "Updated slots_left successfully for document with ID:",
            doc.id,
            "to",
            newSlots
          );
        } else {
          console.error(
            "Current slots_left value is not a valid number for document with ID:",
            doc.id
          );
        }
      });
    } catch (error) {
      console.error("Error updating slots_left:", error);
    }

    // Update user's registered events
    const userRef = db.collection("users").doc(notes.uid);

    try {
      const doc = await userRef.get();

      if (doc.exists) {
        // Get the current array or initialize it as an empty array if it doesn't exist
        const currentRegistered = doc.data().registered || [];

        // Check if the eventId is already in the array to avoid duplicates
        if (!currentRegistered.includes(notes.eventid)) {
          // Add the eventId to the array
          const updatedRegistered = [...currentRegistered, notes.eventid];

          // Update the document with the new array
          await userRef.update({
            registered: updatedRegistered,
          });
          console.log("Updated registered events for user:", notes.uid);
        } else {
          console.log("EventId already registered for user:", notes.uid);
        }
      } else {
        console.log("No such document exists with UID:", notes.uid);
      }
    } catch (error) {
      console.error("Error updating registered events for user:", error);
    }

    try {
      if (notes.ref && notes.ref !== "nor") {
        db.collection("campusAmb")
          .where("cacode", "==", notes.ref)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              // No document found with the provided cacode
              console.log(
                "No document found with the provided cacode:",
                notes.ref
              );
            } else {
              // Document(s) with the cacode exist, proceed to increment refcount
              querySnapshot.forEach((doc) => {
                const docRef = db.collection("campusAmb").doc(doc.id); // Reference to the specific document
                docRef
                  .update({
                    refcount: admin.firestore.FieldValue.increment(1), // Increment refcount by 1
                  })
                  .then(() => {
                    console.log("Incremented refcount for cacode:", notes.ref);
                  })
                  .catch((error) => {
                    console.error("Error incrementing refcount:", error);
                  });
              });
            }
          })
          .catch((error) => {
            console.error("Error querying for cacode:", error);
          });
      } else {
        console.log('CACode is not provided or set to default value "nor".');
      }
    } catch (error) {
      console.error("Error incrementing refcount:", error);
    }

    // Add registration details
    try {
      await db
        .collection("Registrations")
        .doc(`${notes.nkid}-${notes.eventid}`)
        .set({
          eventid: notes.eventid,
          eventname: notes.eventname,
          email: notes.email,
          id: notes.uid,
          nkid: notes.nkid,
          online: true,
          username: notes.username,
          refcode: notes.ref,
          payment_id: req.body.data.payment_id,
          attended: false,
          team: notes.team,
          phone: notes.phone,
        });
      console.log("Added registration details for:", notes.userid);
    } catch (error) {
      console.error("Error registering user:", error);
    }
    // Update event registrations
    try {
      const eventRegRef = db.collection("EventRegs").doc(notes.eventid);

      eventRegRef
        .get()
        .then((doc) => {
          // Initialize the registrations object to hold arrays keyed by eventid
          let registrations = {};

          if (doc.exists) {
            // Document exists, fetch its data
            registrations = doc.data().registrations || {};
          }

          // Ensure there's an array for the current eventid, then check for and add the userid if not already present
          registrations[notes.eventid] = registrations[notes.eventid] || [];
          if (
            !registrations[notes.eventid].includes(
              `${notes.nkid}-${notes.eventid}`
            )
          ) {
            registrations[notes.eventid].push(`${notes.nkid}-${notes.eventid}`);

            // Update or create the document with the updated registrations object
            eventRegRef
              .set({ registrations }, { merge: true })
              .then(() =>
                console.log("Updated event registrations for:", notes.eventid)
              )
              .catch((error) =>
                console.error("Error updating event registrations:", error)
              );
          } else {
            console.log("Userid already registered for event:", notes.eventid);
          }
        })
        .catch((error) => console.error("Error fetching document:", error));
    } catch (error) {
      console.error("Error updating event registrations:", error);
    }
    res.json({ status: "ok" });
  } else {
    res.json({ status: "Error" });
  }
});

app.listen(1748, () => {
  console.log("Listening on port 1748");
});

exports.app = functions.region("asia-south1").https.onRequest(app);
