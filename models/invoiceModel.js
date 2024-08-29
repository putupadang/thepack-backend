const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    date: { type: Date, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    discount: { type: Number, required: false },
    total: { type: Number, required: false },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        tax: { type: Number, required: false },
        calculatedPrice: { type: Number, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Helper function to calculate prices
function calculatePrices(doc) {
  let total = 0;
  doc.items.forEach((item) => {
    const tax = 9;
    const amount = item.price * item.quantity;
    const taxAmount = (amount * tax) / 100;
    item.tax = taxAmount;
    item.calculatedPrice = amount + taxAmount;
    total += item.calculatedPrice * item.quantity; // Assuming calculatedPrice is per unit, multiply by quantity
  });
  doc.total = total;
}

// Pre-save middleware to calculate calculatedPrice
InvoiceSchema.pre("save", function (next) {
  calculatePrices(this);
  next();
});

// Pre-update middleware for findOneAndUpdate and updateOne
InvoiceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Handle the update
  if (update.items) {
    calculatePrices(update);
  }
  next();
});
InvoiceSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();

  // Handle the update
  if (update.items) {
    calculatePrices(update);
  }
  next();
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
