const express = require('express');
const app = express();

// Import routes
const adminRoutes = require("./admin");
const shopRoutes = require("./shop");
const errors = require('../controllers/errors');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errors.get404);

module.exports = app;