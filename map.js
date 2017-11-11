//get request for nytimes
var url = "https://api.nytimes.com/svc/topstories/v2/national.json";

url += '?' + $.param({
  'api-key': "20ec7403e3f64b35b7abeef0bb5dfb4b"
});


function parseResult(results){
	console.log('parsing result....');
	var articles = results['results'];
	console.log(articles);

	var data = {};
	var arrdata = [];

	for(var i = 0; i < articles.length; i++){
		//console.log(articles[i]['title']);
		if(articles[i]['geo_facet'][0] !== undefined){
			data = {
				title: articles[i]['title'],
				location: articles[i]['geo_facet'][0],
				url: articles[i]['url']
			}
			arrdata.push(data);
		}

	}
		console.log(arrdata);
		return arrdata;
}


$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  //console.log(result);
	parseResult(result);
}).fail(function(err) {
  throw err;
});
