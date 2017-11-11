function initMap() {
    var usa = {lat: 39 , lng: -102};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: usa,

      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#b9621a"
            },
            {
              "visibility": "on"
            },
            {
              "weight": 0.5
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#be9d6b"
            },
            {
              "visibility": "on"
            },
            {
              "weight": 0.5
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]

      });

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
    for(var i = 0; i < arrdata.length; i++){
      makeMarker(arrdata[i]);
    }
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

function makeMarker(data){
                var geocoder =  new google.maps.Geocoder();
                geocoder.geocode( { 'address': data["location"] }, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var location = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                    var marker = new google.maps.Marker({
                      position: location,
                      map: map
                    });
                    var contentString = "<a href="+data["url"]+">"+ data["title"]+ "</a>";
                    var infoWindow = new google.maps.InfoWindow({
                      content: contentString
                    });
                    marker.addListener('click', function() {
                      infoWindow.open(map,marker);
                    });
                  } else {
                    return ("Something got wrong " + status);
                  }
                });
      }

  //   // Add a marker clusterer to manage the markers.
  // var markerCluster = new MarkerClusterer(map, markers,
  //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
//   //   );
}
