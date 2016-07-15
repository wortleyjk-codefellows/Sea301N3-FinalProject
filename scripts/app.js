// this is the Ajax call to the petfinder api

(function(module) {
  console.log('running app.js');
  var pets = {};

  pets.all = [];

  pets.animal_wanted_click = function() {
    $('#stage-1-wrapper').on('click', '.petButton', function(e) {
      var $petWanted = $(this).val();
      console.log($petWanted);
    });
  };

  pets.requestPets = function(next) {
    $.getJSON('http://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + $zipSearch + '&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData;
    //console.log(pets.all);
    console.log(petApiData.petfinder);
  }).fail(function(err)
  { alert('Error retrieving data!');
});
};

  pets.searchClick = function() {
    $('#findFriend').on('click', function() {
      var $zipSearch = $('#zipFind').val();
      console.log($zipSearch);
      pets.requestPets();
    })
  };


  // pets.with = function(attr) {
  //   return pets.all.filter(function(repo){
  //     return repo[attr];
  //   });
  // };

  $(document).ready(function() {
    pets.animal_wanted_click();
    pets.searchClick();
  });

  module.pets = pets;
})(window);
