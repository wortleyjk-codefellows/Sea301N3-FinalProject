(function(module) {
  var randomPets = {};
  randomPets.all = [];

randomPets.getRandom = function() {
  $.getJSON('https://api.petfinder.com/pet.getRandom?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&age=Senior&output=full&count=6&callback=?',function(data){
    return data;
  }).done(function(data) {
    randomPets.all = [];
    randomPets.all = data.petfinder.pet;
    randomPets.displayRandom();
  }).fail(function(err)
    { toastr.error('Data could not be retrieved, error: ' + err);
    });
  };

  randomPets.displayRandom = function() {
    randomPets.all.forEach(function(e){
      var source   = $('#landingRandom').html();
      var template = Handlebars.compile(source);
      var html    = template(e);
      $('#randomResultsWrapper').append(html);
    });
  };



  $(document).ready(function() {
    randomPets.getRandom();
  });

  module.randomPets = randomPets;
})(window);
