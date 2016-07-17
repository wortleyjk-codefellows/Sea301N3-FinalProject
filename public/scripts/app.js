// this is the Ajax call to the petfinder api

(function(module) {
  var pets = {};
  var $petWanted;
  var $seniorPet;
  var $specialPet;
  var $petSize;
  var $petSex;
  pets.all = [];


  pets.requestPets = function(zip, animal) {
    $.getJSON('https://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&count=10&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    pets.numberReturned();
  }).fail(function(err)
  { alert('Error retrieving data!');
});
};

pets.animal_wanted_click = function() {
  $('#stage-1-wrapper').on('click', '.petButton', function(e) {
    $petWanted = $(this).val();
    pets.searchClick($petWanted);
  });
};

pets.searchClick = function(wanted) {
  $('#find-new-pet-btn').off().on('click', function() {
    var $zipSearch = $('#zipFind').val();
    console.log($zipSearch);
    pets.requestPets($zipSearch, $petWanted);
  })
};

pets.numberReturned = function() {
  $('#numMatches').html(pets.all.length);
};

// Now i have to handle the deeper filtering and the push the information to the final results view.  and then push that to the details view.

pets.snr_spl = function() {
  #('#input-snr-cb').off().on('click', function(){
    $seniorPet = $(this).val();
    console.log(this);
  });
  #('#input-spl-cb').off().on('click', function(){
    $specialPet = $(this).val();
    console.log(this);
  })
};

pets.howBig = function() {
  #('#petLargeness').off().on('change', function(){
    $petSize = $(this).val();
    console.log(this);
  });
};

pets.assignedGender = function() {
  #('#sexRadio').off().on('click', function(){
    $petSex = $(this).val();
    console.log(this);
  })
}


pets.toHtml = function() {
  $('#show-me-btn').off().on('click', function(){
    console.log('start handlebars function');
    var $templateScript = $('#search-result-template').html();
    var theTemplate = Handlebars.compile($templateScript);
    var compiledHtml = theTemplate(pets);
    $('#narrowResults').append(compiledHtml);
    return theTemplate(this);
  })
 };




// +myProj.forEach(function(a){
//  +  $('#workDone').append(a.toHtml());
//  +});



  // pets.with = function(attr) {
  //   return pets.all.filter(function(repo){
  //     return repo[attr];
  //   });
  // };

  $(document).ready(function() {
    pets.animal_wanted_click();
    pets.searchClick();
    pets.snr_spl();
    pets.howBig();
    pets.assignedGender():
    pets.toHtml();

  });

  module.pets = pets;
})(window);
