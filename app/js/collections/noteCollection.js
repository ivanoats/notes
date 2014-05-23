var Backbone = require('backbone');
var Note = require('../models/note');

module.exports = Backbone.Collection.extend({
  model: Note,
  url: '/api/v1/notes'
});
