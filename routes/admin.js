const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

// GET request for add-product
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.get('/products', adminController.getProducts);

module.exports = router;