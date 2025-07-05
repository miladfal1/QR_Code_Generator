import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

const outputDir = path.resolve('public/qr');

export async function generateQRImage(text) {
  await fs.mkdir(outputDir, { recursive: true });
  const filename = `${Date.now()}.png`;
  const filepath = path.join(outputDir, filename);
  await QRCode.toFile(filepath, text);
  return `/qr/${filename}`;
}
