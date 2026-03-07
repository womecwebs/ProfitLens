import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialization for Firebase
let db: admin.firestore.Firestore | null = null;
function getFirestore() {
  if (!db && process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      }
      db = admin.firestore();
    } catch (e) {
      console.error("Firebase initialization failed:", e);
    }
  }
  return db;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const PESAPAL_BASE_URL =
    process.env.PESAPAL_SANDBOX === "true"
      ? "https://cybqa.pesapal.com/pesapalv3"
      : "https://pay.pesapal.com/pesapalv3";

  // Pesapal Auth Token
  async function getPesapalToken() {
    const response = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
      }),
    });
    const data = await response.json();
    return data.token;
  }

  // Register IPN with Pesapal
  app.get("/api/pesapal/register-ipn", async (req, res) => {
    try {
      const token = await getPesapalToken();

      const response = await fetch(
        `${PESAPAL_BASE_URL}/api/URLSetup/RegisterIPN`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            url: `${process.env.APP_URL}/api/pesapal/ipn`,
            ipn_notification_type: "POST",
          }),
        },
      );

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to register IPN" });
    }
  });

  // Initiate Pesapal Payment
  app.post("/api/pesapal/initiate", async (req, res) => {
    try {
      const token = await getPesapalToken();
      const { amount, userId, email } = req.body;
      const callbackUrl = `${process.env.APP_URL}/api/pesapal/callback`;

      const orderRequest = {
        id: `order_${userId}_${Date.now()}`,
        currency: "USD",
        amount: amount || 29,
        description: "ProfitLens Pro Subscription",
        callback_url: callbackUrl,
        notification_id: process.env.PESAPAL_IPN_ID,
        billing_address: {
          email_address: email || "user@example.com",
        },
      };

      const response = await fetch(
        `${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderRequest),
        },
      );

      const data = await response.json();
      res.json(data); // Contains redirect_url and order_tracking_id
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Pesapal Callback
  app.get("/api/pesapal/callback", async (req, res) => {
    const { OrderTrackingId, OrderMerchantReference } = req.query;
    // Redirect user back to the app success page
    res.redirect(`/success?tracking_id=${OrderTrackingId}`);
  });

  // Pesapal IPN Listener
  app.post("/api/pesapal/ipn", async (req, res) => {
    const { OrderTrackingId, OrderNotificationType } = req.body;
    const firestore = getFirestore();

    if (!firestore) return res.status(500).end();

    try {
      const token = await getPesapalToken();
      const response = await fetch(
        `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const statusData = await response.json();

      if (statusData.payment_status_description === "Completed") {
        // Update user to Pro in Firestore
        // In a real app, you'd find the user by OrderMerchantReference or a stored mapping
        const merchantRef = req.body.OrderMerchantReference;
        const userId = merchantRef?.split("_")[1];

        const userRef = firestore.collection("users").doc(userId);
        await userRef.set(
          {
            isPro: true,
            pesapalTrackingId: OrderTrackingId,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
      }

      res.json({ status: 200, message: "IPN Received" });
    } catch (error) {
      res.status(500).end();
    }
  });

  // Save Report (Firebase)
  app.post("/api/save-report", async (req, res) => {
    const firestore = getFirestore();
    if (!firestore) {
      return res.status(500).json({ error: "Firebase not configured" });
    }

    try {
      const { metrics, results, userId } = req.body;
      const docRef = await firestore.collection("reports").add({
        metrics,
        results,
        userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.json({ id: docRef.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ProfitLens Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
