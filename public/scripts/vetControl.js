(function(module) {
  var vets = {};

  vets.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.6062, lng: 122.3321}, // Use zipcode from input field                                   two variables plug in here/ or just seattle
      zoom: 10 // zoom level 10 is city
    });
  };

  vets.lat = 35;
  vets.lng = 35;
  vets.center = {lat: 35, lng: 35};

  vets.findLocalVets = function() {
    map.setCenter(vets.center);
    request = {
      location: map,
      radius: '500',
      query: 'vet'
    };
  };

  module.vets = vets;
})(window);

// var map;
// var service;
// var infowindow;
//
// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
//
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });
//
//   var request = {
//     location: pyrmont,
//     radius: '500',
//     query: 'restaurant'
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
