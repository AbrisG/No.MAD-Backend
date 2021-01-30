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
function getShoeAttributes(shoeNames) {
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
  for (shoe of shoeNames) {
    sneaks.getProducts(shoe, function (err, products) {
      if (err) {
        return console.error(err);
      }
      console.log(products.length);
      for (product of products) {
        db.insert(jsonGen(product));
      }
    });
  }
}

getShoeAttributes([
  "Jordan 1",
  "Nike Air Force One",
  "Off-White",
  "Yeezy 350 Boost",
  "Reebok",
]);

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
