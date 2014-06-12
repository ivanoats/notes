var $ = require('jquery');
var Ractive = require('ractive/ractive.runtime');

var ractive = new Ractive({
  el: "#container",
  template: require('../../views/home.ractive').template,
  data: {
    name: "foo",
    results: [
      {noteBody: "note 1"},
      {noteBody: "note 2"},
      {noteBody: "note 3"}
    ]
  }
});
