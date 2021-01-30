var express = require("express");
var router = express.Router();

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

//getProducts(keyword, callback) takes in a keyword and returns an array of products
sneaks.getProducts("Jordan 1 High", function (err, products) {
  console.log(products);
});

//Product object includes styleID where you input it in the getProductPrices function
//getProductPrices(styleID, callback) takes in a style ID and returns sneaker info including a price map and more images of the product
sneaks.getProductPrices("FY2903", function (err, product) {
  //console.log(product)
});
//getMostPopular(callback) returns an array of the current popular products curated by StockX
sneaks.getMostPopular(function (err, products) {
  //console.log(products)
});
