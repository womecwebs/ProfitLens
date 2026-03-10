import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import admin from "firebase-admin";
import cors from "cors";

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
        console.log("Firebase initialized");
      }
      db = admin.firestore();
    } catch (e) {
      console.error("Firebase initialization failed:", e);
    }
  }
  return db;
}

async function verifyUser(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = await admin.auth().verifyIdToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  });

  const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3";

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
  app.post("/api/pesapal/initiate", verifyUser, async (req: any, res) => {
    try {
      const token = await getPesapalToken();
      const { amount, email } = req.body;
      const userId = req.user.uid;
      const callbackUrl = `${process.env.APP_URL}/api/pesapal/callback`;

      const firestore = getFirestore();
      if (!firestore) return res.status(500).json({ error: "DB error" });

      const orderId = `order_${userId}_${Date.now()}`;

      await firestore
        .collection("payments")
        .doc(orderId)
        .set({
          userId,
          orderId,
          amount: amount || 29,
          status: "pending",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      const orderRequest = {
        id: orderId,
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
      console.error("Pesapal initiate error:", error);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  });

  // Pesapal Callback
  app.get("/api/pesapal/callback", async (req, res) => {
    const { OrderTrackingId, OrderMerchantReference } = req.query;
    // Redirect user back to the app success page
    res.redirect(
      `https://profitlenz.netlify.app/success?tracking_id=${OrderTrackingId}`,
    );
  });

  // Pesapal IPN Listener
  app.post("/api/pesapal/ipn", async (req, res) => {
    const { OrderTrackingId, OrderMerchantReference } = req.body;

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

      if (
        statusData.payment_status_description === "Completed" &&
        Number(statusData.amount) === 29
      ) {
        // Update user to Pro in Firestore
        // In a real app, you'd find the user by OrderMerchantReference or a stored mapping
        const merchantRef = OrderMerchantReference;

        if (!merchantRef.startsWith("order_")) {
          return res.status(400).json({ error: "Invalid reference" });
        }

        const userId = merchantRef?.split("_")[1];
        const orderId = merchantRef;

        const paymentRef = firestore.collection("payments").doc(orderId);

        await paymentRef.update({
          trackingId: OrderTrackingId,
          status: "completed",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const userRef = firestore.collection("users").doc(userId);

        // prevent duplicate payment processing
        const userDoc = await userRef.get();

        if (userDoc.exists && userDoc.data()?.isPro) {
          return res.json({ status: 200, message: "Already processed" });
        }

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
  app.post("/api/save-report", verifyUser, async (req, res) => {
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
