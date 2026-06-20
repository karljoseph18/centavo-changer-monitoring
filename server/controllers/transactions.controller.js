import {
  fetchTransactions,
  storeNewTransaction,
} from "../models/transactions.model.js";
import { fetchMachineStorage } from "../models/machines.model.js";
import { sendLowStockNotif } from "../utils/email.util.js";
import redisClient from "../../config/redisConfig.js";
import { getUserByMachineId } from "../models/users.model.js";

export const getTransactions = async (req, res) => {
  try {
    const machineId = Number(req.params.id);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    // machine id required and should be a number
    if (!Number.isInteger(machineId) || machineId <= 0)
      return res.status(400).json({
        message: "Invalid machine ID",
      });

    const offset = (page - 1) * limit;

    const { totalCount, transactions } = await fetchTransactions({
      adminId: req.user.id,
      machineId,
      limit,
      offset,
    });

    res.status(200).json({ totalCount, transactions });
  } catch (error) {
    console.error("An error occured while trying to get transactions:", error);
    res.status(500).json({
      message:
        "Server error. An error occured while trying to get transactions",
    });
  }
};

export const createTransaction = async (req, res) => {
  const { id: machineId } = req.params;
  const { data } = req.body;

  if (!data) return res.status(400).json({ message: "No data is received" });

  if (typeof data !== "object" || !Array.isArray(data.dispensed))
    return res.status(400).json({ message: "Invalid transaction data" });

  try {
    await storeNewTransaction({
      machineId: machineId,
      eventId: data.event_id,
      centavos: data.centavos,
      dispensed: data.dispensed,
    });

    const storage = await fetchMachineStorage(machineId);
    const hasLowStock = storage.some(
      (item) => item.quantity > 0 && item.quantity <= 5,
    );

    const key = `lowStockNotified:${machineId}`;

    try {
      if (hasLowStock) {
        const isNotified = await redisClient.get(key);

        if (!isNotified) {
          const user = await getUserByMachineId(machineId);

          await sendLowStockNotif({ recipient: user.email });

          // prevent from sending multiple low stock notif
          await redisClient.set(key, "1");
        }
      } else {
        // allow low stock notif sending when stock is no longer low
        await redisClient.del(key);
      }
    } catch (error) {
      console.error(
        "Notification error - skipping notification system:",
        error,
      );
    }

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (error) {
    // if duplicate entry
    if (error.code === "23505")
      return res.status(200).json({ message: "Transaction already processed" });

    console.error("An error occured while trying to get transactions:", error);
    res.status(500).json({
      message:
        "Server error. An error occured while trying to get transactions",
    });
  }
};
