const mongoose = require("../database");

const PaymentSchema = new mongoose.Schema({
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
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
