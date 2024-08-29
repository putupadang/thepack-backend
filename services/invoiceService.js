const Invoice = require("../models/invoiceModel");

const createInvoice = async (data) => {
  const latestInvoice = await Invoice.findOne().sort({ _id: -1 });
  const prevInvoice = latestInvoice ? latestInvoice.number : "";

  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let increment = "01";

  if (prevInvoice) {
    const previousDate = prevInvoice.slice(3, 9);
    const previousIncrement = prevInvoice.slice(9);

    const currentDate = year + month + day;

    if (previousDate === currentDate) {
      increment = String(parseInt(previousIncrement, 10) + 1).padStart(2, "0");
    }
  }

  const invoiceNo = `INV${year}${month}${day}${increment}`;

  const _data = { ...data, number: invoiceNo, date: now };
  const invoice = new Invoice(_data);
  await invoice.save();
  return invoice;
};

const getAllInvoices = async () => {
  return await Invoice.find();
};

const getInvoiceById = async (id) => {
  return await Invoice.findById(id);
};

const deleteInvoice = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};

const updateInvoice = async (id, data) => {
  return await Invoice.findOneAndUpdate({ _id: id }, data);
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoice,
  updateInvoice,
};
