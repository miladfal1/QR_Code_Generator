import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const QR_DIRECTORY = path.join(__dirname, "../../public/qr");
export const VIEWS_DIRECTORY = path.join(__dirname, "../views");
