const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.SECRET;

exports.post = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "User not found", errorType: 1 });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = await jwt.sign({ id: user.id }, secret, {
        expiresIn: 86400,
      });

      data = user.toJSON();
      data.token = token;

      return res.json(data);
    } else {
      return res.status(400).json({ error: "Wrong password", errorType: 2 });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
