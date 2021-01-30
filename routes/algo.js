var express = require("express");
var router = express.Router();
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

//some database initialization here

router.post("/", function (req, res, next) {
  const searchQuery = req.body.search; // this still needs to be determined
  sneaks.getProducts(searchQuery, (err, products) => {
    sneaks.getProductPrices(products[0].styleID, (err, product) => {
      res.json({ name: product.shoeName, id: product.styleID });
    });
  });
});

module.exports = router;
