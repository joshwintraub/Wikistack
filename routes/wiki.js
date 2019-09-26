const router = require('express').Router();
const client = require("../models");

router.get('/', (req, res) => {
  res.send('got to GET /wiki/');
});
