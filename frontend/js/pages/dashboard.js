import { checkUserAuth } from "../auth/session.js";
import { authFetch } from "../api/authFetch.js";

window.addEventListener("DOMContentLoaded", async () => {
  // check if user is logged in
  //   const isLoggedIn = await checkUserAuth();

  //   if (!isLoggedIn) {
  //     window.location.replace("http://127.0.0.1:5501/frontend/html/login.html");
  //   }

  // fetch dashboard summary
  const res = await authFetch("/dashboard");

  if (res.status === 401) {
    alert("Session expired. Please login in again");
    window.location.replace("http://127.0.0.1:5501/frontend/html/login.html");
    return;
  }

  if (!res.ok) {
    alert("Something went wrong. Try again later");
    console.error("Fetch failed:", res.status, res.statusText);
    return;
  }

  const data = await res.json();
  const { summary, txnThisWeek, coinDistribution } = data;

  console.log(coinDistribution);

  // display dashboard summary data
  const statCards = document.querySelectorAll(".card");

  // turn the values of dashboard summary into an array and put it in the statistic cards
  const values = Object.values(summary);

  statCards.forEach((card, i) => {
    const h2 = card.querySelector("h2");
    const value = Number(values[i] ?? 0).toLocaleString();

    const format = card.dataset.format;

    if (format === "peso") {
      h2.textContent = `₱${value}`;
    } else {
      h2.textContent = value;
    }
  });

  const weeklyCtx = document.getElementById("weeklyTransactionsChart");

  const txnThisWeekMap = {};
  txnThisWeek.forEach((row) => (txnThisWeekMap[row.day_num] = row.total_txn));

  new Chart(weeklyCtx, {
    type: "line",
    data: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Transactions",
          data: [...Array(7)].map((_, i) => txnThisWeekMap[i] ?? 0),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,.15)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  const coinCtx = document.getElementById("coinDistributionChart");

  const coinMap = {};
  coinDistribution.forEach(
    (coin) => (coinMap[coin.peso_value] = coin.total_dispensed),
  );

  new Chart(coinCtx, {
    type: "doughnut",
    data: {
      labels: ["₱1", "₱5", "₱10", "₱20"],
      datasets: [
        {
          data: [1, 5, 10, 20].map((value) => coinMap[value] ?? 0),
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  const activityCtx = document.getElementById("activityChart");

  new Chart(activityCtx, {
    type: "bar",
    data: {
      labels: ["Transactions", "Refills", "Adjustments"],
      datasets: [
        {
          label: "Count",
          data: [420, 12, 7],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});
