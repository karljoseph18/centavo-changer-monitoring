import {
  getDashboardSummaryData,
  getTxnsThisWeek,
  getCoinDistribution,
} from "../models/dashboard.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const [summary, txnThisWeek, coinDistribution] = await Promise.all([
      getDashboardSummaryData(10),
      getTxnsThisWeek(10),
      getCoinDistribution(10),
    ]);

    res.status(200).json({ summary, txnThisWeek, coinDistribution });
  } catch (error) {
    console.error(
      "An error occured while trying to get dashboard summary:",
      error,
    );
    res.status(500).json({
      message:
        "Server error. An error occured while trying to get dashboard summary",
    });
  }
};
