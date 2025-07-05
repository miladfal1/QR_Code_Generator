import { generateQRImage } from '../services/qr.service.js';
import QR from '../models/qr.model.js';

export const generateQR = async (req, res, next) => {
  try {
    const { text } = req.body;
    const filePath = await generateQRImage(text);
    const record = await QR.create({ text, path: filePath });
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};
