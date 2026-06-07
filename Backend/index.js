const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const connect = require("./src/DB/Connection");
const userDetails = require("./src/Models/userDetails");
const exportExcel = require("./src/Middleware/exportExcel");
const userRoute = require("./src/Routes/userRoute");
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type,Authorization"],
  }),
);

app.use("/export", exportExcel);

app.use("/addUser", userRoute);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //
    // mongodb://localhost:27017/SelectCars
    // "mongodb+srv://jayanthjai8464_db_user:AGNEX8dbfeqjbNpU@userdetails.hdpsgku.mongodb.net/",
    console.log("Connecting DB...");
    await connect(process.env.CONNECTION_STRING);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is running on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
