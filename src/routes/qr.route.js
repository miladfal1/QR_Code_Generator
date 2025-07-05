import express from "express";
import { generateQR } from "../controllers/qr.controller.js";
const router = express.Router();

router.post("/", generateQR);

export default router;
