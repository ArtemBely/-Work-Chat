const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  coverImageName: { type: String },
  date: { type: String },
  mail: { type: String }
});

module.exports = mongoose.model('Message', msgSchema);
