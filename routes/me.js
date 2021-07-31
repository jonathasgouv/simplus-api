var express = require("express");
var router = express.Router();

// Require controller modules.
var MeController = require("../controllers/MeController");

/// ME ROUTES ///

// GET request to get the currently logged in user information.
router.get("/", MeController.get);

module.exports = router;
