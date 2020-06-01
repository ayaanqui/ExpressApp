const express = require('express');
const app = express();

// Import routes
const errors = require('../controllers/errors');
const adminRoutes = require('./admin');
const shopRoutes = require('./shop');

// Register routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errors.get404);

module.exports = app;