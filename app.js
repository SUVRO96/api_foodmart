require("dotenv").config();
const express = require("express");
const app = express();
const resturantRoute = require("./router/resturants");
const menuRoute = require("./router/menu");
const userRoute = require("./router/users");
const orderRoute = require("./router/orders");

const { default: mongoose } = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.send("foodmart api");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.use("/restaurants", resturantRoute);
app.use("/menu", menuRoute);
app.use("/users", userRoute);
app.use("/orders", orderRoute);
mongoose.connect(
  "mongodb+srv://Suvro96:Suvro_96@cluster0.uq4uv.mongodb.net/foodmart?retryWrites=true&w=majority",
  () => {
    console.log("db connected");
  }
);

app.listen(process.env.PORT || 4000);
