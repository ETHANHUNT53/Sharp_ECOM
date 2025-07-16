require("dotenv").config();
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const axios = require("axios");

exports.initiatePayment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // console.log("📩 Payment payload received:", req.body);

      // Get Access Token
      const tokenRes = await axios.post(
        "	https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
        require("qs").stringify({
          client_id: process.env.CLIENT_ID,
          client_version: "1",
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // console.log("tokenRes", tokenRes);
      const accessToken = tokenRes.data.access_token;
      // console.log("✅ Access token:", accessToken);

      // Payment Payload
      const merchantOrderId = "TX" + Date.now();
      const paymentPayload = {
        merchantOrderId,
        amount: req.body.amount || 1000, // Use 1000 paise (₹10) as default
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Payment message used for collect requests",
          merchantUrls: {
            redirectUrl: "https://www.sharpindustries.org.in/order-summary",
          },
        },
      };

      // console.log("🚀 Sending to PhonePe:", paymentPayload);

      const paymentResponse = await axios.post(
        "https://api.phonepe.com/apis/pg/checkout/v2/pay",
        paymentPayload,
        {
          headers: {
            Authorization: `O-Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("✅ Payment initiated. Response:", paymentResponse.data);

      return res.status(200).json({
        redirectUrl: paymentResponse.data.redirectUrl,
      });
    } catch (err) {
      console.error("❌ Payment initiation failed:");
      console.error("🔍 Error message:", err.message);
      console.error("📄 Response data:", err.response?.data);
      return res.status(500).json({ error: "Failed to initiate payment" });
    }
  });
});
