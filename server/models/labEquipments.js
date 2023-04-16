import mongoose from "mongoose";

export const labEquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  modelNumber: { type: String, required: true },
  serialNumber: { type: String, required: true },
  warranty: { type: String },
  dateAdded: { type: Date, default: Date.now }
});