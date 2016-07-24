(function(module) {
  var vets = {};
  vets.map = null;
  vets.initMap = function() {
    vets.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 35, lng: 150}, // Use zipcode from input field                                   two variables plug in here/ or just seattle
      zoom: 10 // zoom level 10 is city
    });
  };

  vets.lat = 47.608013;
  vets.lng = -122.335167;
  vets.center = {lat: vets.lat, lng: vets.lng};

  vets.findLocalVets = function() {
    vets.map.setCenter(vets.center);
    vets.request = {
      location: vets.center,
      radius: '500',
      query: 'vet'
    };
  };

  vets.placeMarkers = function(results, status) {
    console.log('this is results');
    console.log(results);
    console.log('this is status');
    console.log(status);
  };

  vets.newTest = function() {
    vets.service = new google.maps.places.PlacesService(vets.map);
    vets.service.nearbySearch(vets.request, vets.placeMarkers);
  };

  module.vets = vets;
})(window);
