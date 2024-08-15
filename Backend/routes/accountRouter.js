import express from "express";
import {
  loginAccount,
  registerNewAccount,
} from "../controllers/accountController.js";
import { validateAccount } from "../middlewares/validateAccount.js";

const router = express.Router();

router.post("/register", validateAccount, registerNewAccount);
router.post("/login", validateAccount, loginAccount);

export default router;
