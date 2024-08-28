const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const invoiceController = require("../controllers/invoiceController");

router.post("/", verifyToken, invoiceController.createInvoice);
router.get("/", verifyToken, invoiceController.getAllInvoices);
router.get("/:id", verifyToken, invoiceController.getInvoiceById);
router.delete("/:id", verifyToken, invoiceController.deleteInvoice);
router.put("/:id", verifyToken, invoiceController.updateInvoice);

module.exports = router;
