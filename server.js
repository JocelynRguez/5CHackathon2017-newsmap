console.log("server is listening...")

var express = require('express');
var app = express();
var path    = require("path");
var mysql = require('mysql');
var router = express.Router();

router.use(function(req,res,next){
	next();
});

router.get("/map.js", function(req,res){
	res.sendFile(path.join(__dirname+'/map.js'));
	console.log("GET map.js...");
});

router.get("/", function(req,res){
	res.sendFile(path.join(__dirname+'/map.html'));
	console.log("GET map.html...");
});

app.use('/', router);


var server = app.listen(3000, listening);

function listening(){
	console.log("listening...");
	//console.log(connection);
}

//API Key for NewsAPI: 32c96595c4c343a9a0819d1e6c3f043a
