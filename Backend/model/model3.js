const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  SolRecieved: { type: Number, required: true, default: 0 },
 
});

module.exports = mongoose.model("SolRecieved", schema);
