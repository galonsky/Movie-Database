var cradle = require('cradle');

var db = new(cradle.Connection)().database('movie-db');

module.exports.create = function(callback)
{
 	db.create();

	db.save('_design/list',
	{
    	all:
    	{
        	map: function(doc)
        	{
            	emit(doc._id, doc);
        	}
    	}
	}, callback);  
};

module.exports.insert = function(name, year, actors, callback)
{
    var time = new Date().getTime();
    db.save(
    {
        _id: name,
        year: year,
        actors: actors,
        timestamp: time
    }, callback);
};

module.exports.listAll = function(callback)
{
    db.view('list/all', callback);
};

module.exports.delete = function(id, rev, callback)
{
    db.remove(id, rev, callback);
};