import express from "express";
import transactionsRoutes from "./routes/transactions.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import machinesRoutes from "./routes/machines.route.js";
import adjustmentsRoutes from "./routes/adjustments.route.js";
import dashboardRoutes from "./routes/dashboard.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes for transactions
app.use("/api", transactionsRoutes);

// routes for machines
app.use("/api", machinesRoutes);

// routes for adjustments
app.use("/api", adjustmentsRoutes);

// routes for dashboard
app.use("/api", dashboardRoutes)

// default check
app.use("/", (req, res) => {
  res.send("Centavo changer monitoring server is running!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
