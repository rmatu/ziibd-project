require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const asyncHandler = require("express-async-handler");
const morgan = require("morgan");
const { selectAllEmployees, getEmployee } = require("./sql");

// settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(morgan("dev"));

app.get("/", (req, res) => {
  data = selectAllEmployees(req, res);
  res.render("home", {
    title: "Ryszard Matula - ZIIBD - IO1",
    users: data,
  });
});

app.get("/edit/:employeeID", (req, res) => {
  data = getEmployee(req, res);
  res.render("employee", {
    title: "Ryszard Matula - ZIIBD - IO1",
    data,
  });
});

// routes
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
