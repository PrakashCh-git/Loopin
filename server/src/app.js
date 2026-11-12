import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();


//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://loopin-f1rx.vercel.app"
    ],

    credentials: true,
  }));




app.use("/api/auth",authRouter);




export default app;