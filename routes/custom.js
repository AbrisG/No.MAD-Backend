var express = require("express");
var router = express.Router();
const shoeModel = require("../models/shoe");
const mongoose = require("mongoose");

mongoose.connection.once("open", function () {
  router.get("/", function (req, res) {
    shoeModel.findOne(
      { name: decodeURIComponent(req.param("name")) },
      function (err, shoe) {
        if (err) return console.error(err);
        res.send(shoe);
      }
    );
  });
});

module.exports = router;
