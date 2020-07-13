const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

router.get('/ready', (req, res) => {
  const ready = mongoose.connection.readyState;

  res.json({ status: ready ? 'ready' : 'not ready' });
});

module.exports = router;
