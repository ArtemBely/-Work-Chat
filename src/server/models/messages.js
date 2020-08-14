const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messSchema = new Schema({
    name: { type: String, required: true },
    msg: { type: String, required: true },
    date: { type: String },
    mail: { type: String }
});

module.exports = mongoose.model('Messages', messSchema);
