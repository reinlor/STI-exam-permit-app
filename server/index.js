import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";
import balanceRoute from "./routes/balanceRoute.js";
import teacherRoute from "./routes/adminRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import studentRoute from "./routes/studentRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(cors());


// ✅ API Routes
app.use("/api", userRoute);
app.use("/api", courseRoute);
app.use("/api", balanceRoute);
app.use("/api", teacherRoute);
app.use("/api", paymentRoute);
app.use("/api", studentRoute);

// ✅ Connect to DB
mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("DB connected successfully!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err));
