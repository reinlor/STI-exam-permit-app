import express from "express";
import { createPayment, getPaymentByID} from "../controller/paymentController.js";

const route = express.Router();
route.post("/payment", createPayment);
route.get("/payment/:uid", getPaymentByID);

export default route;