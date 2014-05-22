var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({
  idAttribute: '_id',
  // TODO: mock ENV var for host
  urlRoot: '/api/v1/notes',
  defaults: {
    noteBody: ''
  }
});