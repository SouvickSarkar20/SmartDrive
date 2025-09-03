import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { computePath } from "../controllers/pathController.js";

const router = express.Router();
router.post("/", authMiddleware, computePath);

export default router;
