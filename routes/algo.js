var express = require("express");
var getAllData = require("./database/retrieve.js");
var router = express.Router();
//some database initialization here

console.log(getAllData);

module.exports = router;
