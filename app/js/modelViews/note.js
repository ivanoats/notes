var Backbone = require('backbone');
var $ = require('jquery');
var _ =  require('underscore');

module.exports = Backbone.View.extend({
  tagName: 'article',
  className: 'note',
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var noteAttributes = this.model.toJSON();
    var template = require('./templates/note.hbs');
    this.$el.html(template(noteAttributes));
    return this;
  }
});