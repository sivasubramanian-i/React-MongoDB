var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://siva:siva12345@customer-cluster-b6ury.mongodb.net/expense-db?retryWrites=true&w=majority",
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB Connected..."))
  .catch(err => console.error(err));
var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "build")));

var expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
