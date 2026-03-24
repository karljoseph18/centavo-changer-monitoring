import express from "express";
import { getTransactions } from "../controllers/transactions.controller.js";

const router = express.Router();

router.get("/transactions", getTransactions);

export default router;
