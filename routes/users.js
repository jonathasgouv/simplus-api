var express = require("express");
var router = express.Router();

// Require controller modules.
var UserController = require("../controllers/UserController");

/// USER ROUTES ///

// POST request to create new user.
router.post("/", UserController.post);

module.exports = router;
