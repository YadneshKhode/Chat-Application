const mongoose = require("mongoose");
const whatsappSchema = new mongoose.Schema(
  {
    message: String,
    name: String,
    received: Boolean,
  },
  {
    timestamps: true,
  }
);
const Messages = mongoose.model("Messages", whatsappSchema);
module.exports = Messages;
