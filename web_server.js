var fs = require("fs");
var host = "0.0.0.0";
var port = 8080;
var express = require("express");
console.log("Starting Web Server...");
var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    response.send("Loading page...");
});

app.get("/cmd", function(request, response){ //control dir
    response.send("Loading command page...");
	app.use(express.static(__dirname + "/public/cmd"));
});

app.listen(port, host);
console.log("Running server at " + host+":"+port);
