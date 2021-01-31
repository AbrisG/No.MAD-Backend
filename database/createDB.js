const { json } = require("express");
var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const shoeModel = require("../models/shoe");
const fs = require("fs");
mongoose.connect(
  "mongodb+srv://AbrisG:Horse123@cluster0.0ds2t.mongodb.net/nomad?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  shoeModel.remove({}, function (err) {
    console.log("collection removed");
  });

  const SneaksAPI = require("sneaks-api");
  const sneaks = new SneaksAPI();

  function createShoeDatabase(shoeNames) {
    const jsonGen = (product) => {
      return {
        name: product.shoeName,
        hashtag: parse(product.shoeName),
        brand: product.brand,
        color: product.colorway,
        styleID: product.styleID,
        resellPrice: 1,
        retailPrice: product.retailPrice,
        sneakerValue: 1,
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
          shoeModel(jsonGen(product)).save(function (err) {
            if (err) return console.error(err);
          });
        }
      });
    }
  }

  createShoeDatabase([
    "Jordan 1",
    "Nike Air Force One",
    "Off-White",
    "Yeezy 350 Boost",
    "Reebok",
  ]);

  shoeModel.find(function (err, shoes) {
    if (err) return console.error(err);
    console.log(shoes.length);
  });
});

function parse(str) {
  var wordList = str.split(" ");
  if (wordList[1].toLowerCase() === "yeezy") {
    return "yeezy" + wordList[wordList.length - 1].toLowerCase();
  } else if (wordList[0].toLowerCase() === "jordan") {
    return "jordan" + wordList[1].toLowerCase();
  } else if (
    wordList[1].toLowerCase() === "air" &&
    wordList[2].toLowerCase() === "force"
  ) {
    return "airforce1";
  } else if (wordList[0].toLowerCase() === "reebok") {
    return "reebok";
  } else return "offwhite";
}

function getMin(product) {
  var arr = Object.values(product);
  var copy = [];
  for (value of arr) {
    if (value !== undefined) {
      copy.push(value);
    }
  }
  return Math.min(...copy);
}

function getSneakerValue(product) {
  return (
    ((getMin(product.resellPrice) - product.retailPrice) /
      product.retailPrice) *
    100
  );
}
