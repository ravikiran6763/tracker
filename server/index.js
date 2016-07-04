var database = require('./database');
//database.find('Tracker', 'Users', {});
var http = require('http');

var URL = require('URL');

var server = http.createServer(function (req, res) {
// Break down the incoming URL into its components
  var parsedURL = URL.parse(req.url, true);

  // Determine a response based on the URL
  switch (parsedURL.pathname) {
    case '/api/users':
    // Find and return the product with the given id
    if (parsedURL.query.id) {
      findProductById(id, req, res);
    }
    // There is no id specified, return all products
    else {
      findAllUsers(req, res);
    }
    break;
	case '/api/sendposition':
				console.log(req.lat);
	    var lat = parsedURL.query.lat;
		var lon = parsedURL.query.lon;
		var user = parsedURL.query.user;
		data = {"user":user,"lat":lat,"lon":lon}
		database.insert('Tracker','Locations',data, function(err,result){
			if (err) 
				{
				console.log(err);
			console.log(result);
		}})
    default:
    res.end('You shall not pass!');
  }
});

/*
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
	
	var myProduct = {
  name: 'Apple',
  price: 600
};
    res.end(JSON.stringify(myProduct));
});*/
server.listen(8080);

// Generic find methods (GET)

function findAllResources(resourceName, req, res) {

res.writeHead(200, {'Content-Type': 'application/json'});
	
	//var myProduct = {lat: 28.6139, lng: 77.209};
    //res.end(JSON.stringify(myProduct));
	//res.end(myProduct);
	 console.log("aaaaaaaaaaaaa");
  database.find('Tracker', resourceName, {}, function (err, resources) {
	  if (err) {
		  console.log("eeeeen");
    console.log(err);
  }
  else{
	  console.log("afte return");
	  console.dir(resources);
	//  res.writeHead(200);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resources));
 // res.end("Rajkumar");
  }
  });
  
 // database.closedb();
};

var findResourceById = function (resourceName, id, req, res) {
  database.find('Tracker', resourceName, {'_id': id}, function (err, resource) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resource));
  });
};

// Product methods

var findAllUsers = function (req, res) {
  findAllResources('Users', req, res);
};

var findProductById = function (id, req, res) {
  findResourceById('Users', id, req, res);
};


console.log('Up, running and ready for action!');

