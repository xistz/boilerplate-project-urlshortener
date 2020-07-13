const express = require('express');
const Model = require('./model');
const dns = require('dns');
const dnsPromises = dns.promises;

const router = express.Router();

router.post('/new', async (req, res) => {
  const { url } = req.body;

  try {
    // check if url is valid
    const host = new URL(url).host;
    await dnsPromises.lookup(host);

    // check if url has been stored
    const found = await Model.findOne({ originalURL: url });
    if (found) {
      res.json({
        original_url: found.originalURL,
        short_url: found.shortURL,
      });
    } else {
      const count = await Model.count({});

      const newUrl = new Model({
        originalURL: url,
        shortURL: count + 1,
      });

      const saved = await newUrl.save();

      res.json({
        original_url: saved.originalURL,
        short_url: saved.shortURL,
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ error: 'invalid URL' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  // lookup db
  const found = await Model.findOne({ shortURL: id });

  // redirect to new address
  if (found) {
    res.redirect(found.originalURL);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
