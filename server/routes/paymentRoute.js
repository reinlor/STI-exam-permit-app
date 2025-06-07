import express from "express";
import { createPayment, getPaymentByID, getPendingPayment, getPaymentByTransactionID, updatePaymentStatus, uploadFile} from "../controller/paymentController.js";

const route = express.Router();
route.post("/payment", createPayment);
route.get("/payment/:uid", getPaymentByID);
route.get("/payment/status/:status", getPendingPayment);
route.get("/payment/transaction/:transactionNumber", getPaymentByTransactionID);
route.put("/payment/update/:transactionNumber", updatePaymentStatus);
route.post("/upload", uploadFile);

export default route;