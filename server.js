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

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(helmet());
app.use(express.static("."));

app.use(hpp());

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://school-system-54307.web.app",
        "https://school-system-54307.firebaseapp.com"
    ]
}));

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function sendToSplunk(logData) {
    try {
        await axios.post(
            "https://localhost:8088/services/collector",
            { event: logData },
            {
                headers: {
                    Authorization: `Splunk ${process.env.SPLUNK_TOKEN || ""}`
                },
                httpsAgent: new https.Agent({
                    // WARNING: only disable for self-signed local Splunk dev instance;
                    // set SPLUNK_VERIFY_SSL=true and provide a CA cert for production.
                    rejectUnauthorized: process.env.SPLUNK_VERIFY_SSL === "true"
                })
            }
        );
        console.log("Sent to Splunk");
    } catch (error) {
        console.error("Splunk Error:", error.message);
    }
}

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
        res.status(500).json({ error: "AI request failed" });
    }
});

app.post("/audit-log", async (req, res) => {
    try {
        await sendToSplunk({
            ...req.body,
            source: "36-school",
            timestamp: new Date().toISOString()
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Audit log failed" });
    }
});

app.listen(3000, () => {
    console.log("Secure AI Server Running");
    sendToSplunk({
        action: "SERVER_STARTED",
        severity: "INFO",
        user: "superadmin",
        timestamp: new Date(),
        source: "36-school"
    });
});
