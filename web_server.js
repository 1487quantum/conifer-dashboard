var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
console.log("Starting Web Server...");
var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/", function(request, response){ //root dir
    response.send("Loading page...");
});

app.listen(port, host);
console.log("Running server at " + host+":"+port);
