'use strict';

var mongoose = require('mongoose');
var noteSchema = mongoose.Schema({
  body: String
});

module.exports = mongoose.model('Note', noteSchema);
