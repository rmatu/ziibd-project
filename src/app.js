require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const asyncHandler = require("express-async-handler");
const morgan = require("morgan");
const {
  selectAllEmployees,
  getEmployee,
  editEmployee,
  addEmployee,
  deleteEmployee,
} = require("./sql");
const bodyParser = require("body-parser");

// settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// routes
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

app.post(
  "/edit/:employeeID",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
      await editEmployee(req, res);
    } catch (e) {
      console.log(e);
    }
  })
);

app.get("/add-employee", (req, res) => {
  res.render("add-employee");
});

app.post(
  "/add-employee",
  asyncHandler(async (req, res) => {
    try {
      await addEmployee(req, res);
    } catch (e) {
      console.log(e);
    }
  })
);

app.get("/delete/:employeeID", (req, res) => {
  deleteEmployee(req, res);
});

// routes
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
