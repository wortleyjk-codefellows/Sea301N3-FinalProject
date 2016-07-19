(function(module) {
  var vets = {};
  vets.map = null;
  vets.initMap = function() {
    vets.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.608013, lng: 122.335167}, // Use zipcode from input field                                   two variables plug in here/ or just seattle
      zoom: 13 // zoom level 10 is city
    });
  };

  vets.lat = 47.608013;
  vets.lng = -122.335167;
  vets.center = {lat: vets.lat, lng: vets.lng};
  vets.request = null;

  vets.findLocalVets = function() {
    vets.map.setCenter(vets.center);
    vets.request = {
      location: vets.center,
      radius: '1000',
      type: ['veterinary_care']
    };
    vets.service = new google.maps.places.PlacesService(vets.map);
    vets.service.nearbySearch(vets.request, vets.placeMarkers);
  };

  vets.placeMarkers = function(results, status) {
    results.forEach(function(result) {
      var placeLoc = result.geometry.location;
      var marker = new google.maps.Marker({
        map: vets.map,
        position: result.geometry.location,
        title: result.name
      });
    });
    console.log('this is results');
    console.log(results);
    console.log('this is status');
    console.log(status);
    // google.maps.addListener(marker, 'click', function() { //not working
    //   infowindow.setContent(result.name);
    //   infowindow.open(map, this);
    // });
  };

  module.vets = vets;
})(window);
//       function callback(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//           }
//         }
//       }
//
//       function createMarker(place) {
//         var placeLoc = place.geometry.location;
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });
//
//         google.maps.event.addListener(marker, 'click', function() {
//           infowindow.setContent(place.name);
//           infowindow.open(map, this);
//         });
//       }
