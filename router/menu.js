const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// http://localhost:4000/menu/
router.post("/", async (req, res) => {
  try {
    const last = await Menu.find().sort({ _id: -1 }).limit(1);
    // console.log(last);
    const newId = parseInt(last[0].food_id) + 1;
    // console.log(newId);
    const tempMenu = new Menu({
      rest_id: req.body.rest_id,
      food_id: newId,
      food_name: req.body.food_name,
      food_type: req.body.food_type,
      image: req.body.image,
      price: req.body.price,
      food_category: req.body.food_category,
      description: req.body.description,
    });
    const response = await tempMenu.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/menu/
router.get("/", async (req, res) => {
  try {
    const response = await Menu.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/menu/search/id?foodname=
router.get("/search/:rest_id", async (req, res) => {
  try {
    const tempRestId = req.params.rest_id;
    const foodName = req.query.foodname;
    // console.log(foodName);
    if (foodName == undefined) {
      const response = await Menu.find({
        rest_id: tempRestId,
      });
      res.status(200).json(response);
    } else {
      const response = await Menu.find({
        rest_id: tempRestId,
        food_name: foodName[0].toUpperCase() + foodName.slice(1),
      });
      res.status(200).json(response);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// http://localhost:4000/menu/search?foodname=
router.get("/search", async (req, res) => {
  try {
    const foodName = req.query.foodname;
    const response = await Menu.find({
      food_name: foodName[0].toUpperCase() + foodName.slice(1),
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

//localhost:4000/menu/update
router.put("/update", async (req, res) => {
  try {
    const tempMenu = {
      rest_id: req.body.rest_id,
      food_id: req.body.food_id,
      food_name: req.body.food_name,
      food_type: req.body.food_type,
      image: req.body.image,
      price: req.body.price,
      food_category: req.body.food_category,
      description: req.body.description,
    };
    const response = await Menu.findOneAndUpdate(
      { food_id: tempMenu.food_id },
      tempMenu,
      { new: true }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
