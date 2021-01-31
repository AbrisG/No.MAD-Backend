var express = require("express");
var router = express.Router();
const shoeModel = require("../models/shoe");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://AbrisG:Horse123@cluster0.0ds2t.mongodb.net/nomad?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
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
