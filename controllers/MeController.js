const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    data = user.toJSON();

    data.newToken = await jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
