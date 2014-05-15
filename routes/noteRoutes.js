'use strict';
var Note = require('../models/Note');

module.exports.collection = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  Note.find({}, function(err, users){
    if(err){
      res.send(500, {err: err});
      return false;
    }
    res.send(users);
  });
};

module.exports.findById = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  Note.findOne({'_id': req.params.id}, function(err, note) {
    if(err) {
      res.send(500, {err: err});
      return false;
    }
    res.send(note);
  });
};
