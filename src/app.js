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

import session from "express-session";

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/qr", express.static(path.join(__dirname, "../public/qr")));

app.use("/", qrRouter);
app.use("/", qrRouter);
app.use("/api/qr", qrRouter);

// Error handler
app.use(errorHandler);

export default app;
