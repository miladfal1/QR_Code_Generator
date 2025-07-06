import QR from "../models/qr.model.js";
import path from "path";
import { QR_DIRECTORY } from "../config/path.js";
import { generateQRImage } from "../services/qr.service.js";

export const homePage = async (req, res) => {
  const qrPath = req.session.qrPath || null;

  req.session.qrPath = null;

  res.render("index", {
    qrPath,
    apis: [
      {
        method: "POST",
        path: "/generate",
        description: "Generate a new QR code from text or URL",
      },
      {
        method: "GET",
        path: "/:id",
        description: "Get a QR code by ID",
      },
    ],
  });
};

export const fetchQR = async (req, res, next) => {
  try {
    const { text } = req.body;
    const filePath = await generateQRImage(text);
    const record = await QR.create({ text, path: filePath });

    req.session.qrPath = record.path;

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

export const showHistory = async (req, res, next) => {
  try {
    const qrs = await QR.find().sort({ createdAt: -1 }).lean();
    res.render("history", { qrs });
  } catch (err) {
    next(err);
  }
};

export const downloadQR = async (req, res, next) => {
  try {
    const { id } = req.params;
    const qr = await QR.findById(id);
    if (!qr) return res.status(404).send("QR Code not found");

    const fileName = qr.path.split("/").pop();
    const absolutePath = path.join(QR_DIRECTORY, fileName);

    res.download(absolutePath, "qr-code.png");
  } catch (err) {
    console.log("error is : ", err);

    next(err);
  }
};
