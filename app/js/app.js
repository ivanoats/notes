var $ = require('jquery');
var Ractive = require('ractive/ractive.runtime');

var ractive = new Ractive({
  el: "#container",
  template: require('../../views/home.ract').template,
  // TODO get data via $.ajax request
  data: {
    name: "foo",
    notes: [
      {noteBody: "note 1"},
      {noteBody: "note 2"},
      {noteBody: "note 3"}
    ]
  }
});
