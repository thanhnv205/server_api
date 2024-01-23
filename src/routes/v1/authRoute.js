import express from "express";
import { loginUser, createUser } from "~/controllers/authController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/create-user", createUser);

export default router;
