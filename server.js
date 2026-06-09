import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import axios from "axios";
import https from "https";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

const SPLUNK_URL =
    process.env.SPLUNK_URL || "https://localhost:8088/services/collector";

const SPLUNK_TOKEN =
    process.env.SPLUNK_TOKEN || "";

const SPLUNK_VERIFY_SSL =
    process.env.SPLUNK_VERIFY_SSL === "true";

// CORS must be the very first middleware so that preflight OPTIONS requests
// from Firebase Hosting receive Access-Control-Allow-* headers before
// helmet or any other handler can intercept them.
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://school-system-54307.web.app",
        "https://school-system-54307.firebaseapp.com"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

// crossOriginResourcePolicy must be cross-origin so the browser can load
// static assets served from a different origin.
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.static("."));
app.use(hpp());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/* =========================
SPLUNK HEC
========================= */

async function sendToSplunk(logData) {

    const eventLabel =
        logData.action || logData.event || "unknown";

    const userLabel =
        logData.email || logData.user || "N/A";

    console.log(
        `[Splunk] → ${eventLabel}`,
        `| severity: ${logData.severity || "N/A"}`,
        `| user: ${userLabel}`
    );

    if (!SPLUNK_TOKEN) {

        console.warn(
            `[Splunk] SPLUNK_TOKEN not set — skipping HEC delivery for: ${eventLabel}`
        );

        return { ok: false, reason: "no_token" };

    }

    try {

        const response = await axios.post(
            SPLUNK_URL,
            {
                event: logData,
                sourcetype: "_json",
                source: "36-school"
            },
            {
                headers: {
                    Authorization: `Splunk ${SPLUNK_TOKEN}`,
                    "Content-Type": "application/json"
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: SPLUNK_VERIFY_SSL
                }),
                timeout: 8000
            }
        );

        console.log(
            `[Splunk] ✓ Delivered: ${eventLabel}`,
            `| HTTP ${response.status}`,
            `| code: ${response.data?.code ?? "—"}`
        );

        return { ok: true, status: response.status };

    } catch (error) {

        const status =
            error.response?.status;

        const detail =
            error.response?.data
                ? JSON.stringify(error.response.data)
                : error.message;

        console.error(
            `[Splunk] ✗ Failed: ${eventLabel}`,
            `| HTTP ${status ?? "N/A"}`,
            `| ${detail}`
        );

        return { ok: false, status, reason: detail };

    }

}

/* =========================
ROUTES
========================= */

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

app.post("/ai", async (req, res) => {

    try {

        const prompt = req.body.message;

        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ error: "message is required" });
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {

        console.error("[AI] Request failed:", error.message);
        res.status(500).json({ error: "AI request failed" });

    }

});

app.post("/audit-log", async (req, res) => {

    const incoming = req.body;
    const eventLabel = incoming.action || incoming.event || "unknown";

    console.log(
        `[audit-log] Received: ${eventLabel}`,
        `| severity: ${incoming.severity || "N/A"}`,
        `| user: ${incoming.email || "N/A"}`
    );

    const result = await sendToSplunk({
        ...incoming,
        source: "36-school",
        receivedAt: new Date().toISOString()
    });

    // Always return 200 — the client should not retry on Splunk failure;
    // the server-side console log is the authoritative failure record.
    return res.json({ success: result.ok, splunk: result });

});

app.get("/splunk-test", async (req, res) => {

    console.log("[splunk-test] Manual test triggered");

    const result = await sendToSplunk({
        event: "splunk_test",
        action: "SPLUNK_TEST",
        severity: "INFO",
        source: "36-school",
        details: "Manual connectivity test from 36 School admin.",
        timestamp: new Date().toISOString()
    });

    return res.json({
        splunkReachable: result.ok,
        splunk: result,
        splunkUrl: SPLUNK_URL,
        tokenConfigured: !!SPLUNK_TOKEN
    });

});

/* =========================
START
========================= */

app.listen(3000, () => {

    console.log("[server] 36 School secure server running on :3000");
    console.log(`[server] Splunk URL: ${SPLUNK_URL}`);
    console.log(`[server] Splunk token: ${SPLUNK_TOKEN ? "SET" : "NOT SET — HEC disabled"}`);

    sendToSplunk({
        event: "server_started",
        action: "SERVER_STARTED",
        severity: "INFO",
        user: "system",
        timestamp: new Date().toISOString(),
        source: "36-school"
    });

});
