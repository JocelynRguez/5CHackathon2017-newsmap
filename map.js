//get request for nytimes
var url = "https://api.nytimes.com/svc/topstories/v2/national.json";

url += '?' + $.param({
  'api-key': "20ec7403e3f64b35b7abeef0bb5dfb4b"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});
