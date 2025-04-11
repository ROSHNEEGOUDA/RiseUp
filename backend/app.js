import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS config
const allowedOrigins = ['https://rise-up-01.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Handle preflight requests manually
app.options('*', cors());

// Payload & cookies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
import userRouter from './routes/user.routes.js';
import recruiterRouter from './routes/recruiter.routes.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/recruiters", recruiterRouter);

export { app };
