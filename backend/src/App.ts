import express from "express";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import v1Router from "./v1/v1.routes.js";
import path from "path";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Static Folder (Persiapan untuk fitur Attachment/Upload File)
// Jika nanti menyimpan file PDF/JPG di folder 'uploads', buka aksesnya agar bisa dibaca frontend
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads")),
);

app.use(cookieParser());

app.use("/api", v1Router);
// 5. Global Error Handler (Sangat Penting agar server tidak crash dan mereturn HTML error ke Axios)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server internal",
  });
});

app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});
