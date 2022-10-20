const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// http://localhost:4000/restaurants/search/rest_id

router.get("/search/:rest_id", async (req, res) => {
  try {
    const restId = req.params.rest_id;
    const response = await Restaurant.findOne({ rest_id: restId });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/restaurants/city
router.get("/:city", async (req, res) => {
  try {
    const cityName = req.params.city.toLowerCase();
    const response = await Restaurant.find({ location: cityName });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Restaurant.find();
    res.status(200).json(response);
  } catch {}
});

router.post("/", async (req, res) => {
  try {
    const tempRestaurent = new Restaurant({
      rest_id: req.body.rest_id,
      rest_name: req.body.rest_name,
      location: req.body.location.toLowerCase(),
      category: req.body.category,
      image: req.body.image,
    });
    const response = await tempRestaurent.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
