import pool from "../../config/dbConfig.js";

export const fetchTransactions = async () => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    return result.rows;
  } catch (error) {
    console.error(
      "An error occured while trying to fetch transactions from the database:",
      error,
    );
    throw error;
  }
};
