import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🚀 AlgoDrive API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/delivery", deliveryRoutes);

export default app;
