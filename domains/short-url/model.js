const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema for url
const UrlSchema = new Schema({
  originalURL: { type: String, required: true },
  shortURL: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Url', UrlSchema);
