window.$ = require('jquery');
window.Ractive = require('ractive');

window.ractive = new Ractive({
  el: "#container",
  template: "#home",
  data: {
    name: "foo",
    results: [
      {noteBody: "note 1"},
      {noteBody: "note 2"},
      {noteBody: "note 3"}
    ]
  }
});
