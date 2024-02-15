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

export const displayRazorpay = async (token,nav,pathnn) => {

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
          "https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/NK24logo.webp?alt=media&token=eee01aaf-eba2-4cfb-a49f-d0456b50bc51",

        notes: {
          eventid: token.eventid,
          eventname: token.eventname,
          username: token.username,
          email: token.email,
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
            axios
              .post(
                "https://asia-south1-nakshatra-9c45c.cloudfunctions.net/app/verify",
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
                  alert("Payment Successful");
                  nav("/dashboard");
                }
              })
              .catch((error) => {
                //Add to alert about Error Type
              });
          } else {
            //Add For Alerting About Failure
          }
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (res) {
        alert("Payment failed, Please Refresh to try again");
        
      });
    })
    .catch((error) => {
    });
};
