import mongoose from 'mongoose';

export const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  dosageForm: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  storageRequirements: {
    type: String,
    required: true
  },
  strength: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});



