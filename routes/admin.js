const express = require("express");
const router = express.Router();

const productsController = require('../controllers/products');

// GET request for add-product
router.get('/add-product', productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);

module.exports = router;