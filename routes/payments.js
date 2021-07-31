var express = require("express");
var router = express.Router();

// Require controller modules.
var PaymentController = require("../controllers/PaymentController");

/// USER ROUTES ///

// POST request to create new user.
router.post("/", PaymentController.post);

// GET request to get the currently logged in user information.
router.get("/", PaymentController.get);

// PUT request to update customer by id.
router.put("/:id", PaymentController.update);

// DEL request to delete customer by id.
router.delete("/:id", PaymentController.delete);

module.exports = router;
