const { response } = require("express");
var express = require("express");
var router = express.Router();
var Datastore = require("nedb");
let db = new Datastore({ filename: "database.db" });
db.loadDatabase();

let data = { name: "Horse" };

db.find({}, function (err, docs) {
  console.log("find succeeded");
  if (err) {
    return console.error(err);
  }
  var output = docs;
  otherFunction(output);
});

function otherFunction(output) {
  console.log(output);
}

module.exports = data;
//.then((docs) => console.log(docs));

// async function () {
//     data = await db.find({}, function (err, docs) {
//         console.log("find succeeded");
//         console.log(docs);
//         if (err) {
//           return console.error(err);
//         }
//       });
// }();
