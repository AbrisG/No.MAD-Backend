const { json } = require("express");
var express = require("express");
var router = express.Router();
const fs = require("fs");

var Datastore = require("nedb");
var db = new Datastore({ filename: "database.db" });
db.loadDatabase();
//db.remove({}, { multi: true });

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

//gets 40 jordan 1s and 40 yeezy 350s
function getShoeAttributes() {
  let attributes = [];
  const jsonGen = (product) => {
    return {
      name: product.shoeName,
      brand: product.brand,
      color: product.colorway,
      styleID: product.styleID,
      resellPrice: product.lowestResellPrice,
      retailPrice: product.retailPrice,
      releaseDate: product.releaseDate,
      thumbnailImgage: product.thumbnail,
    };
  };
  sneaks.getProducts("Jordan 1", function (err, products) {
    for (product of products) {
      db.insert(jsonGen(product));
      //attributes.push(jsonGen(product));
    }
    sneaks.getProducts("Yeezy 350", (err, products) => {
      for (product of products) {
        //attributes.push(jsonGen(product));
      }
      db.insert(jsonGen(product));
      //fs.writeFileSync("shoeNames.json", "");
      //let data = JSON.stringify(attributes);
      //fs.writeFileSync("shoeNames.json", data);
    });
  });
}

getShoeAttributes();

// function getDesiredInfo(searchQuery) {
//   sneaks.getProducts(searchQuery, async (err, products) => {
//     let names = await function () {
//     for (product of products) {
//       names.push({
//         name: product.shoeName,
//         brand: product.brand,
//         color: product.colorway,
//         styleID: product.styleID,
//         resellPrice: product.lowestResellPrice,
//         retailPrice: products.retailPrice,
//         releaseDate: product.releaseDate,
//       });
//     }
//   }();
//   return names;
// }
// }
