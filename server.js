const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./public"));
app.use(bodyParser.json());
const port = 8080;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.use("/books", require("./routes/bookRoutes"));
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
