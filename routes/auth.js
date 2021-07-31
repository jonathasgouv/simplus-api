var express = require("express");
var router = express.Router();

// Require controller modules.
var AuthController = require("../controllers/AuthController");

/// CUSTOMER ROUTES ///

// POST request to login.
router.post("/", AuthController.post);

module.exports = router;
