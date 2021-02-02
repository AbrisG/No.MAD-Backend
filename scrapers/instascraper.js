var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();

var instaURL =
  "https://www.instagram.com/graphql/query/?query_hash=c769cb6c71b24c8a86590b22402fda50&variables=%7B%22tag_name%22%3A%22af1%22%2C%22first%22%3A2%2C%22after%22%3A%22QVFCVDVxVUdMLWlnTlBaQjNtcUktUkR4M2dSUS1lSzkzdGVkSkUyMFB1aXRadkE1RzFINHdzTmprY1Yxd0ZnemZQSFJ5Q1hXMm9KZGdLeXJuLWRScXlqMA%3D%3D%22%7D";

fetch(instaURL)
  .then((res) => res.json())
  .then((json) => console.log(json));
