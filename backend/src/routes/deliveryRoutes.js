import express from "express";
import { addDelivery, getDeliveries } from "../controllers/deliveryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addDelivery);
router.get("/", authMiddleware, getDeliveries);

export default router;
