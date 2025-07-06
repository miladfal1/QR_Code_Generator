import express from "express";
const router = express.Router();
import { homePage, fetchQR, showHistory, downloadQR } from "../controllers/qr.controller.js";
import { validateQRInput } from "../utils/qr.validator.js";

router.get("/", homePage);
router.post("/fetchQR", validateQRInput, fetchQR);
router.get("/history", showHistory);
router.get("/download/:id", downloadQR);

export default router;
