var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var Note = require('./models/note');
var NoteView = require('./modelViews/note');
var NoteCollection = require('./collections/noteCollection');
var NoteCollectionView = require('./collectionViews/noteCollectionView');

$(function(){ 
  var noteCollection = new NoteCollection();
  var noteCollectionView = new NoteCollectionView({collection: noteCollection});
  noteCollection.fetch({
    success: function() {
      $('#notes').html(noteCollectionView.el);
    }
  });
});
