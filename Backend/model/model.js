const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  bonusToken: { type: Number, required: true, default: 0 },
  address: { type: String, required: true }
});

module.exports = mongoose.model("ReferalBonus", schema);
