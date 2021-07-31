const mongoose = require("../database");

const ReceivementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  isReceived: {
    type: Boolean,
    required: true,
    default: false,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

const Receivement = mongoose.model("Receivement", ReceivementSchema);

module.exports = Receivement;
