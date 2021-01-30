const { json } = require("express");
var express = require("express");
var router = express.Router();
const fs = require("fs");

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

//gets 40 jordan 1s and 40 yeezy 350s
function getNames() {
  var names = [];
  sneaks.getProducts("Jordan 1", function (err, products) {
    for (product of products) {
      names.push({ name: product.shoeName });
    }
    sneaks.getProducts("Yeezy 350", (err, products) => {
      for (product of products) {
        names.push({ name: product.shoeName });
      }
      let data = JSON.stringify(names);
      fs.writeFileSync("shoeNames.json", data);
    });
  });
}

//getNames();
