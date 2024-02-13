import { redirect } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const options = {
    method: "POST",
    url: "https://corsanywhereapp-4f23bd6e01ee.herokuapp.com/https://asia-south1-nakshatra-9c45c.cloudfunctions.net/app/razorpay",
    headers: { "content-type": "application/json" },
    data: { id: token.eventid },
  };
  await axios
    .request(options)
    .then((t) => {
      const options = {
        key: process.env.REACT_APP_RZP_APIKEY,
        amount: token.amount,
        currency: t.data.currency,
        name: "Nakshatra 24",
        description: "Event Registration",

        order_id: t.data.id,

        image:
          "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/logos%2Fnk23logoblack.jpeg?alt=media&token=20bf02ff-8d1a-48db-9ae4-44a5e1d496e0",

        notes: {
          eventid: token.eventid,
          eventname: token.eventname,
          username: token.username,
          userid: token.uid,
          amount: token.amount,
          referral: token.ref,
          phone: token.phone,
          team: token.team,
        },

        theme: {
          color: "#1E1E1E",
        },

        handler: function (res) {
          if (res.razorpay_payment_id) {
            console.log(res);
            axios
              .post(
                "https://8b63-117-254-186-29.ngrok-free.app/nakshatra-9c45c/asia-south1/app/verify",
                {
                  headers: {
                    "content-type": "application/json",
                    "x-razorpay-signature": res.razorpay_signature,
                  },
                  data: {
                    payment_id: res.razorpay_payment_id,
                    order_id: res.razorpay_order_id,
                    event_id: token.eventid,
                    sign: res.razorpay_signature,
                    notes: token,
                  },
                }
              )
              .then((res) => {
                if(res.data.status === "ok"){
                  console.log("success");
                  alert("Payment Successful");
                  redirect("/dashboard");
                }
              })
              .catch((error) => {
                console.log(error);
              });
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
    })
    .catch((error) => {
      console.log(error);
    });
};
