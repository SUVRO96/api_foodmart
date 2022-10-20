const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// http://localhost:4000/orders/placeorder
router.post("/placeorder", async (req, res) => {
  try {
    const tempOrder = new Order({
      orderid: parseInt(Math.random() * 1000000000000000),
      date: req.body.date,
      username: req.body.username,
      rest_id: req.body.rest_id,
      rest_name: req.body.rest_name,
      city: req.body.city,
      fooditems: req.body.fooditems,
      amount: req.body.amount,
      status: req.body.status,
    });
    const response = await tempOrder.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
