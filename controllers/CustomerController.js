const Customer = require("../models/Customer");

exports.getById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(204);
    }

    return res.json(customer);
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.get = async (req, res) => {
  try {
    const customers = await Customer.find({ ownerId: req.id });

    if (!customers) {
      return res.status(204);
    }

    return res.json(
      customers.sort((a, b) => new Date(a.expiration) - new Date(b.expiration))
    );
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

exports.post = async (req, res) => {
  try {
    req.body.ownerId = req.id;
    console.log(req.body);
    const customer = await Customer.create(req.body);

    console.log(customer);

    if (!customer) {
      return res.status(400).send("Registration failed");
    }
    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!customer) {
      return res.status(400).send("No user found with given id");
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.params);
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      console.log("No user found with given id");
      return res.status(400).send("No user found with given id");
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};
