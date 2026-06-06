const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  pnumber: { type: Number },
  model: { type: String },
  eName: { type: String },
  eID: { type: String },
  tName: { type: String },
  bName: { type: String },
  reason: { type: String },
  testDrive: { type: String },
  remark: { type: String },
});

module.exports = mongoose.model("userDetails", userSchema);
