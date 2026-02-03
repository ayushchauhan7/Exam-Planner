const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true }, //
  capacity: { type: Number, required: true }, //
  floorNo: { type: Number, required: true }, //
  nearWashroom: { type: Boolean, default: false }, //
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
