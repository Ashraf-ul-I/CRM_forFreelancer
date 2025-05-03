import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes.routes";
import clientRoutes from "./routes/client.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import interactionLogRoutes from "./routes/interactionLogs.routes";
import projectRoutes from "./routes/project.routes";
import reminderRoutes from "./routes/reminder.routes";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://crm-freelancer-f-ull-c-ode.vercel.app",
  "https://crm-freelancer-f-ull-c-ode-git-main-ashraf-ul-is-projects.vercel.app",
  "https://crm-freelancer-f-ull-c-ode-ashraf-ul-is-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error("❌ CORS Blocked Origin:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);



const prisma = new PrismaClient();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/interaction-logs", interactionLogRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
