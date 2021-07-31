const Payment = require("../models/Payment");

exports.get = async (req, res) => {
  try {
    const payments = await Payment.find({ ownerId: req.id });

    if (!payments) {
      return res.status(204);
    }

    return res.json(
      payments.sort((a, b) => new Date(a.expiration) - new Date(b.expiration))
    );
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.post = async (req, res) => {
  try {
    req.body.ownerId = req.id;
    const payment = await Payment.create(req.body);

    if (!payment) {
      return res.status(400).send("Registration failed");
    }
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.id },
      req.body,
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(400).send("No payment found with given id");
    }

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.params);
    const payments = await Payment.findByIdAndDelete(req.params.id);

    if (!payments) {
      return res.status(400).send("No payment found with given id");
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};
