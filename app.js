const express = require("express");
const app = express();

const bodyParser = require("body-parser");

// MongoDB
const mongoConnect = require('./util/database').mongoConnect;

// Pug templating engine
app.set('view engine', 'pug');

const path = require("path");

/** Middleware */
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./routes/routes'));

mongoConnect(() => {
  const port = 3000;
  console.log(`\n\nServer running at http://localhost:${port}/\n`)
  app.listen(port);
});