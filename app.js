const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const  authRoutes  = require("./routes/index");
const app = express();
app.use(express.json()); // to parse body in requests
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/e-com");

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

mongoose.connection.on("error", () => {
  console.log("Something wrong with the DB connection");
});
app.use('/', authRoutes)



app.listen(3000);

console.log("Server listening on port: 3000");