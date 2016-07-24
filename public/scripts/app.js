// this is the Ajax call to the petfinder api
(function(module) {
  var pets = {};
  pets.$petWanted = null;
  pets.$seniorPet = null;
  pets.$specialPet = null;
  pets.$petSize = null;
  pets.$petSex = null;
  pets.all = [];
  pets.filtered = [];
  pets.savedPets = JSON.parse(localStorage.getItem('savedPets')) || [];
  pets.selectedPet = null;

  pets.findByName = function(name) {
    pets.filtered.forEach(function(pet, index) {
      if (pet.name.$t === name) {
      }
    });
  };

  pets.getSpecialNeedsOptions = function(opt) {
    var outputOptions = [];
    if (Array.isArray(opt)) {
      outputOptions = opt.map(function(o) {
        return o.$t;
      });
    } else {
      outputOptions.push(opt.$t);
    }
    return outputOptions;
  };

  pets.isSpecialNeeds = function(pet) {
    if (pet.options.option) {
      var snOptsArray = pets.getSpecialNeedsOptions(pet.options.option);
      if (pets.$specialPet === true) {
        return snOptsArray.indexOf('specialNeeds') !== -1;
      } else {
        return snOptsArray.indexOf('specialNeeds') === -1;
      }
    }
  };

  pets.isSenior = function(pet) {
    if (pets.$seniorPet === true) {
      return 'Senior' === pet.age.$t;
    } else {
      return 'Senior' !== pet.age.$t;
    }
  };

  pets.isSizePet = function(pet) {
    if (pets.$petSize === 'S') {
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'M') {
      return pets.$petSize === pet.size.$t;
    } else if (pets.$petSize === 'L') {
      return pets.$petSize === pet.size.$t;
    } else {
      return pet.size.$t;
    }
  };

  pets.isSexPet = function (pet) {
    if (pets.$petSex === 'M') {
      return pets.$petSex === pet.sex.$t;
    } else if (pets.$petSex === 'F'){
      return pets.$petSex === pet.sex.$t;
    } else {
      return pet.sex.$t;
    }
  };


  pets.requestPets = function(zip, animal) {
    $.getJSON('https://api.petfinder.com/pet.find?format=json&key=8dc33d8c70fd213dc0874e9deaa0a2fd&location=' + zip + '&animal=' + animal + '&count=100&output=full&callback=?')
  .done(function(petApiData) {
    pets.all = [];
    pets.all = petApiData.petfinder.pets.pet;
    pets.numberReturned();
  }).fail(function(err) {
    alert('Error retrieving data!');
  });
  };

  pets.animal_wanted_click = function() {
    $('#stage-1-wrapper').off().on('click', '.petButton', function(e) {
      pets.$petWanted = $(this).val();
      // $('#noMatches').text('');
      pets.searchClick(pets.$petWanted);
    });
  };

  pets.searchClick = function(wanted) {
    $('#zipFindForm').off().on('click', '.find-new-pet-btn', function(e) {
      e.preventDefault();
      var $zipSearch = $('#zipFind').val();
      if($zipSearch != ''){
        pets.requestPets($zipSearch, pets.$petWanted);
      }
      else{
        toastr.error('Please enter a zip code to continue');
      }
    });
  };

  pets.numberReturned = function() {
    $('#numMatches').html(pets.all.length);
  };

  pets.noMatch = function() {
    $('#noMatches').show();
    $('#input-snr-cb').prop('checked', false);
    $('#input-spl-cb').prop('checked', false);
    $('.sexRadio').prop('checked', false);
  };


  pets.pareDown = function() {
    pets.$seniorPet = $('#input-snr-cb').is(':checked');
    pets.$specialPet = $('#input-spl-cb').is(':checked');
    pets.$petSize = $('#petLargeness').val();
    pets.$petSex = $('input.sexRadio:checked').val();
    pets.filtered = pets.all
        .filter(function(pet) {
          return pets.isSenior(pet);
        })
         .filter(function(pet) {
           return pets.isSpecialNeeds(pet);
         })
         .filter(function(pet) {
           return pets.isSizePet(pet);
         })
        .filter(function(pet) {
          return pets.isSexPet(pet);
        });
  };
  pets.displayMatches = function(){
    if(pets.filtered.length > 0) {
      var source   = $('#search-result').html();
      var template = Handlebars.compile(source);
      pets.filtered.forEach(function(e){
        var html    = template(e);
        $('#narrowResults').append(html);
        controller.showResults();
      });
    } else {
      pets.noMatch();
    }
    $('section.section-wrapper').addClass('black-background');
  };

  pets.displaySavedPets = function() {
    pets.savedPets.forEach(function(e){
      var source   = $('#search-result').html();
      var template = Handlebars.compile(source);
      var html    = template(e);
      $('#savedPets').append(html);
    });
  };

  pets.displayFullPetDetails = function(pet) {
    var fullDetailHtml = $('#petDetails').html();
    var fullDetailTemplate = Handlebars.compile(fullDetailHtml);
    var petView = fullDetailTemplate(pet);
    $('#Animal_Detail_Wrapper').append(petView);
  };

  pets.seeMoreButton = function(buttonVal,searchSource) {
    searchSource.forEach(function(elem){
      if(buttonVal == elem.id.$t){
        pets.displayFullPetDetails(elem);
        pets.selectedPet = elem;
      }
    });
  };

  pets.setLocalStorage = function() {
    pets.savedPets.push(pets.selectedPet);
    localStorage.setItem('savedPets', JSON.stringify(pets.savedPets));
    toastr.success('Saved Pet for later view');
  };

  pets.clearData = function(){
    pets.all = [];
    pets.filtered = [];
  };

  $(document).ready(function() {
    $('#noMatches').hide();
    pets.animal_wanted_click();
    pets.searchClick();
    controller.showResults();
  });

  module.pets = pets;
})(window);
