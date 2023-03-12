const express = require("express");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST->  http://localhost:4000/users/adduser
router.post("/adduser", async (req, res) => {
  try {
    // const userExist = await User.findOne({ email: req.body.email });
    // console.log(userExist);
    // if (!userExist) {
    const last = await User.find().sort({ _id: -1 }).limit(1);
    const newId = last[0].id + 1;
    const newName = req.body.name.split(" ");
    const newUserName = newName[0].toLowerCase() + newId;
    const tempUser = new User({
      id: newId,
      username: newUserName,
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password,
      usertype: req.body.usertype,
    });
    const response = await tempUser.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET->  http://localhost:4000/users/allusers
router.get("/allusers", async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/userexist", async (req, res) => {
  try {
    const response = await User.findOne({ email: req.body.email });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST->  http://localhost:4000/users/login
router.post("/login", async (req, res) => {
  const tempEmail = req.body.email;
  const tempPassword = req.body.password;
  try {
    const response = await User.find({
      email: tempEmail,
      password: tempPassword,
    });
    if (response.length === 0) {
      res.status(422).json("User not found");
    } else if (response.length === 1) {
      let obj = {};
      obj.token = jwt.sign({ username: response[0].username }, "foodkart");
      obj = { ...obj, ...response[0]._doc };
      res.status(200).json(obj);
    } else {
      res.status(421).json("error found");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
