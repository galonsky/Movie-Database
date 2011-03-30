var express = require('express');

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var db = require('./db');

app.get('/', function(req, httpResponse)
{
    db.listAll(function(err, res)
    {
        httpResponse.render('list', 
        {
            locals: {items: res}
        });
    });
});



app.post('/', function(req, httpResponse)
{
    var name = req.body.name;
    var year = req.body.year;
    
    var actors = req.body.actors;
    actors = trim(actors).split(",");
    
    db.insert(name, year, actors, function(err, res)
    {
        httpResponse.redirect('/');
    });
});

app.get('/delete/:id/:rev', function(req, httpResponse)
{
    var id = req.params.id;
    var rev = req.params.rev;
    
    db.delete(id, rev, function(err, res)
    {
        if(err)
        {
        	console.log(err);
        }
        httpResponse.redirect('/');
    });
});

app.listen(81);

function trim(stringToTrim)
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}