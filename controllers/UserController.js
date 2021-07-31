const User = require("../models/User");

exports.post = async (req, res) => {
  try {
    const user = await User.create(req.body);

    if (!user) {
      return res.status(400).send("Registration failed");
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};
