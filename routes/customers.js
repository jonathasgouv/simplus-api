var express = require("express");
var router = express.Router();

// Require controller modules.
var CustomerController = require("../controllers/CustomerController");

/// CUSTOMER ROUTES ///

// POST request to create new customer.
router.post("/", CustomerController.post);

// GET request to get all customers of the current logged in user.
router.get("/", CustomerController.get);

// GET request to get customer by id.
router.get("/:id", CustomerController.getById);

// PUT request to update customer by id.
router.put("/:id", CustomerController.update);

// DEL request to delete customer by id.
router.delete("/:id", CustomerController.delete);

module.exports = router;
