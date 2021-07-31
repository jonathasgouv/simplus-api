const Receivement = require("../models/Receivement");

exports.get = async (req, res) => {
  try {
    const receivements = await Receivement.find({ ownerId: req.id });

    if (!receivements) {
      return res.status(204);
    }

    return res.json(
      receivements.sort(
        (a, b) => new Date(a.expiration) - new Date(b.expiration)
      )
    );
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.post = async (req, res) => {
  try {
    req.body.ownerId = req.id;
    const receivement = await Receivement.create(req.body);

    if (!receivement) {
      return res.status(400).send("Registration failed");
    }
    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const receivement = await Receivement.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!receivement) {
      return res.status(400).send("No receivement found with given id");
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.params);
    const receivement = await Receivement.findByIdAndDelete(req.params.id);

    if (!receivement) {
      return res.status(400).send("No receivement found with given id");
    }

    return res.json({ success: true });
  } catch {
    return res.status(500).send("Internal Server Error");
  }
};
