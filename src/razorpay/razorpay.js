import { redirect } from "react-router-dom";
import axios from "axios";
const loadScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (token) => {
  const res = await loadScript();

  if (!res) {
    alert("Payment Failed");
    return;
  }

  const eventFee = {
    amount: parseInt(token.amount) * 100,
  };
  const data = await fetch("https://asia-south1-nk23-a5689.cloudfunctions.net/app/razorpay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:  eventFee ,
  })
    .then((t) => t.json())
    .catch((error) => {
      console.log(error);
    });

  const options = {
    key: process.env.REACT_APP_RZP_APIKEY,
    amount: token.amount,
    currency: data.currency,
    name: "Nakshatra23",
    description: "Event Registration",

    order_id: data.id,

    image:
      "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/logos%2Fnk23logoblack.jpeg?alt=media&token=20bf02ff-8d1a-48db-9ae4-44a5e1d496e0",

    notes: {
      eventid: token.eventid,
      eventname: token.eventname,
      username: token.username,
      userid: token.uid,
      amount: token.amount,
      referral: token.ref,
      whatsapp: token.whatsapp,
      team: token.team,
    },

    theme: {
      color: "#1E1E1E",
    },

    handler: function (res) {
      if (res.razorpay_payment_id) {
        console.log("sucess");
      } else {
        console.log("failed");
      }
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed", function (res) {
    alert("payment failed");
  });
};
