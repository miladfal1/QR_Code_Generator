import express from "express";
import { fetchQR, generateQR , homePage } from "../controllers/qr.controller.js";
const router = express.Router();

router.get("/", homePage)
router.post("/", generateQR);
router.post("/qr/show", fetchQR);

export default router;
