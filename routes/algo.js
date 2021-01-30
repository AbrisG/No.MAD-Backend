var express = require("express");
var router = express.Router();
//some database initialization here

router.get("/", function (req, res, next) {
  var Datastore = require("nedb");
  let db = new Datastore({ filename: "../database/database.db" });
  db.loadDatabase();
  db.find({}, function (err, docs) {
    console.log("find succeeded");
    console.log(docs);
    if (err) {
      return console.error(err);
    }
  });
});

module.exports = router;
