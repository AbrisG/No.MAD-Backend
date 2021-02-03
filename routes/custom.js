var express = require("express");
var router = express.Router();
const shoeModel = require("../models/shoe");

router.get("/", (req, res) => {
  if (req.query.hasOwnProperty("name")) {
    shoeModel.find(
      { name: { $regex: req.query["name"], $options: "i" } },
      (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
      }
    );
  } else res.status(400).send("error: query does not have 'name' property");
});

module.exports = router;
