const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
  title: { type: String, required: true },
  scope: { type: Array }
});

module.exports = mongoose.model('Theme', themeSchema);
