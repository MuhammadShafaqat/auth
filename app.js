const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const  {authRoutes,categoryRoutes}  = require("./routes/index");
const app = express();
require('dotenv/config');
app.use(express.json()); // to parse body in requests
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING);
              
mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

mongoose.connection.on("error", () => {
  console.log("Something wrong with the DB connection");
});
app.use('/', authRoutes);
app.use('/', categoryRoutes);



app.listen(3000);

console.log("Server listening on port: 3000");