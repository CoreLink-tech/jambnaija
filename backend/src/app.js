import "./env.js";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.routes.js";
import subjectsRoutes from "./routes/subjects.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import practiceRoutes from "./routes/practice.routes.js";
import attemptsRoutes from "./routes/attempts.routes.js";

export const app = express();

const configuredOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((item) => item.trim()).filter(Boolean)
  : [];
const allowAllOrigins = configuredOrigins.includes("*");

app.use(
  cors({
    origin(origin, callback) {
      if (allowAllOrigins) return callback(null, true);
      if (!origin || origin === "null") return callback(null, true);
      if (configuredOrigins.includes(origin)) return callback(null, true);
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "examforge-backend",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/attempts", attemptsRoutes);

const backendSrcDir = path.dirname(fileURLToPath(import.meta.url));
const projectRootDir = path.resolve(backendSrcDir, "..", "..");
const allowedFrontendFiles = new Set([
  "hi.html",
  "student-register.html",
  "student.html",
  "admin-login.html",
  "admin.html",
  "activation.html",
  "practice.html",
  "result.html",
  "styles.css",
  "app.js",
  "biology-jamb-2020-2025.sample.json",
  "cbt-multiyear.template.json",
]);

app.get("/", (_req, res) => {
  res.sendFile(path.join(projectRootDir, "hi.html"));
});

app.get("/:file", (req, res, next) => {
  const file = String(req.params.file || "").trim();
  if (!allowedFrontendFiles.has(file)) return next();
  return res.sendFile(path.join(projectRootDir, file));
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, _req, res, _next) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  res.status(500).json({
    message: "Unexpected server error.",
    detail: process.env.NODE_ENV !== "production" ? String(error?.message || error) : undefined,
  });
});
