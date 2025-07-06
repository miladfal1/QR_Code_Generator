import express from "express";
import cors from "cors";
import morgan from "morgan";
import { qrRouter } from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { QR_DIRECTORY, VIEWS_DIRECTORY } from "./config/path.js";

import session from "express-session";
import flash from "connect-flash";

const app = express();

app.set("views", VIEWS_DIRECTORY);
app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  next();
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/qr", express.static(QR_DIRECTORY));

app.use("/", qrRouter);

app.use(errorHandler);

export default app;
