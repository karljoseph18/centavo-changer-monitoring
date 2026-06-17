import express from "express";
import {
  getMachineStorage,
  refillMachineStorage,
  getMachines,
} from "../controllers/machines.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/machines", authenticateUser, getMachines);

router.get("/machines/:id/storage", authenticateUser, getMachineStorage);

router.post("/machines/:id/storage", authenticateUser, refillMachineStorage);

export default router;
