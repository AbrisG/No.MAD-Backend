var express = require("express");
var router = express.Router();
const shoeModel = require("../models/shoe");

router.get("/", (req, res) => {
  shoeModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else res.send(data);
  });
});

module.exports = router;
