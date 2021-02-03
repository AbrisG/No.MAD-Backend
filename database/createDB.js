const mongoose = require("mongoose");
const shoeModel = require("../models/shoe");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();
require("dotenv").config({ path: "../.env" });

mongoose.connect(
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/nomad",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) console.error(err);
  }
);
mongoose.connection.once("open", () => createDB()); //checking to see if connection is open

function createDB() {
  shoesToAdd = [
    "Jordan 1",
    "Nike Air Force One",
    "Off-White",
    "Yeezy 350 Boost",
    "Reebok",
  ];
  createShoeDatabase(shoesToAdd);
}

//database functions

function createShoeDatabase(shoeNames) {
  shoeModel.deleteMany({}, function (err) {
    console.log("remove succesfull");
    if (err) console.error(err);
  });

  const jsonGen = (product) => {
    return {
      name: product.shoeName,
      hashtag: parse(product.shoeName),
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
      for (product of products) {
        shoeModel(jsonGen(product)).save(function (err) {
          if (err) return console.error(err);
        });
      }
    });
  }
}

//helper functions

//parses each shoe name to instagram hashtag root for instagram scraping
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
