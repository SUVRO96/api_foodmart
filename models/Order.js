const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  orderid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  date: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rest_id: {
    type: String,
  },
  rest_name: {
    type: String,
  },
  city: {
    type: String,
  },
  fooditems: {
    type: Array,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
