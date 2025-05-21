import express from "express";
import { createAdmin, getAdminByID, updateAdmin, deleteAdmin} from "../controller/adminController.js";

const route = express.Router();
route.post("/admin", createAdmin);
route.get("/admin/:uid", getAdminByID);
route.put("/admin/:uid", updateAdmin);
route.delete("/admin/:uid", deleteAdmin);

export default route;