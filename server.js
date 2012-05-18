
var express = require('express')
  , ejs = require('ejs')
  , config = require('./config')
 
   , user = require('./controllers/user')
  , csrf = require('./lib/csrf');

var app = express.createServer();
app.use(express.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: config.session_secret
}));
/**
 * Fixed CSRF
 *  add '<input type="hidden" name="csrf" value="<%- it.csrf %>" />' to form
 */
app.use(csrf.check());
app.dynamicHelpers({
    csrf: csrf.token
});
app.helpers({
    config: config
});

/**
 * Views settings
 */
app.set("view engine", "html");
app.set("views", __dirname + '/views');
app.register("html", ejs);

/**
 * Routing
 */
/*app.get('/', todo.index);
app.post('/todo/new', todo.new);
app.get('/todo/:id', todo.view);
app.get('/todo/:id/edit', todo.edit);
app.post('/todo/:id/edit', todo.save);
app.get('/todo/:id/delete', todo.delete);
app.get('/todo/:id/finish', todo.finish);
*/

app.get('/', user.index);
app.post('/user/new', user.new);
app.get('/user/:id', user.view);
app.get('/user/:id/edit', user.edit);
app.post('/user/:id/edit', user.save);
app.get('/user/:id/delete', user.delete);
app.get('/user/:id/finish', user.finish);


app.listen(config.port, config.host);
console.log('Server start http://localhost:' + config.port);