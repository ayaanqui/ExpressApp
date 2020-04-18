const express = require("express");
const router = express.Router();

const path = require("path");
const rootDir = require("../util/path");

router.use((req, res, next) => {
  res.render('404', { title: '404, Page not found' });
});

module.exports = router;