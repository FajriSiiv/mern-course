import express from "express";
import { getAllUser, Login, Logout } from "../controllers/user.js";

const router = express.Router();

router.get("/user", getAllUser);
router.post("/user", Login);
router.get("/user/logout", Logout);

export default router;
