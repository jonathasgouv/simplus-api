var express = require("express");
var router = express.Router();

// Require controller modules.
var ReceivementController = require("../controllers/ReceivementController");

/// USER ROUTES ///

// POST request to create new user.
router.post("/", ReceivementController.post);

// GET request to get the currently logged in user information.
router.get("/", ReceivementController.get);

module.exports = router;
