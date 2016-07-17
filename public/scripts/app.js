// this is the Ajax call to the petfinder api

(function(module) {
  var pets = {};
  var $petWanted;
  pets.all = [];


  pets.requestPets = function(zip, animal) {
    $.getJSON('http://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&callback=?')
  .done(function(petApiData) {
    console.log(petApiData);
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    console.log(pets.all);
    pets.numberReturned();
  }).fail(function(err)
  { alert('Error retrieving data!');
});
};

pets.animal_wanted_click = function() {
  $('#stage-1-wrapper').on('click', '.petButton', function(e) {
    $petWanted = $(this).val();
    console.log($petWanted);
    pets.searchClick($petWanted);
  });
};

pets.searchClick = function(wanted) {
  $('#find-new-pet-btn').on('click', function() {
    var $zipSearch = $('#zipFind').val();
    console.log($zipSearch);
    pets.requestPets($zipSearch, $petWanted);
  })
};

pets.numberReturned = function() {
  $('#numMatches').html(pets.all.length);
};

// Now i have to handle the deeper filtering and the push the information to the final results view.  and then push that to the details view.




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
