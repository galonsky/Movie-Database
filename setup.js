var db = require('./db');

callback = function(err, res)
{
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("Movie Database set up!");
	}
};


db.create(callback);
