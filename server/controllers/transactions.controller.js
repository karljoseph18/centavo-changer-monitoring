import { fetchTransactions } from "../models/transactions.model.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await fetchTransactions();
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("An error occured while trying to get transactions:", error);
    res
      .status(500)
      .json({
        message:
          "Server error. An error occured while trying to get transactions",
      });
  }
};
