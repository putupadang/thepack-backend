const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
