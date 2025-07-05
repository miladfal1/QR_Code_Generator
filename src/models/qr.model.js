import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
  text: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('QR', qrSchema);
