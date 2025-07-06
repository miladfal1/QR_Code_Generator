import { generateQRImage } from "../services/qr.service.js";
import QR from "../models/qr.model.js";

// کنترلر ساختن QR و بازگشت JSON (برای API)
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

// کنترلر تعامل با کاربر از طریق فرم HTML
export const fetchQR = async (req, res, next) => {
  try {
    const { text } = req.body;
    const filePath = await generateQRImage(text);
    const record = await QR.create({ text, path: filePath });

    // ذخیره مسیر در session
    req.session.qrPath = record.path;

    // ریدایرکت به صفحه اصلی
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

// کنترلر نمایش صفحه خانه
export const homePage = async (req, res) => {
  const qrPath = req.session.qrPath || null;

  // بعد از گرفتن، پاکش می‌کنیم تا فقط یک‌بار نمایش داده شه
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
