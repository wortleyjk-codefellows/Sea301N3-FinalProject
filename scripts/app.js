// this is the Ajax call to the petfinder api

(function(module) {
  console.log('running app.js');
  var pets = {};

  pets.all = [];


  pets.requestPets = function(zip, animal) {
    $.getJSON('http://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    console.log(petApiData.petfinder);
  }).fail(function(err)
  { alert('Error retrieving data!');
});
};

pets.animal_wanted_click = function() {
  $('#stage-1-wrapper').on('click', '.petButton', function(e) {
    var $petWanted = $(this).val();
    pets.searchClick($petWanted);
    // console.log($petWanted);
  });
};

pets.searchClick = function(wanted) {
  $('#find-new-pet-btn').on('click', function() {
    var $zipSearch = $('#zipFind').val();
    console.log($zipSearch);
    // console.log($petWanted);
    pets.requestPets($zipSearch, $petWanted);
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
