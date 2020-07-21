const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.listen(port, () =>
  console.log(`Express server running at http://localhost:${port}`)
);

app.get("/search", (req, res) => {
  res.send("Searched from server");
});

app.get("/lucky", (req, res) => {
  res.send("Lucky from server");
});
