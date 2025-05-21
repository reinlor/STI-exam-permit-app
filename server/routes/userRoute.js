import express from "express";
import {create, getAllUsers, getUserByID, update, deleteUser, loginUser} from "../controller/userController.js"

const route = express.Router();
route.post("/login", loginUser)
route.post("/users", create)
route.get("/users", getAllUsers)
route.get("/users/:id", getUserByID)
route.put("/update/users/:id", update)
route.delete("/delete/users/:id", deleteUser)

export default route