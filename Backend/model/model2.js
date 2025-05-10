const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  tokenBought: { type: Number, required: true, default: 0 },
  address: { type: String, required: true }
});

module.exports = mongoose.model("TokenBought", schema);
