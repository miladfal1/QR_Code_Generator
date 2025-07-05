import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { qrRouter } from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/qr", express.static(path.join(__dirname, "../public/qr")));

app.get("/", (req, res) => {
  res.render("index", {
    qrPath: null,
    apis: [
      { method: "POST", path: "/api/qr", description: "Generate a new QR code" },
      { method: "GET", path: "/qr/<filename>", description: "Access a generated QR image" },
    ],
  });
});

app.post("/generate", async (req, res, next) => {
  const { text } = req.body;

  try {
    const response = await fetch("http://localhost:3000/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const result = await response.json();

    res.render("index", {
      qrPath: result.data?.path || null,
      apis: [
        { method: "POST", path: "/api/qr", description: "Generate a new QR code" },
        { method: "GET", path: "/qr/<filename>", description: "Access a generated QR image" },
      ],
    });
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/api/qr", qrRouter);

// Error handler
app.use(errorHandler);

export default app;
