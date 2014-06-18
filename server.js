'use strict';

var express     = require('express');
var http        = require('http');
var mongoose    = require('mongoose');
var bodyparser  = require('body-parser');
var consolidate = require('consolidate');
var session     = require('express-session');
var RedisStore  = require('connect-redis')(session);
var cookieParser = require('cookie-parser');

var noteRoutes = require('./api/routes/noteRoutes');

var app = express();
app.engine('ract', consolidate.ractive);
app.set('view engine', 'ract');
app.set('views', __dirname + '/views');

app.use(bodyparser.json());
app.use(cookieParser('changeMEchangeMEchangeME'));
// e.g. cookieParser(process.env.COOKIE_SECRET)

var ttl = 1000 * 60 * 60 * 24 * 7; // a week long Time To Live (TTL)
var sessionOptions = {
  host: "127.0.0.1" , //replace w/ something like process.env.REDIS_HOST
  port: 6379,  //Redis default port
  ttl: ttl
};
var redisSession = session({
  store: new RedisStore(sessionOptions),
  secret: 'cb937a59a4b5644fab825a73039d380507199fb35771cf560db',  // CHANGE THIS
  cookie: { maxAge: ttl }
});
app.use(redisSession);

//static routes
app.use(express.static( __dirname + '/dist' ));
app.use(express.static( __dirname + '/views'));

app.set('port', process.env.PORT || 3000);

var noteModel = require('./api/models/Note');
app.get('/notes', function(req, res, next) {
  if (req.session.firstVisit === undefined || req.session.firstVisit === null) {
    req.session.firstVisit = new Date();
  }
  console.dir(req.session);
  noteModel.find({}, function(err, results) {
    if (err) { return res.send(500, err.message); }

    res.render('layout', {
      partials: {
        home: 'home'
      },
      name: 'ivan',
      notes: results
    });
    console.log('result length is ' + results.length);
    console.log('process.pid: '+ process.pid);
  });
});

app.get('/api/v1/notes', noteRoutes.collection);
app.post('/api/v1/notes',  noteRoutes.create);
app.get('/api/v1/notes/:id', noteRoutes.findById);
app.put('/api/v1/notes/:id', noteRoutes.update);
app.delete('/api/v1/notes/:id', noteRoutes.destroy);
mongoose.connect('mongodb://localhost/notes-development');

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});

