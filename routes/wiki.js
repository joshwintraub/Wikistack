const router = require('express').Router();
// const client = require("../models");
const { addPage, main } = require('../views');
const { Page } = require("../models");

router.get('/', (req, res) => {
  res.send(main(''));
});

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error); }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
