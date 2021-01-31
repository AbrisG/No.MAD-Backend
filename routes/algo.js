var express = require("express");
var router = express.Router();
var Datastore = require("nedb");
const shoeModel = require("../models/shoe");
const mongoose = require("mongoose");

// let db = new Datastore({ filename: "./database/database.db" });
// db.loadDatabase();
//some database initialization here
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
    shoeModel.find({}, function (err, shoes) {
      if (err) return console.error(err);
      res.send(shoes);
    });
  });
});

// router.get("/", function (req, res, next) {
//   db.find({}, function (err, docs) {
//     console.log("find succeeded");
//     res.send(docs);
//     console.log(docs);
//     if (err) {
//       return console.error(err);
//     }
//   });
// });

module.exports = router;
