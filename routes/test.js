var Datastore = require("nedb");
db = new Datastore({ filename: "./database/test.db" });

db.insert();

db.loadDatabase(function (err) {
  if (err) {
    return console.error(err);
  }
});

db.find({ system: "solar" }, function (err, docs) {
  console.log(docs);
});
