const express = require('express');
const ShortUrl = require('../models/shortUrl');
const router = express.Router();

router.post('/shortUrls', async (req, res) => {
  console.log(req.body);
  await ShortUrl.create({
    full: req.body.fullUrl,
  });
  res.redirect('/');
});

router.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  console.log(shortUrls);
  res.render('index', { shortUrls });
});

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl === null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

router.get('/delete/:id', async (req, res) => {
  const entry = await ShortUrl.findByIdAndDelete(req.params.id);
  if (entry === null) return res.sendStatus(404);
  res.redirect('/');
});

module.exports = router;
