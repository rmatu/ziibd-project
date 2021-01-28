require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const { selectAllEmployees } = require("./sql");

// settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(morgan("dev"));

app.get("/employees", (req, res) => {
  selectAllEmployees(req, res);
});

// routes
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
