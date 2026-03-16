import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// default check
app.use("/", (req, res) => {
  res.send("Centavo changer monitoring server is running!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
