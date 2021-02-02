var express = require("express");
var router = express.Router();
const shoeModel = require("../models/shoe");
const mongoose = require("mongoose");

mongoose.connection.once("open", function () {
  router.get("/", function (req, res) {
    shoeModel.find({}, function (err, shoes) {
      if (err) return console.error(err);
      res.send(shoes);
    });
  });
});

module.exports = router;
