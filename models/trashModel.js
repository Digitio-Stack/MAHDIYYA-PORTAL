const mongoose = require('mongoose');

const trashSchema = new mongoose.Schema({
  documentType: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  deletedAt: { type: Date, default: Date.now }
});

const Trash = mongoose.model('Trash', trashSchema);
module.exports = Trash;