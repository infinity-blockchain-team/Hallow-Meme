require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./conn/config.js");
const router=require("./Router/router.js");
const cors=require("cors");
connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use("/api",router);

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});



app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
