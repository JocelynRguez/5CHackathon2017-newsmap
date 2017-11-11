console.log("server is listening...")

var express = require('express');
var app = express();
var path    = require("path");
var mysql = require('mysql');
var router = express.Router();


function sayHello(request, response){
	reponse.send("hello!")
}

// request.get({
//   url: "https://api.nytimes.com/svc/topstories/v2/national.json",
//   qs: {
//     'api-key': "20ec7403e3f64b35b7abeef0bb5dfb4b"
//   },
// }, function(err, response, body) {
//   body = JSON.parse(body);
//   console.log(body);
// })

var server = app.listen(3000, listening);

function listening(){
	console.log("listening...");
	//console.log(connection);
}

//API Key for NewsAPI: 32c96595c4c343a9a0819d1e6c3f043a
