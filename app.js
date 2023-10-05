const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const  {authRoutes,categoryRoutes, productRoutes, orderRoutes}  = require("./routes/index");
const app = express();
require('dotenv/config');
app.use(express.json()); // to parse body in requests
app.use(cors());
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join(' ')
    cb(null, fileName + '-' + Date.now())
  }
})

const uploadOptions = multer({ storage: storage })


mongoose.connect(process.env.CONNECTION_STRING);
              
mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

mongoose.connection.on("error", () => {
  console.log("Something wrong with the DB connection");
});
app.use('/', authRoutes);
app.use('/', categoryRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);



app.listen(3000);

console.log("Server listening on port: 3000");