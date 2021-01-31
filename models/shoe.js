const mongoose = require("mongoose");

const ShoeSchema = new mongoose.Schema({
  name: String,
  hashtag: String,
  brand: String,
  color: String,
  styleID: String,
  resellPrice: Object,
  retailPrice: Number,
  releaseDate: Date,
  thumbnailImgage: String,
});

const Shoe = mongoose.model("Shoe", ShoeSchema);

module.exports = Shoe;
