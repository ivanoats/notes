var Backbone = require('backbone');
var $ = require('jquery');
var NoteView = require('../modelViews/note');
Backbone.$ = $;
var _ = require('underscore');

module.exports = Backbone.View.extend({
  className: 'notes',
//  el: 'section',
  
  initialize: function() {
    this.collection.on('add', this.addNote, this);
    this.collection.on('reset', this.addAll, this);
  },
  
  addNote: function(note, context) {
    var noteView = new NoteView({model: note});
    this.$el.append(noteView.el);
  },
  
  addAll: function() {
    this.collection.forEach(this.addNote);
  },
  
  render: function() {
    this.addAll();
    return this;
  }
  
});